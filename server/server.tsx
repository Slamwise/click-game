const express = require("express")
const app = express()
const http = require("http")
const { Server } = require("socket.io")
const cors = require("cors")
const cookieLib = require("cookie")
const cookieParser = require("cookie-parser")

app.use(cors())
app.use(cookieParser())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
    }
    })



io.on("connection", (socket) => {
    // var cookies = cookie.parse(socket.handshake.headers.cookie);      
    var _user = socket.handshake.auth.userName
    console.log("user connected: " + _user)
    // socket.handshake.headers.cookie = cookieLib.serialize('name', socket.id)
    var users = []
    for (let [id, socket] of io.of("/").sockets) {
        users.push({
        userID: id,
        username: socket.handshake.auth.userName,
        //cookie: socket.handshake.headers.cookie
        })
    }
    console.log(users)
    console.log(socket.handshake.headers)
    })

const usersRouter = require('./routes/routes.ts')

app.use('/users', usersRouter)

server.listen(3001, () => {
  console.log("SERVER IS RUNNING")
})