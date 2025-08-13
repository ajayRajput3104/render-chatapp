const express = require("express");
const http = require("http");
const path = require("path");
const app = express();

const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server);

app.use(express.static(path.resolve("./public")));

let filePath = path.join(__dirname, "/public/", "index.html");

//socket.io
io.on("connection", (socket) => {
  //socket->client
  console.log(`A new user has connected with id:${socket.id}`);
  socket.on("send-message", (message) => {
    socket.broadcast.emit('receive-message',message)
  });
});
//http request
app.get("/", (req, res) => {
  return res.sendFile(filePath);
});
server.listen(3000, () => {
  console.log(`Server started at http://localhost:3000`);
});
