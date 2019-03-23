var socket = io();

function scrollToButtom() {
  //selectors
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child')
  //heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function () {
  console.log("Connected to server");
});


socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('hh:MM a');
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  $('#messages').append(html);
  scrollToButtom();
});

socket.on('newLocationMessage', function (message) {
  var formattedLocationTime = moment(message.createdAt).format('hh:MM a');
  var template = $('#location-template').html();
  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedLocationTime
  });

  // var li = $('<li></li>')
  // var a  = $('<a target="_blank">My current Location</a>');
  //
  // li.text(`${message.from} ${formattedLocationTime}: `);
  // a.attr(`href`, message.url);
  // li.append(a);
  $('#messages').append(html);
  scrollToButtom();
});


socket.on('disconnect', function () {
  console.log("Disconnected");
});

var messageTextbook = jQuery('[name=message]');

$('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbook.val()
  }, function () {
    messageTextbook.val('')
  });
});


var locationButton = $('#send-location');
locationButton.on('click', function () {

  if (!navigator.geolocation) {
    return alert("Geolocation is not supported");
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');


  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  });

});


//chat list sidebar show/hide
$("#menu").on('click', function () {
  $(".chat__sidebar").toggleClass("open");
});