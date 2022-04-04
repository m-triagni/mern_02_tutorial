const nodemailer = require('nodemailer');
 
require('dotenv').config();

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_FROM, // generated ethereal user
        pass: 'Sq5UxKOXEvcRtb6p'  // generated ethereal password
    },
    tls:{
        rejectUnauthorized:false
    }
});


const emailNodeMailerParams = (emailParam) => {
    //create params for email verification
    return {
        from: emailParam.from, // sender address
        to: emailParam.to, // list of receivers
        subject: emailParam.subject, // Subject line
        text: '-', // plain text body
        html:  emailParam.body //body
    }
}

exports.sendEmailNodeMailer = (emailParam , callback) => {
      
    // send mail with defined transport object
    transporter.sendMail(emailNodeMailerParams(emailParam), (error, info) => {
        if (error) {  callback(error, null) }
        
        callback(null, { message: 'Success' });
    });

}
  