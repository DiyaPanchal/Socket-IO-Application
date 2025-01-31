import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 3001;
const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("set username", (username) => {
    socket.username = username || "Anonymous";
  });

  socket.on("chat message", (msg) => {
    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });
    io.emit("chat message", {
      sender: socket.username,
      msg,
      timestamp,
      id: socket.id,
    });
  });

  socket.on("disconnect", () => console.log("User disconnected"));
});

server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
