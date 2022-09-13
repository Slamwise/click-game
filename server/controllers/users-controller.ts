const knex = require('./../db');

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

// 
