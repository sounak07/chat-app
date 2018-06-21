var socket = io();

socket.on('connect', function() {
  console.log("Connected to server");
});

socket.emit('createMessage', {
  from: "Rick",
  text: "Whats up?"
}, function(data){
  console.log("Got it", data);
});

socket.on('newMessage',function (msg){
  console.log("New Message", msg);
});


socket.on('disconnect', function() {
  console.log("Disconnected");
});
