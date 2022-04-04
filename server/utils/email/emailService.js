const {emailForgetPasswordParams, emailVerificationParams} = require('./emailParams')

const {sendAWSEmail} = require('./AWS/emailServiceAWS')
const {sendEmailNodeMailer} = require('./NodeMailer/emailServiceNodeMailer')

 
const emailService_AWS = 0;
const emailService_NodeMailer = 1;

let emailService = emailService_NodeMailer;

exports.changeEmailService = (newEmailService) => {
    emailService = newEmailService;
}

const sendEmail = async(emailParam, callback) => {
    const successMessage =  `Email has been sent to ${emailParam.to}. Follow the instructions to complete your registration`
    const errorMessage = `We could not send your email ${emailParam.to}. Please try again`;

     if (emailService === emailService_AWS) {
        //AWS
        try {
            sendAWSEmail(emailParam, callback)
        }
        catch( error )  {throw new Error(errorMessage)} 
    }
    else if (emailService === emailService_NodeMailer) {
        //NodeMailer
        try {
            sendEmailNodeMailer(emailParam, callback)
        }
        catch( error )  {throw new Error(errorMessage)}  
    }
}

exports.sendEmailVerification = (emailToAddress, token, callback) => {
    const emailParam =  emailVerificationParams(emailToAddress, token);

    sendEmail(emailParam, callback);
     
}
 
exports.sendEmailPasswordForget = async (emailToAddress, token, callback) => {
    const emailParam =  emailForgetPasswordParams(emailToAddress, token);

    sendEmail(emailParam, callback);
}
