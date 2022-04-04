
const {changeEmailService, sendEmailVerification, sendEmailPasswordForget} = require('./../../../utils/email/emailService');
 
//send using AWS
changeEmailService(0);

sendEmailVerification('agni199@gmail.com', '123123123', processResult ) 
sendEmailPasswordForget('agni199@gmail.com', '123123123', processResult ) 

//send using nodeInBlue
changeEmailService(1);

sendEmailVerification('agni199@gmail.com', '123123123', processResult ) 
sendEmailPasswordForget('agni199@gmail.com', '123123123', processResult ) 


 function processResult(err, message) {
  if(err) console.log({err});

  console.log(message);
 }