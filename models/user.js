var mongoose = require('mongoose');
var uuid = require('node-uuid');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    _id: {type: String, default: uuid.v4},
    firstName: String,
    lastName: {type: String, default: 'Pupkin'},
    dateOfBirth: {type: Date, default: Date.now}
});

module.exports = mongoose.model('user', UserSchema);
