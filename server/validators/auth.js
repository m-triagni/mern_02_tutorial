/**
 * It contains validation for user authentication
 */
const {check} = require('express-validator')

/**
 * Validation for user registration
 */
exports.registrationValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is required'),
    check('email') 
        .isEmail()
        .withMessage('Email must be a valid email address'),  
    check('password') 
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters long'),      
]

/**
 * Validation for user login
 */
exports.userLoginValidator = [
    check('email') 
        .isEmail()
        .withMessage('Email must be a valid email address'),  
    check('password') 
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters long'),      
]

/**
 * Validation for user forget password
 */
exports.forgetPasswordValidator = [ 
    check('email') 
        .isEmail()
        .withMessage('Must be a valid email address'),         
]

/**
 * Validation for user reset password
 */
exports.resetPasswordValidator = [ 
    check('newPassword') 
        .not()
        .isEmpty()
        .withMessage('Token is required'),   
]
