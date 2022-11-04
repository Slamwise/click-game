const knex = require("./../db.ts")
const cookieLib = require("cookie")

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
            console.log(findUser)
            res.status(200).json({userName: findUser.userName, token: findUser.token})
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
// 
