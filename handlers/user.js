var User = require('../models/user');

module.exports = function () {
    this.fetch = function (req, res, next) {
        User
            .aggregate([{
                $project: {
                    //lastName: 1,
                    //dateOfBirth: 1,
                    fullName: {$concat: ['$firstName', ' ', '$lastName']}
                }
            }])
            .exec(function (err, users) {
                if (err) {
                    return next(err);
                }

                res.status(200).send(users);
            })
    }
};