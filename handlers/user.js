var User = require('../models/user');
var validator = require('validator');
var crypto = require('crypto');

module.exports = function () {
    this.fetch = function (req, res, next) {
        var dbQuery;
        var query = req.query;
        var aggregateObject = [];
        var page = query.page || 1;
        var limit = query.count || 10;
        var skip = (page - 1) * limit;
        var expandBy;
        var expand;
        var i;

        expand = query.expand;

        if (expand && !(expand instanceof Array)) {
            expand = [expand];
        }

        if (expand) {
            for (i = expand.length - 1; i >= 0; i--) {
                expandBy = expand[i];

                if (expandBy === 'friends') {
                    aggregateObject.push({
                        $unwind: {
                            path                      : '$friends',
                            preserveNullAndEmptyArrays: true
                        }
                    }, {
                        $lookup: {
                            from        : 'users',
                            localField  : 'friends',
                            foreignField: '_id',
                            as          : 'friends'
                        }
                    }, {
                        $project: {
                            firstName: 1,
                            lastName : 1,
                            friends  : {$arrayElemAt: ['$friends', 0]},
                            posts    : 1
                        }
                    });
                }
                if (expandBy === 'posts') {
                    aggregateObject.push({
                        $unwind: {
                            path                      : '$posts',
                            preserveNullAndEmptyArrays: true
                        }
                    }, {
                        $lookup: {
                            from        : 'posts',
                            localField  : 'posts',
                            foreignField: '_id',
                            as          : 'posts'
                        }
                    }, {
                        $project: {
                            firstName: 1,
                            lastName : 1,
                            posts    : {$arrayElemAt: ['$posts', 0]},
                            friends  : 1
                        }
                    });
                }
            }

            aggregateObject.push({
                $group: {
                    _id    : {
                        _id        : '$_id',
                        firstName  : '$firstName',
                        lastName   : '$lastName',
                        dateOfBirth: '$dateOfBirth'
                    },
                    posts  : {$push: '$posts'},
                    friends: {$push: '$friends'}
                }
            }, {
                $skip: skip
            }, {
                $limit: limit
            });

            dbQuery = User.aggregate(aggregateObject);
        } else {
            dbQuery = User.find({}, {__v: 0}).skip(skip).limit(limit).lean();
        }

        dbQuery.exec(function (err, users) {
            if (err) {
                return next(err);
            }

            res.status(200).send(users);
        });
    };

    this.fetchById = function (req, res, next) {
        var id = req.params.id;
        var err;

        if (!validator.isUUID(id, 4)) {
            err = new Error('Bad params');
            err.status = 400;

            return next(err);
        }

        User
            .findById(id, {__v: 0})
            .lean()
            .exec(function (err, user) {
                if (err) {
                    return next(err);
                }

                res.status(200).send(user);
            });
    };

    this.fetchWithPosts = function (req, res, next) {
        var id = req.params.id;
        var err;

        if (!validator.isUUID(id, 4)) {
            err = new Error('Bad params');
            err.status = 400;

            return next(err);
        }

        User
            .findById(id, {__v: 0})
            .populate('posts', 'name -_id')
            .exec(function (err, user) {
                if (err) {
                    return next(err);
                }

                res.status(200).send(user);
            });
    };

    this.create = function (req, res, next) {
        //ToDo validate body
        var body = req.body;
        var shaSum = crypto.createHash('sha256');
        var user;

        shaSum.update(body.pass);
        body.pass = shaSum.digest('hex');

        user = new User(body);
        user.save(function (err, user) {
            if (err) {
                return next(err);
            }

            res.status(201).send({_id: user._id});
        });
    };

    this.login = function (req, res, next) {
        var body = req.body;
        var shaSum = crypto.createHash('sha256');
        var user;

        shaSum.update(body.pass);
        body.pass = shaSum.digest('hex');

        User.findOne({firstName: body.firstName, pass: body.pass}, function (err, user) {
            if (err) {
                return next(err);
            }

            if (!user) {
                err = new Error('Bad credentials');
                err.status = 400;

                return next(err);
            }

            delete user.pass;
            req.session.logged = true;

            res.status(200).send(user);
        });
    };

    this.update = function (req, res, next) {
        //ToDo validate body
        var id = req.params.id;
        var body = req.body;

        User.findByIdAndUpdate(id, body, {new: true}, function (err, user) {
            if (err) {
                return next(err);
            }

            delete user.pass;

            res.status(200).send(user);
        });
    };

    this.remove = function (req, res, next) {
        //ToDo validate body
        var id = req.params.id;

        User.findByIdAndRemove(id, function (err, user) {
            if (err) {
                return next(err);
            }

            res.status(200).send({success: 'removed'});
        });
    };
};