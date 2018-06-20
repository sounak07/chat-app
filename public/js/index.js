var socket = io();

socket.on('connect', function() {
  console.log("Connected to server");


  socket.emit('createMessage', {
    from: "Sounak",
    text: "Lets catch up"
  })
});


socket.on('newMessage',function (msg){
  console.log("New Message", msg);
});


socket.on('disconnect', function() {
  console.log("Disconnected");
});
