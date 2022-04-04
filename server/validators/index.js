/**
 * It contains validation processes 
 */
const {validationResult} = require('express-validator');

/**
 * runValidation : function to running the validation and return the error if it fails the validation
 * @param {json} req : request object.
 * @param {json} res : response object.
 * @param {function} next : next function if no error found.
 * @return {json} JSON message success or error
 */
exports.runValidation = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(process.env.APPLICATION_ERROR_CODE).json({
            error:errors.array()[0].msg
        })
    };

    next();
}