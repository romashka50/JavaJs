var Model = require('../models/post');
var validator = require('validator');
var User = require('../models/user');

module.exports = function () {
    this.fetch = function (req, res, next) {
        Model
            .find({}, {__v: 0})
            .lean()
            .exec(function (err, users) {
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

        Model
            .findById(id, {__v: 0})
            .lean()
            .exec(function (err, post) {
                if (err) {
                    return next(err);
                }

                res.status(200).send(post);
            });
    };

    this.create = function (req, res, next) {
        //ToDo validate body
        var body = req.body;

        var post = new Model(body);

        post.save(function (err, post) {
            if (err) {
                return next(err);
            }

            if (body.author) {
                User.findByIdAndUpdate(body.author, {$push: {posts: post._id}}, function(err, user){
                    if(err){
                        console.error(err);
                    }
                });
            }

            res.status(201).send({_id: post._id});
        });
    };

    this.update = function (req, res, next) {
        //ToDo validate body
        var id = req.params.id;
        var body = req.body;

        Model.findByIdAndUpdate(id, body, {new: true}, function (err, post) {
            if (err) {
                return next(err);
            }

            res.status(200).send(post);
        });
    };

    this.remove = function (req, res, next) {
        //ToDo validate body
        var id = req.params.id;

        Model.findByIdAndRemove(id, function (err, post) {
            if (err) {
                return next(err);
            }

            res.status(200).send({_id: post._id});
        });
    };
};