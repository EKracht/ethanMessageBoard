'use strict';

$(document).ready(init);

var index = {};

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
  message.time = $('#editTime').val();
  message.date = $('#editDate').val();
  message.index = index.value;

  $('input').each(function(index, input){
    $(input).val('');
  });

  $.ajax({
    url: '/messageBoard/update',
    type: 'POST',
    data: message
  })
  .done(function(data){
    $('#messageList').children("tr:nth-child(" + parseInt(index.value + 1) + ")").replaceWith(messageRow(data));
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
  var $tdMessage = $targetRow.children('.message');
  var $tdTime = $targetRow.children('.time');
  var $tdDate = $targetRow.children('.date');
  $('.editName').val($tdName.text());
  $('.editMessage').val($tdMessage.text());
  $('.editTime').val($tdTime.text());
  $('.editDate').val($tdDate.text());

  console.log($('.editName'));
  console.log($('.editMessage'));
  console.log($('.editTime'));
  console.log($('.editDate'));
}

function deleteMessage(e){
  var $target = $(e.target);
  var $tr = $target.closest('tr');
  var index = $tr.index();

  $.ajax({
    url: "/messageBoard/delete",
    type: "DELETE",
    data: {index: index}
  })
  .done(function(data){
    $tr.remove();
  })
  .fail(function(err){
  })
}

function addMessage(){
  var message = {};
  message.name = $('input#name').val();
  message.posted = $('input#message').val();
  message.time = $('input#time').val();
  message.date = $('input#date').val();

  $('input').each(function(index, input){
    $(input).val('');
  });

  $.post('/messageBoard', message)
  .done(function(data){
    var $messageRow = messageRow(message);
    console.log($messageRow);
    $('#messageList').append($messageRow);
  })
  .fail(function(err){
  })
}

function messageRow(message){
  var $tr = $('<tr>');
  var $name = $('<td>').addClass('name').text(message.name);
  var $posted = $('<td>').addClass('message').text(message.posted);
  var $time = $('<td>').addClass('time').text(message.time);
  var $date = $('<td>').addClass('date').text(message.date);

  var $editTd = $('<td>').addClass('edit text-center');
  var $editIcon = $('<i>').addClass('fa fa-pencil-square-o fa-lg').attr('data-target','#myModal').attr('data-toggle','modal')
  $editTd.append($editIcon)

  var $deleteTd = $('<td>').addClass('delete text-center');
  var $deleteIcon = $('<i>').addClass('fa fa-trash-o fa-lg')
  $deleteTd.append($deleteIcon)

  $tr.append($name, $posted, $time, $date, $editTd, $deleteTd);
  return $tr;
}
