const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log("New user connected");

  socket.emit('newMessage', {
    from: "Sarah",
    text: "Hi there",
    createdAt: 1236
  });



  socket.on('createMessage',(newMessage) => {
    console.log(newMessage);
  });




  socket.on('disconnect', (socket) => {
    console.log("User Disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server running on ${port}`);
});
