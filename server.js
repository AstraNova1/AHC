const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// PORT WAJIB PAKAI ENV (buat deploy)
const PORT = process.env.PORT || 3000;

// serve file static (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// test route biar ga "Cannot GET /"
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// socket.io
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
