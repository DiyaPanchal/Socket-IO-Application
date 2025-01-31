const socket = io();

const usernameInput = document.getElementById("username");
const setUsernameButton = document.getElementById("setUsernameButton");
const messageInput = document.getElementById("message");
const sendButton = document.getElementById("sendButton");
const messagesDiv = document.getElementById("messages");

let socketId = "";

setUsernameButton.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  socket.emit("set username", username);
  usernameInput.disabled = true;
  setUsernameButton.disabled = true;
});

socket.on("connect", () => {
  socketId = socket.id;
});

sendButton.addEventListener("click", () => {
  const msg = messageInput.value.trim();
  if (msg) {
    socket.emit("chat message", msg);
    messageInput.value = "";
  }
});

socket.on("chat message", ({ sender, msg, timestamp, id }) => {
  const isSelf = id === socketId;
  const div = document.createElement("div");
  div.innerHTML = `${
    isSelf ? "You" : sender
  } sent this message on ${timestamp} : ${msg}`;
  messagesDiv.appendChild(div);
});
