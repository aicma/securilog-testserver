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

app.get('/people/', function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    Person.find(function(err, people){
        if(err) throw err;
        res.status(200).send(people);
    })
});

app.get('/locations/', function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    Location.find(function(err, locations){
        if(err) throw err;
        res.status(200).send(locations);
    })
});

app.get('/people/:id', function(req, res){
    Person.findOne({_id: req.params.id}, function(err, person){
        if(err){
            res.status(404).send('no entry');
            console.log('no one found');
        }
        res.header("Access-Control-Allow-Origin", "*");
        res.send(person);
    })   
});

app.get('/people/:name', function(req, res){
    Person.find({name: new RegExp("^" + req.params.name + "$", 'i')}, function(err, persons){
        if(err){
            res.status(404).send('no entry');
            console.log('no one found');
        }
        res.header("Access-Control-Allow-Origin", "*");
        res.send(persons);
    })   
});

app.get('/events/search', function(req, res){
    var tempPerson;
    Person.findOne({name: new RegExp("^" + req.query.name + "$", 'i')}, function(err, person){
        if(!person){
            res.status(404).send('Es ist keine Person mit diesem Namen hinterlegt');
        }
        tempPerson = person;
        }).then(function(){
            Event.find({inv_person: tempPerson}, function(err, events){
                if(err) throw err;
            res.header("Access-Control-Allow-Origin", "*");
            res.status(200).send(events);
        })
    })
});

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
    res.header("Access-Control-Allow-Origin", "*");
    Event.findOne({_id: req.params.id}, function(err, oneEvent){
        console.log(oneEvent);
        if(err){
            res.status(404).send('no Such event');
        }
        res.status(200).send(oneEvent);
    })
});

app.get('/events',function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    Event.find(function(err, events){
        if(err) throw err;
        res.send(events);
    })
});

app.post('/event/new/', function(req, res){
    var jsonString = '';

    req.on('data', function (data) {
        jsonString += data;
    });

    req.on('end', function () {
        console.log(jsonString);
        var tempEvent = new Event(JSON.parse(jsonString));
        res.status(200).send(tempEvent._id);

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

app.post('/person/new/', function(req,res){

    var tempPerson = new Person({
        name: req.query.name,
        firstName: req.query.firstName,
        isMale: req.query.isMale,
        birthday: req.query.date
    })

    Person.find({
        name: req.query.name,
        isMale: req.query.isMale,
        birthday: req.query.date
    }, function(err, persons){
        if(persons.length == 0){
            tempPerson.save(function(err){
            if(err) throw err;
            //TODO: Write Header
            res.status(200).send(tempPerson._id);
            })
        }else{
            // TODO: Write Header
            res.status(403).send('that person already exists in the Database')
        }
    })
});


app.listen(PORT, function(){
  console.log('listening on Port: '+ PORT);
})
