const socket = io();

let output = document.getElementById("output");
let message = document.getElementById("message");
let username = document.getElementById("username");
let typing = document.getElementById("isTyping");
let btnSend = document.getElementById("send");
let listMessage = document.getElementById("list-message");
let userMsg = document.getElementById("userMsg");

btnSend.addEventListener("click", () => {
    typing.innerHTML = '';
  const data = {
    username: username.value,
    message: message.value,
  };

  // se envia el evento por el metodo emit, el cual como primer parametro recibe el nombre con el que queremos llamar y enviar nuestro evento "chat:message"
  socket.emit("chat:message", data);
});

message.addEventListener('keypress', () => {
    socket.emit("chat:typing", username.value);
})

socket.on('chat:typing:serve', (data) => {
    typing.innerHTML = `<p>
        ${data} esta escribiendo...
    </p>`;
})

socket.on("chat:message:serve", (data) => {
    const card = `<div class="userMsg">
        <label> ${data.username} : ${data.message} </label> 
    </div>`
    listMessage.insertAdjacentHTML("beforeend", card);
});
