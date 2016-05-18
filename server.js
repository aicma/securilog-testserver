var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080;

var mongoose = require('mongoose');
var mongoDbUri = 'mongodb://amf:241187@ds013340.mlab.com:13340/heroku_2zhtbsdn';
mongoose.connect(mongoDbUri);
var db = mongoose.connection;

var Person = require('./person.js');
var User = require('./user.js');
var Event = require('./event.js');

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback(){
    console.log('connected to db');
    
})

app.get('/:name', function(req, res){
    //res.send('get request received ' );
    Person.find({name: req.params.name}, function(err, person){
        if(err){console.log('no one found');}
        res.send('i found: ' + person);
    })
    
});

app.post('/person/new/:name/:firstName/:isMale/:date', function(req,res){

    var tempPerson = new Person({
        name: req.params.name,
        firstName: req.params.firstName,
        isMale: req.params.isMale,
        birthday: req.params.date
    })

    Person.find({
        name: req.params.name,
        firstName: req.params.firstName,
        isMale: req.params.isMale,
        birthday: req.params.date
    }, function(err, persons){
        console.log(persons.length)
    })

    tempPerson.save(function(err){
        if(err) throw err;
        res.send(tempPerson.name + ' saved');
    })
});



app.listen(PORT, function(){
  console.log('listening on Port: '+ PORT);
})
