var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express');
var mongojs = require('mongojs');
var db = mongojs('Chat', ['users']);
var bodyParser = require('body-parser');
//var sendmail = require('sendmail')();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/lib'));
app.use(express.static(__dirname + '/node_modules'));
app.use(bodyParser.json());

console.log(__dirname);

app.get('/', function(req, res){
  console.log('Request hit on default path');
  res.sendFile(__dirname + '/public/htmlFiles/signin.html');
});

app.get('/getContacts', function(req, res){
  console.log("Request hit on get contacts api");
  db.info.find(function(err, docs){
    if(docs){
      console.log(docs);
      res.json(docs);
    }
  });
});

app.get('/getUsers', function(req, res){
  console.log("Request hit on get User api");
  db.users.find(function(err, docs){
    if(docs){
      console.log(docs);
      res.json(docs);
    }
  });
});

app.post('/registerUser', function(req, res){
  console.log('Registering a new user');
  db.users.insert(req.body, function(err, docs){
    res.json(docs);
  })
});
//app.use('static', express.static(__dirname + '/static'));
io.on('connection', function(socket){

  console.log('User connected');
  socket.on('chatMessage', function(from, msg){
    io.emit('chatMessage', from, msg);
  });
  socket.on('notifyUser', function(user){
    io.emit('notifyUser', user);
  });
});
http.listen(3000, function(){
  console.log('listening on 3000');
});
