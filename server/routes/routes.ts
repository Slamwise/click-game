// Import express
const express = require('express')

// Import users-controller
const userRoutes = require('./../controllers/users-controller.ts')

// Create router
const router = express.Router()

// Add route for GET request to retrieve all user
// In server.js, users route is specified as '/users'
// this means that '/all' translates to '/users/all'
router.get('/all', userRoutes.usersAll)

// Export router
module.exports = router
