var mongoose = require('mongoose');
var uuid = require('node-uuid');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    _id      : {type: String, default: uuid.v4},
    name     : {type: String, required: true},
    author   : {type: String, ref: 'user', default: null},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('post', PostSchema);
