const socket = io();

const usernameInput = document.getElementById("username");
const setUsernameBtn = document.getElementById("setUsernameBtn");
const messageInput = document.getElementById("message");
const sendButton = document.getElementById("sendBtn");
const messagesDiv = document.getElementById("messages");

let username = "Anonymous"; 

setUsernameBtn.addEventListener("click", () => {
  const name = usernameInput.value.trim();
  if (name) {
    username = name;
    socket.emit("set username", username);
    usernameInput.disabled = true; 
    setUsernameBtn.disabled = true;
  }
});

sendButton.addEventListener("click", () => {
  const msg = messageInput.value.trim();
  if (msg) {
    socket.emit("chat message", msg);
    messageInput.value = "";
  }
});

socket.on("chat message", ({ sender, msg }) => {
  console.log(`Received message from ${sender}: ${msg}`); 
  const div = document.createElement("div");
  div.innerHTML = `<strong>${sender}:</strong> ${msg}`;
  messagesDiv.appendChild(div);
});
