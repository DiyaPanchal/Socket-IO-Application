import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("set username", (username) => {
    socket.username = username; 
    console.log(`Username set: ${username}`);
  });

  socket.on("chat message", (msg) => {
    const sender = socket.username || "Anonymous"; 
    console.log(`Message from ${sender}: ${msg}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
