var socket = io();

socket.on('connect', function() {
  console.log("Connected to server");
});


socket.on('newMessage',function (message){
  console.log("New Message", message);

  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  $('#messages').append(li);
});

socket.on('newLocationMessage',function(message){
  var li = $('<li></li>')
  var a  = $('<a target="_blank">My current Location</a>');

  li.text(`${message.from}: `);
  a.attr(`href`, message.url);
  li.append(a);
  $('#messages').append(li);
});


socket.on('disconnect', function() {
  console.log("Disconnected");
});

var messageTextbook = jQuery('[name=message]');

$('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage',{
      from: 'User',
      text: messageTextbook.val()
    }, function(){
      messageTextbook.val('')
  });
});


var locationButton = $('#send-location');
locationButton.on('click', function() {

  if(!navigator.geolocation){
    return alert("Geolocation is not supported");
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');


  navigator.geolocation.getCurrentPosition(function (position){
    locationButton.removeAttr('disabled').text('Send location');
      socket.emit('createLocationMessage',{
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
  }, function(){
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  });

});
