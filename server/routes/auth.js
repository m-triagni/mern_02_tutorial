/**
 * It contains routes for authentication
 */
const express = require('express')
const router = express.Router()

const {register, registerActivate, login, forgetPassword, resetPassword} = require('../controllers/auth')
const {registrationValidator, userLoginValidator, forgetPasswordValidator, resetPasswordValidator} = require('../validators/auth')
const {runValidation} = require('../validators/index')
const {listAPI} = require('../listAPI')
 
router.post(`${listAPI.API_Register}`, registrationValidator, runValidation,  register)
router.post(`${listAPI.API_Activate}`,   registerActivate)
router.post(`${listAPI.API_Login}`, userLoginValidator, runValidation,  login)
router.put(`${listAPI.API_ForgetPassword}`, forgetPasswordValidator, runValidation,  forgetPassword)
router.put(`${listAPI.API_ResetPassword}`, resetPasswordValidator, runValidation,  resetPassword)

module.exports = router 
