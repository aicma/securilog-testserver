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

app.get('/', function(req, res){
    
    res.send('get request received ' );
});

app.post('/person/new/:name/:firstName/:isMale/', function(req,res){
    console.log(req.params.name+ ', '+ req.params.firstName);

    var tempPerson = new Person({
        name: req.params.name,
        firstName: req.params.firstName,
        isMale: req.params.isMale,
        birthday: new Date();
    })

    tempPerson.save(function(err){
        if(err) throw err;
        console.log(tempPerson.name + ' saved');
    })
    res.send('')
/*
    person1 = new Person({
        name: req.params.name,
        firstName: req.params.firstName,
        isMale: req.params.isMale,
        borthday: rq.params.Date
    });

    person1.save(function(err){
        if(err) throw err;
        console.log('person saved');
    })*/
});

app.listen(PORT, function(){
  console.log('listening on Port: '+ PORT);
})
