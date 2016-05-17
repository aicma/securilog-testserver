var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080;

var mongoose = require('mongoose');
var mongoDbUri = 'mongodb://amf:241187@ds013340.mlab.com:13340/heroku_2zhtbsdn';
mongoose.connect(mongoDbUri);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback(){
    console.log('connected to db');

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

    var locationSchema = new mongoose.Schema({
        name: String
    });

    var eventSchema = new mongoose.Schema({
        date: { type: Date, default: Date.now },
        description: String,
        del_req: Boolean,
        inv_person: [personSchema],
        createdBy: userSchema,
        location: locationSchema

    });

    var Person = db.model('Person', personSchema);
    var User = db.model('User', userSchema);
    var location = db.model('Location', locationSchema);
    var Event = db.model('Event', eventSchema);

    var person1 = new Person({
        name: 'Mersdorf',
        firstName: 'Alex',
        isMale: true,
    });

    person1.save(function(err){
        if(err) throw err;
        console.log('person saved');
    })
    
})

app.get('/', function(req, res){
    console.log(alex.name);
    res.send('get request received ' );
});

app.listen(PORT, function(){
  console.log('listening on Port: '+ PORT);
})
