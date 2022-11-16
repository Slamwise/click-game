const express = require('express')

const userRoutes = require('./../controllers/users-controller.ts')

// Create router
const router = express.Router()

// Add route for GET request to retrieve all user
// In server.tsx, users route is specified as '/users'
// this means that '/all' translates to '/users/all'

// '/users/all'
router.get('/all', userRoutes.getUsers)

// '/users/matchCookies'
router.get('/matchCookies', userRoutes.matchCookies)

// '/users/new?username={}'
router.post('/new', userRoutes.newUser)

// '/users/connect?username={}&cookie={}'
router.post('/connect', userRoutes.connect)

// '/users/disconnect?username={}&cookie={}'
router.post('/disconnect', userRoutes.disconnect)

// '/users/online'
router.get('/online', userRoutes.online)

// '/users/sendRequest?username={}&cookie={}'


// Export router
module.exports = router
