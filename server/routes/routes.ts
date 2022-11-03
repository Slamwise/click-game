const express = require('express')
var cookieParser = require('cookie-parser');

const userRoutes = require('./../controllers/users-controller.ts')

// Create router
const router = express.Router()

//Enable cookies
router.use(cookieParser());

//Middleware to create cookie
router.use((req,res,next) => {
    var cookie = req.cookies.cookieName
    if (cookie === undefined) {
        //cookie not defined, set a new cookie
        var hash = Math.random().toString();
        hash = hash.substring(2,hash.length);
        res.cookie('session_id', hash, { maxAge: 900000, httpOnly: false, secure: false, sameSite: 'none'});
        console.log('cookie created successfully');
    }
    next();
})

// Middleware to validate cookie
router.use((req,res,next) => {
    const { cookies } = req
    console.log(cookies)
    if ('session_id' in cookies) {
        console.log(`Session id exists`)
        if (cookies.session_id === 'session_id') {
            next()}
        else {
            res.status(403).send({msg: 'not authenticated'})}
        }
    else {
        res.status(403).send({msg: 'not authenticated'})}
})

// Add route for GET request to retrieve all user
// In server.tsx, users route is specified as '/users'
// this means that '/all' translates to '/users/all'

// '/users/all'
router.get('/all', userRoutes.getUsers)

// '/users/new'
router.post('/new', userRoutes.newUser)

// Export router
module.exports = router
