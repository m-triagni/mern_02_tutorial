const express = require('express')
const router = express.Router()
const {test} = require('../controllers/test')
const {listAPI} = require('../listAPI')

router.get(`${listAPI.API_Test}`,  test)

module.exports = router 
