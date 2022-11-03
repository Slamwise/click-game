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

// Create a new user
exports.newUser = async (req, res) => {
    knex('users').insert({
        userName: req.query.username,
        Wins: 0,
        Losses: 0
    })
    .then(() => {
        // console.log(`succesfully added ${req.query.username} to database`)
        res.status(200).send({'msg': 'success'})
    })
    .catch(err => {
        res.status(403)
        res.json({ message: `There was an error adding user: ${err}` })
    })
}
// 
