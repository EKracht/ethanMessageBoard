'use strict';

var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
  name: String,
  posted: String,
  time: Number
});

var Message = mongoose.model('Message', messageSchema);

module.exports = Message;