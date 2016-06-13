var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080;

var mongoose = require('mongoose');
var user = "amf";
var pw = "241187";

var mongoDbUri = 'mongodb://' + user +':'+ pw + '@ds013340.mlab.com:13340/heroku_2zhtbsdn';
mongoose.connect(mongoDbUri);
var db = mongoose.connection;

var Person = require('./person.js');
var User = require('./user.js');
var Event = require('./event.js');
var Location = require('./location.js')

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback(){
    console.log('connected to db');
    
})

app.get('/people/:id', function(req, res){
    Person.findOne({_id: req.params.id}, function(err, person){
        if(err){console.log('no one found');}
        res.send(person);
    })   
});

app.get('/people/:name', function(req, res){
    Person.find({name: req.params.name}, function(err, persons){
        if(err){console.log('no one found');}
        res.send(persons);
    })   
});

app.get('/events/:involvedName', function(req, res){
    var tempPersons;
    Person.find({name: req.params.involvedName}, function(err, persons){
            tempPersons = persons;
            console.log(persons);
        }).then(function(){
            Event.find({inv_person: tempPersons}, function(err, events){
                res.send(events);
            });
        })
})

app.put('/events/:id/:invName',function(req, res){
    var tempEvent;
    var tempPerson;
    Event.findOne({_id: req.params.id}, function(err, oneEvent){
        if(err) throw err;
        console.log(oneEvent);
        tempEvent = oneEvent;
    }).then(function(){
        Person.findOne({name: req.params.invName}, function(err, onePerson){
            if(err) throw err;
            console.log(onePerson);
            tempPerson = onePerson;
        }).then(function(){
            tempEvent.inv_person.push(tempPerson);
            tempEvent.save(function(err){
                if(err) throw err;
            });
            res.send('new Event: ' + tempEvent);
        })
    })
});

app.get('/events/:id',function(req, res){
    console.log('param: '+ req.params.id);
    Event.findOne({_id: req.params.id}, function(err, oneEvent){
        console.log(oneEvent);
        if(err) throw err;
        res.send(oneEvent);
    })
});

app.get('/events',function(req, res){
    Event.find(function(err, events){
        if(err) throw err;
        res.header("Access-Control-Allow-Origin", "*");
        res.send(events);
    })
});

app.post('/event/new/', function(req, res){
    var jsonString = '';

    req.on('data', function (data) {
        jsonString += data;
    });

    req.on('end', function () {
        var tempEvent = new Event(JSON.parse(jsonString));
        res.send(tempEvent);

        tempEvent.save(function(err){
            if(err) throw err;
        });
    });
});

app.post('/location/new/', function(req, res){
    var jsonString = '';

    req.on('data', function (data) {
        jsonString += data;
    });

    req.on('end', function () {
        var tempLocation = new Location(JSON.parse(jsonString));
        res.send(tempLocation);
        
        tempLocation.save(function(err){
            if(err) throw err;
        });
    });
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
        if(persons.length == 0){
            tempPerson.save(function(err){
            if(err) throw err;
            //TODO: Write Header
            res.send(tempPerson.name + ' saved');
            })
        }else{
            // TODO: Write Header
            res.send('that person already exists in the Database')
        }
    })
});


app.listen(PORT, function(){
  console.log('listening on Port: '+ PORT);
})
