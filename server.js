const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// 🔥 WAJIB: biar index.html bisa dibuka
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Simpan user online
let users = {};

// Socket.IO
io.on("connection", socket => {
  console.log("User connected:", socket.id);

  socket.on("join", ({ userId, name }) => {
    users[socket.id] = { userId, name };
    io.emit("users", Object.values(users));
  });

  socket.on("message", msg => {
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    delete users[socket.id];
    io.emit("users", Object.values(users));
    console.log("User disconnected:", socket.id);
  });
});

// 🔥 INI BAGIAN PORT YANG WAJIB UNTUK DEPLOY
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("✅ Server running on port", PORT);
});
