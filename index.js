import express from "express";
import "dotenv/config";
import { createServer } from "http";

const app = express();
const PORT  = process.env.PORT || 3002;
const server = createServer(app);

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
    io.emit("chat message", { sender, msg });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

