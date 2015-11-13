'use strict';

// var mongoose = require('mongoose');

// var messageSchema = mongoose.Schema({
//   name: String,
//   posted: String,
//   time: Number,
// });

// var Message = mongoose.model('Message', messageSchema);

var fs = require('fs');
var moment = require('moment');

var Message = {};

var db = 'db/messages.json';

Message.findAll = function(cb){
  fs.readFile(db, function(err, data){
    if (err) return cb(err);
    var messages = JSON.parse(data);
    cb(null, messages);
  });
};

Message.create = function(message, cb){
  Message.findAll(function(err, messages){
    messages.push(message);
    var data = JSON.stringify(messages);
    fs.writeFile(db, data, cb);
  });
};

Message.remove = function(index, cb){
  Message.findAll(function(err, messages){
    console.log('remove', index);
    messages.splice(index, 1);
    var data = JSON.stringify(messages);
    fs.writeFile(db, data, cb);
  });
};

Message.update = function(message, cb){
  Message.findAll(function(err, messages){
    if (err) return cb(err);
    messages.splice(message.index, 1, message);
    var data = JSON.stringify(messages);
    fs.writeFile(db, data, cb);
  });
};

module.exports = Message;