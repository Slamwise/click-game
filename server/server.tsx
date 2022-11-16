const express = require("express")
const app = express()
const http = require("http")
const { Server } = require("socket.io")
const cors = require("cors")
const cookieLib = require("cookie")
const cookieParser = require("cookie-parser")
const axios = require("axios")

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
      res.status(200).json({setCookie: hash})
      console.log('cookie created successfully');
  }
  else {
      res.status(403).json({msg: 'cookie already set'})
  }
  next();
}
// const validateCookie = (req,res,next) => {
//   const { cookies } = req
//   //console.log(cookies)
//   if ('session_id' in cookies) {
//       //console.log(`Session id exists`)
//       if (cookies.session_id === 'session_id') {
//           next()}
//       else {
//           res.status(403).send({msg: 'not authenticated'})}
//       }
//   else {
//       res.status(403).send({msg: 'not authenticated'})}
// }

// Generate cookies upon landing on the homepage
app.get('/setCookies', createCookie, (req, res) => {
})

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
    }
    })

io.on("connection", async (socket) => {   
    var _user = socket.handshake.auth.userName
    var cookie = socket.handshake.auth.cookie
    var token = socket.handshake.auth.token
    console.log("user connected: " + _user)
    await axios.post(`http://localhost:3001/users/connect?username=${_user}&token=${token}&cookie=${cookie}`)
    .catch((err) => {console.log('error')})

    console.log('clients: '+io.engine.clientsCount) 

    socket.on('refresh', () => {
        for (let [id, socket] of io.of("/").sockets) {
            //console.log(socket.handshake.auth.cookie)
            }
    })

    socket.on('disconnect', () => {
        axios.post(`http://localhost:3001/users/disconnect?username=${_user}&token=${token}`)
    })
})

const usersRouter = require('./routes/routes.ts')

app.use('/users', usersRouter)

server.listen(3001, () => {
  console.log("SERVER IS RUNNING")
})