const {check} = require('express-validator');

exports.categoryCreateValidator =[
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is required'),
    check('image')
        .not()
        .isEmpty()
        .withMessage('Image is required'),
    check('content')
        .isLength({min: 1})
        .withMessage('Content minimum length is 1'),
]
exports.categoryUpdateValidator =[
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is required'), 
    check('content')
        .isLength({min: 20})
        .withMessage('Content minimum length is 20'),
]

