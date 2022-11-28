const knex = require("./../db.ts")
const io = require("./../server.tsx")

// Get all users
exports.getUsers = async (req, res) => {
    knex.select().from('users')
        .then((data) =>{
            res.json(data)
        })
        .catch(err => {
            res.json({ message: `There was an error retrieving users: ${err}` })
        })
}

// Match browser cookies to existing user in database
exports.matchCookies = async (req, res) => {
    let val = req.query.value
    knex.select('userName', 'token', 'cookie').from('users')
    .then((data) => {
        let findUser = data.find(x => x.cookie === val)
        if (findUser != undefined) {
            //console.log(findUser)
            res.status(200).json({userName: findUser.userName, token: findUser.token, cookie: findUser.cookie})
        }
        else {
            res.status(403).json({message: `Cookie not attached to an existing user.`})
        }
    })
}

// Create a new user
exports.newUser = async (req, res) => {
    const cookie = req.cookies.session_id
    knex('users').insert({
        userName: req.query.username,
        Wins: 0,
        Losses: 0,
        cookie: cookie
    })
    .then(() => {
        console.log(`succesfully added ${req.query.username} to database`)
        res.status(200).json({message: `succesfully added ${req.query.username} to database`})
    })
    .catch(err => {
        res.status(403).json({ message: `There was an error adding user: ${err}` })
    })
}

// Add connecting user to connected users DB
exports.connect = async (req, res) => {
    let userName = req.query.username
    let cookie = req.query.cookie
    let socketId = req.query.socketId

    // Check if user already in database:
    knex.select('cookie').from('onlineUsers')
    .then((data) => {
        if (data.map(u=>u.cookie).includes(cookie)) {
            //console.log('user already in connected database')
            res.status(200).json({message: `${req.query.username} already in connected database`})
        }
        else {
            knex('onlineUsers').insert({
                userName: userName,
                cookie: cookie,
                socketId: socketId
            })
            .then(() => {
                //console.log(`succesfully added ${req.query.username} to connected database`)
                res.status(200).json({message: `succesfully added ${req.query.username} to connected database`})
            })
            .catch((err) => {
                // console.log(err)
                res.status(403).json({ message: `There was an error adding user to connected database: ${err}` })
            })
        }
    })
}

// Remove disconnecting user from connected users DB
exports.disconnect = async (req, res) => {
    let cookie = req.query.cookie
    // let userName = req.query.username
    knex('onlineUsers').where('cookie', cookie).del()
    .then(() => {
        // console.log((`${userName} removed from connected users database`))
        res.status(200).json({message: `succesfully removed a user from connected database`})
    })
    .catch((err) => {
        res.status(403).json({ message: `There was an error removing user from connected database: ${err}` })
    })
}

// Check online users against connected users DB
exports.online = async (req, res) => {
    knex.select().from('onlineUsers')
    .then((data) => {
        res.json(data)
        res.status(200)
    })
    .catch(() => {
        res.status(403)
    })
}