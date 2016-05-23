var mongoose = require('mongoose');

var locationSchema = new mongoose.Schema({
    name: String,
    city: String
})

module.exports = mongoose.model('Location', locationSchema);