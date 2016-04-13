var mongoose = require('mongoose');
var uuid = require('node-uuid');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    _id        : {type: String, default: uuid.v4},
    pass       : {type: String, required: true},
    firstName  : String,
    lastName   : {type: String, default: 'Pupkin'},
    dateOfBirth: {type: Date, default: Date.now},
    posts      : [{type: String, ref: 'post', default: null}],
    friends    : [String]
});

module.exports = mongoose.model('user', UserSchema);
