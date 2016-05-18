var mongoose = require('mongoose');

var personSchema = new mongoose.Schema({
        //PERSO NUMMER = ID
        name: String,
        firstName: String,
        isMale: Boolean,
        birthday: {type: Date, default: Date.now}
    });

module.exports = mongoose.model('Person', personSchema);