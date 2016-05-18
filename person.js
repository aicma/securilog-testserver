var mongoose = require('mongoose');

var personSchema = new mongoose.Schema({
        name: String,
        firstName: String,
        isMale: Boolean,
        birthday: Date
    });

module.exports = mongoose.model('Person', personSchema);