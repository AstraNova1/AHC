const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve file frontend
app.use(express.static(path.join(__dirname, "public")));

// Socket
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("chat", (msg) => {
    io.emit("chat", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Railway PORT
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
