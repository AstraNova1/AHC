// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// 🔥 INI PENTING (serve HTML)
app.use(express.static(__dirname));

let users = {};

io.on('connection', socket => {
  console.log('User connected:', socket.id);

  socket.on('join', ({ userId, name }) => {
    users[socket.id] = { userId, name };
    io.emit('users', Object.values(users));
  });

  socket.on('message', msg => {
    io.emit('message', msg);
  });

  socket.on('disconnect', () => {
    delete users[socket.id];
    io.emit('users', Object.values(users));
  });
});

server.listen(3000, () => {
  console.log('✅ Al-Hamid Chat running on http://localhost:3000');
});
