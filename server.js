var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080;

var mongoose = require('mongoose');
var mongoDbUri = 'mongodb://heroku_2:heroku_2@ds013340.mlab.com:13340/heroku_2zhtbsdn';
mongoose.connect(mongoDbUri);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

app.get('/', function(req, res){
    res.send('get request received');
});

app.listen(PORT, function(){
  console.log('listening on Port: '+ PORT);
})
