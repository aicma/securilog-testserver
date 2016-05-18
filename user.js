var mongoose = require('mongoose');
var ObjectId = Schema.ObjectId;

var userSchema = new mongoose.Schema({
        name: String,
        firstName: String,
        isAdmin: Boolean
    });

module.exports = mongoose.model('User', userSchema);