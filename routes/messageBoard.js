'use strict';

var express = require('express');
var router = express.Router();

var Message = require('../models/message');

router.get('/', function(req, res){
  Message.findAll(function(err, messages){ 
    if (err) {
      res.status(400).send(err);
    } else {
      res.render('messageBoard', {title: 'Message Board', items: messages});
    }
  });
});

router.post('/', function(req, res){
  var message = req.body;
  Message.create(message, function(err){
    if (err) {
      res.status(400).send(err);
    } else {
      res.send('message created!');
    }
  })
});

router.delete('/delete', function(req, res){
  var index = req.body.index;
  console.log('route', index);
  Message.remove(index, function(err){
    if (err) {
      res.status(400).send(err);
    } else {
      res.send('message deleted!');
    }
  });
});

router.post('/update', function(req, res){
  var message = req.body;
  console.log('route', message);
  Message.update(message, function(err){
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(message);
    }
  });
});


module.exports = router;