'use strict';

$(document).ready(init);

var index = {};
var timeChange = 0;

function init(){
  $('#submit').on('click', addMessage);
  $('#messageList').on('click', 'td.delete', deleteMessage);
  $('#messageList').on('click', 'td.edit', openModalEdit);
  $('#saveEdit').on('click', saveEdit);
}

function saveEdit(){
  var message = {};
  message.name = $('#editName').val();
  message.posted = $('#editMessage').val();
  message.time = Date.now();
  message.change = timeChange;

  $('input').each(function(index, input){
    $(input).val('');
  });

  $.ajax({
    url: '/messageBoard',
    type: 'PUT',
    data: message
  })
  .done(function(data){
    console.log(data);
    $('#messageList').children("tr:nth-child(" + parseInt(index.value + 1) + ")").replaceWith(messageRow(message));
  })
  .fail(function(err){
  })
}

function openModalEdit(e){
  var $target = $(e.target);
  var $tr = $target.closest('tr');
  index.value = $tr.index();
  var $targetRow = $target.closest('tr');
  var $tdName = $targetRow.children('.name');
  var $tdMessage = $targetRow.children('.posted');
  var $tdTime = $targetRow.children('.time');
  $('.editName').val($tdName.text());
  $('.editMessage').val($tdMessage.text());
  timeChange = $tdTime.text();
}

function deleteMessage(e){
  var $target = $(e.target);
  var $tr = $target.closest('tr');
  var index = $tr.index();
  var timeStamp = $tr.children('.time').text();

  $.ajax({
    url: "/messageBoard",
    type: "DELETE",
    data: {time: timeStamp}
  })
  .done(function(data){
    $tr.remove();
  })
  .fail(function(err){
  })
}

function addMessage(){
  var message = {};
  message.name = $('#addName').val();
  message.posted = $('#addMessage').val();
  message.time = Date.now();

  $('input').each(function(index, input){
    $(input).val('');
  });

  $.post('/messageBoard', message)
  .done(function(data){
    var $messageRow = messageRow(message);
    $('#messageList').append($messageRow);
  })
  .fail(function(err){
  })
}

function messageRow(message){
  var $tr = $('<tr>');
  var $name = $('<td>').addClass('name').text(message.name);
  var $posted = $('<td>').addClass('posted').text(message.posted);
  var $time = $('<td>').addClass('time').text(message.time);

  var $editTd = $('<td>').addClass('edit text-center');
  var $editIcon = $('<i>').addClass('fa fa-pencil-square-o fa-lg').attr('data-target','#myModal').attr('data-toggle','modal')
  $editTd.append($editIcon)

  var $deleteTd = $('<td>').addClass('delete text-center');
  var $deleteIcon = $('<i>').addClass('fa fa-trash-o fa-lg')
  $deleteTd.append($deleteIcon)

  $tr.append($name, $posted, $time, $editTd, $deleteTd);
  return $tr;
}
