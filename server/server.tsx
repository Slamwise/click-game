const express = require("express")
const app = express()
const http = require("http")
const { Server } = require("socket.io")
const cors = require("cors")
const cookieLib = require("cookie")
const cookieParser = require("cookie-parser")

app.use(cors())
app.use(cookieParser())
app.use(function (req,res,next) {
    console.log('cookies: ' + req.cookies)
    var cookie = req.cookies.cookieName
    if (cookie === undefined) {
      //cookie not defined, set a new cookie
      var hash = Math.random().toString();
      hash = hash.substring(2,hash.length);
      res.cookie('cookieName', hash, { maxAge: 900000, httpOnly: false });
      console.log('cookie created successfully');
    }
  next();
  })

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
    // socket.handshake.headers.cookie = cookieLib.serialize('name', socket.id)
    var users = []
    for (let [id, socket] of io.of("/").sockets) {
        users.push({
        userID: id,
        username: socket.handshake.auth.userName,
        cookie: socket.handshake.headers.cookie
        })
    }
    
    console.log(users)
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