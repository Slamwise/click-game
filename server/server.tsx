const express = require("express")
const app = express()
const http = require("http")
const { Server } = require("socket.io")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const axios = require("axios")
const knex = require("./db.ts")

app.use(cors())
app.use(cookieParser())

const server = http.createServer(app)

// Generate cookies upon landing on the homepage
app.post('/setCookies', (req, res) => {
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

    console.log("user connected: " + _user)

    axios.post(`http://localhost:3001/users/connect?username=${_user}&cookie=${cookie}&socketId=${socket.id}`)
    .catch((err) => {console.log(err)})

    console.log('clients: '+io.engine.clientsCount) 
    
    socket.on('request', (data) => {
        console.log(data)
        io.to(data.to.socketId).emit('game_request', data.from)
    })

    socket.on('updateOnline', () => {
        var users = [];
        for (let [id, socket] of io.of("/").sockets) {
            users.push({
            id: id,
            userName: socket.handshake.auth.userName,
            cookie: socket.handshake.auth.cookie
            })}
        knex.select().from('onlineUsers')
        .then((data) => {
              for (let u of data) {
                  if (!(u.cookie in users.map(user=>user.cookie))) {
                    axios.post(`http://localhost:3001/users/disconnect?username=${u.userName}&cookie=${u.cookie}`)
                  }
              }
        })
    })

    socket.on('disconnect', () => {
        axios.post(`http://localhost:3001/users/disconnect?username=${_user}&cookie=${cookie}`)
    })
})

const usersRouter = require('./routes/routes.ts')

app.use('/users', usersRouter)

server.listen(3001, () => {
  console.log("SERVER IS RUNNING")
})