/**
 * It contains email content for verification and forget password
 */
 const { listPage } = require('./../../listPage')

 /**
  * emailVerificationParams : function to create email authentication 
  * @param {string} email : email to address.
  * @param {string} token : user token.
  * @return {string} email authentication content
  */
 exports.emailVerificationParams = (emailToAddress, token) => {
     // setup email data with unicode symbols
     return {
         from: `"The support" <${process.env.EMAIL_FROM}>`, // sender address
         to: emailToAddress, // list of receivers
         subject: 'Email verification', // Subject line
         body:  ` <html>
             <h1 style="color:black;"> Verify your email address ${emailToAddress}</h1>
             <p>Please use the following link to complete your registration: </p>
             <p>${process.env.CLIENT_URL}${listPage.Page_Activation}/${token}</p>
         </html>`
     }; 
 }
 
 /**
  * emailForgetPasswordParams : function to create email reset password 
  * @param {string} email : email to address.
  * @param {string} token : user token.
  * @return {string} email reset password content
  */
 exports.emailForgetPasswordParams = (emailToAddress, token) => {
     // setup email data with unicode symbols
     return {
         from: `"The support" <${process.env.EMAIL_FROM}>`, // sender address
         to: emailToAddress, // list of receivers
         //replyTo: process.env.EMAIL_FROM, // list of receivers
         subject: 'Reset password link', // Subject line
         body:  ` <html>
             <h1 style="color:black;">Reset your password</h1>
             <p>You have requested to reset password. Please use the following link to reset your password: </p>
             <p>${process.env.CLIENT_URL}${listPage.Page_PasswordReset}/${token}</p>
         </html>`
     }; 
  
 }