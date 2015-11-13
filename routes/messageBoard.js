'use strict';

var express = require('express');
var router = express.Router();

var Message = require('../models/message');

router.get('/', function(req, res){
  Message.find({}, function(err, messages){ 
    if (err) return res.status(400).send(err);
    res.render('messageBoard', {title: 'Message Board', items: messages});
  });
});

router.post('/', function(req, res){
  var message = new Message(req.body);
  message.save(function(err, savedMessage){
    if (err) return res.status(400).send(err);
    res.send(savedMessage);
  })
});

router.delete('/', function(req, res){
  var timeStamp = req.body.time;
  Message.remove({time: timeStamp}, function(err, message){
    if (err) return res.status(400).send(err);
    res.send();
  });
});

router.put('/', function(req, res){
  var name = req.body.name;
  var posted = req.body.posted;
  var timeStamp = req.body.time;
  var timeOriginal = req.body.change;
  Message.update({time: timeOriginal}, {name: name, posted: posted, time: timeStamp}, function(err, message){
    if (err) return res.status(400).send(err);
    res.send();
  });
});

module.exports = router;