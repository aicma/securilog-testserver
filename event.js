var mongoose = require('mongoose');
    ,ObjectId = Schema.ObjectId;



var eventSchema = new mongoose.Schema({
        date: { type: Date, default: Date.now },
        description: String,
        del_req: Boolean,
        inv_person: [ObjectId],
        createdBy: ObjectId,
        location: ObjectId
});

module.exports = mongoose.model('Event', eventSchema);