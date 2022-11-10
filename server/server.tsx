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

// Middleware functions for cookie handling
const createCookie = (req,res,next) => {
  var cookie = req.cookies.session_id
  if (cookie === undefined) {
      //cookie not defined, set a new cookie
      var hash = Math.random().toString();
      hash = hash.substring(2,hash.length);
      res.cookie('session_id', hash, { maxAge: 9000000000, httpOnly: false, secure: false, sameSite: 'none'});
      //console.log('cookie created successfully');
  }
  next();
}
const validateCookie = (req,res,next) => {
  const { cookies } = req
  //console.log(cookies)
  if ('session_id' in cookies) {
      //console.log(`Session id exists`)
      if (cookies.session_id === 'session_id') {
          next()}
      else {
          res.status(403).send({msg: 'not authenticated'})}
      }
  else {
      res.status(403).send({msg: 'not authenticated'})}
}

// Generate cookies upon landing on the homepage
app.get('/setCookies', createCookie, validateCookie, (req, res) => {
    console.log(`Cookie created ===== ${req.cookie}`)
    res.status(200)
})

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
    }
    })

io.on("connection", async (socket) => {
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
    console.log('clients: '+io.engine.clientsCount)

    socket.on('disconnect', () => {
        socket.disconnect()
        console.log(socket.handshake.auth.userName + ' disconnected')
    })
    socket.on('refresh', () => {
        console.log(io.sockets.clients())
        console.log('success')
    })
    })

const usersRouter = require('./routes/routes.ts')

app.use('/users', usersRouter)

server.listen(3001, () => {
  console.log("SERVER IS RUNNING")
})