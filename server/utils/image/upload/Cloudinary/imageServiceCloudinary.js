var cloudinary = require('cloudinary').v2;

require('dotenv').config();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME , 
    api_key: process.env.CLOUDINARY_API_KEY , 
    api_secret: process.env.CLOUDINARY_API_SECRET ,
    secure: true
  });

exports.uploadNewImageCloudinary = (image, callback ) => {

    cloudinary.uploader.upload(image,  function(err, data) { 
        if(err) callback(err, null)
        else callback( null, {location: data.url, key: data.public_id} );
    })

}

exports.uploadUpdatedImageCloudinary = (image, key, callback ) => {

    cloudinary.uploader.upload(image, {public_id: key, overwrite:true}, function(err2, data) { 
 
        if(err2) callback(err2, null)
        else callback( null, {location: data.url, key: data.public_id} );
    });
 
}

exports.deleteImageCloudinary = async (key, callback) => {
    cloudinary.uploader.destroy(key,   function(err, deleteData) { 
        if(err) callback(err, null)
        else callback(null, deleteData)
    })
}