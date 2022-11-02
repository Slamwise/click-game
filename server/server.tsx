const express = require("express")
const app = express()
const http = require("http")
const { Server } = require("socket.io")
const cors = require("cors")
const cookie = require("cookie")

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    }
    })

io.on("connection", (socket) => {

    // var cookies = cookie.parse(socket.handshake.headers.cookie);      

    var _user = socket.handshake.auth.userName
    console.log("user connected: " + _user)

    var users = []
    for (let [id, socket] of io.of("/").sockets) {
        users.push({
        userID: id,
        username: socket.handshake.auth.userName
        })
    }
    console.log(users)
    console.log(socket.handshake)
    console.log(socket.handshake.headers.cookie)
    })

// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`)

//   socket.on("join_room", (data) => {
//     socket.join(data)
//   })

//   socket.on("send_message", (data) => {
//     socket.to(data.room).emit("receive_message", data)
//   })
// })

const usersRouter = require('./routes/routes.ts')

app.use('/users', usersRouter)

server.listen(3001, () => {
  console.log("SERVER IS RUNNING")
})