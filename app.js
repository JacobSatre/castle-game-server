const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors())
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:8080",
      methods: ["GET", "POST"]
    }
  });

let counter = 0;
let engine = io.engine;

io.on('connection', (socket) => {
  console.log(`A new user joined! Now we have ${engine.clientsCount} users.`);
  io.emit("counter", counter);
  socket.on("hello", (data) => {
    console.log("hello!", counter);
    counter++;
    io.emit("counter", counter);
  })
});

io.on('hello', (socket) => {
    console.log('hello');
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});