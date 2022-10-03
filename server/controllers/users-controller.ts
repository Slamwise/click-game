const knex = require('./../db.ts');

// Get all users
exports.usersAll = async (req, res) => {
    knex
        .select()
        .from('users')
        .then(userNames =>{
            res.json(userNames)
        })
        .catch(err => {
            res.json({ message: `There was an error retrieving users: ${err}` })
        })
}

// Create a new user
exports.newUser = async (req, res) => {
    knex('users').insert({})
}
// 
