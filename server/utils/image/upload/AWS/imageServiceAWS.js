const AWS = require('aws-sdk');
const S3BucketName = 'udemy-bucket-3';

require('dotenv').config();

//S3 configuration
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_APP_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
})

exports.uploadNewImageAWS = (base64Image, type, uuid, callback) => {

    //upload image to S3
    const params = {
        Bucket: S3BucketName,
        Key: `category/${uuid}.${type}`,
        Body: base64Image,
        //ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType:`image/${type}`
    }

    s3.upload(params, function(err, data) {
        if(err) callback(err, null)
        else callback( {location: data.Location, key: data.Key} );
    })

}

exports.uploadUpdatedImageAWS = (base64Image, type, key, callback) => { 

    deleteImageAWS(key , (deletedData) => { 
        
            // handle upload image
            const params = {
                Bucket: S3BucketName,
                Key: `${key}`,
                Body: base64Image,
                //ACL: 'public-read',
                ContentEncoding: 'base64',
                ContentType: `image/${type}`
            };
            
            s3.upload(params, (err, data) => {
                if(err) callback(err, null) 
                else callback( null, {location: data.Location, key: data.Key} );
            })
        }
    )

}

function deleteImageAWS  (key, callback)   {

    // remove the existing image from s3 before uploading new/updated one
    const deleteParams = {
        Bucket: S3BucketName,
        Key: `${key}`
    };

    s3.deleteObject(deleteParams, function(err, deletedData) {
        if(err) callback(err, null) 
        else callback( null, deletedData );
    }) 

}
exports.deleteImageAWS = deleteImageAWS