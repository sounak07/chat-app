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
  var params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function (err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error')
    }
  })
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

  $('#messages').append(html);
  scrollToButtom();
});


socket.on('disconnect', function () {
  console.log("Disconnected");
});


socket.on('updateUserList', function (users) {
  var ol = jQuery('<ol></ol>');

  users.forEach((user) => {
    ol.append(jQuery('<li></li>').text(user));
  })

  jQuery('#users').html(ol);
});

var messageTextbook = jQuery('[name=message]');

$('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
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