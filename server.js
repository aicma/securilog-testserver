var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080;

var mongoose = require('mongoose');
var mongoDbUri = 'mongodb://amf:241187@ds013340.mlab.com:13340/heroku_2zhtbsdn';
mongoose.connect(mongoDbUri);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback(){
    var personSchema = new mongoose.Schema({
        name: String,
        firstName: String,
        isMale: Boolean,
        birthday: Date
    });

    var userSchema = new mongoose.Schema({
        name: String,
        firstName: String,
        isAdmin: Boolean
    });

    var eventSchema = new mongoose.Schema({
        date: { type: Date, default: Date.now },
        description: String,
        del_req: Boolean,
        inv_person: [personSchema],
        createdBy: userSchema,
        location: locationSchema

    });
    
    var locationSchema = new mongoose.Schema({
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
