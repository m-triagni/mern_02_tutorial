/**
 * It contains routes for user profile
 */
const express = require('express')
const router = express.Router()
const {listAPI} = require('../listAPI')

//import middleware
const { requireSignIn, authMiddleware, adminMiddleware } = require('../controllers/auth')

//import controller
const { read, readWithLink } = require('../controllers/user')

//create route
router.get(listAPI.API_User, requireSignIn, authMiddleware, read)
router.get(listAPI.API_Admin, requireSignIn, adminMiddleware, read)

module.exports = router 
