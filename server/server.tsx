const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    socket.username = username;
    next();
  });

// Use this to fetch user databse to display on front end.
io.on("connection", (socket) => {
    var users = [];
    for (let [id, socket] of io.of("/").sockets) {
        users.push({
        userID: id,
        username: socket.username,
        });
    }
    socket.emit("users", users);
    // ...
    });

io.on("connection", (socket) => {
    // notify existing users
    var _user = socket.handshake.auth.userName
    console.log("user connected: " + _user)
    socket.broadcast.emit("user connected", {
        userID: socket.id,
        username: socket.username,
    });
    });

io.on('user-added', () => {
    console.log('user added succesfully')
})

io.on('user-added-error', () => {
    console.log('there was an error adding user')
})

// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("join_room", (data) => {
//     socket.join(data);
//   });

//   socket.on("send_message", (data) => {
//     socket.to(data.room).emit("receive_message", data);
//   });
// });

const usersRouter = require('./routes/routes.ts');

app.use('/users', usersRouter);

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});