// Import express
const express = require('express')

// Import books-controller
const userRoutes = require('./../controllers/users-controller.ts')

// Create router
const router = express.Router()

// Add route for GET request to retrieve all book
// In server.js, books route is specified as '/books'
// this means that '/all' translates to '/users/all'
router.get('/all', userRoutes.usersAll)

// Export router
module.exports = router
