const AWS = require('aws-sdk')
 
require('dotenv').config();

/**
 * AWS SNS configuration as email service provider
 */

 AWS.config.update({
    accessKeyId: process.env.AWS_APP_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
});

const ses = new AWS.SES({
    apiVersion: '2010-12-01',
});

const emailAWSParams = (emailParam) => {
    //create params for email verification
    return {
        Source: emailParam.from,
        Destination: {
            ToAddresses: [emailParam.to]
        },
        //ReplyToAddresses: [emailParam.replyTo],
        Message: {
            Subject: {
                Charset: "UTF-8",
                Data: emailParam.subject,
            },
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: emailParam.body,
                }
            }
        }
    }
}

exports.sendAWSEmail  = (emailParam, callback) => {
 
        //create params for email verification
        const myData = ses.sendEmail(emailAWSParams(emailParam), 
            (err, data) => {
                if(err) callback(err, null  )
                callback(null,{ message: 'Success' } );
            }
        );

        //console.log({myData});

           
}

 
