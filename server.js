var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080;

var mongoose = require('mongoose');
var mongoDbUri = 'mongodb://amf:241187@ds013340.mlab.com:13340/heroku_2zhtbsdn';
mongoose.connect(mongoDbUri);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback(){
    var eventSchema = mongoose.Schema({
        date: { type: Date, default: Date.now },
        description: String,
        del_req: Boolean,
        inv_person: [personSchema],
        createdBy: userSchema,
        location: locationSchema

    });

    var userSchema = mongoose.Schema({
        name: String,
        firstName: String,
        isAdmin: Boolean
    });

    var personSchema = mongoose.Schema({
        name: String,
        firstName: String,
        isMale: Boolean,
        birthday: Date,
        involved: [eventSchema]
    });

    var locationSchema = mongoose.Schema({
        name: String,
        employees: [userSchema],
        events: [eventSchema]
    })
})

app.get('/', function(req, res){
    res.send('get request received ' + db.stats() );
});

app.listen(PORT, function(){
  console.log('listening on Port: '+ PORT);
})
