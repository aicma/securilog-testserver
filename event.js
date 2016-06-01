var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;



var eventSchema = new mongoose.Schema({
        date: { type: Date, default: Date.now },
        description: String,
        del_req: {type: Boolean, default: false},
        inv_person: [{type: ObjectId, ref: 'Person'}],
        createdBy: {type: ObjectId, ref: 'User'},
        location: {type: ObjectId, ref: 'Location'}
});

module.exports = mongoose.model('Event', eventSchema);