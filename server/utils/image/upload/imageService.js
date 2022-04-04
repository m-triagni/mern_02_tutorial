const uuid = require('uuid/v4');

const{uploadNewImageAWS, uploadUpdatedImageAWS, deleteImageAWS} = require('./../upload/AWS/imageServiceAWS');
const{uploadNewImageCloudinary, uploadUpdatedImageCloudinary, deleteImageCloudinary} = require('./../upload/Cloudinary/imageServiceCloudinary')

 
const imageServiceOptions_AWS = 0;
const imageServiceOptions_Cloudinary = 1;

let imageService = imageServiceOptions_Cloudinary;

exports.changeImageService = (newImageService) => {
    imageService = newImageService;
}

exports.uploadNewImage = (image, callback) => { 
    const {base64Image, type} = getImageAndType(image)
    const uuidNew = uuid();

    if (imageService === imageServiceOptions_AWS) {
        return new Promise((resolve, reject) => { 
            uploadNewImageAWS(base64Image, type, uuidNew, (err, data) => {
              if (err) return reject(err)
              resolve(data)
            })
          })
    }

    if (imageService === imageServiceOptions_Cloudinary) {
        return new Promise((resolve, reject) => { 
            uploadNewImageCloudinary(image, (err, data) => {
               if (err) return reject(err)
 
               resolve(data)
            })
          })
    }
    
}

exports.uploadUpdatedImage = (image, key) => { 
 
    if (imageService === imageServiceOptions_AWS) {
        const {base64Image, type} = getImageAndType(image)

        return new Promise((resolve, reject) => {
            uploadUpdatedImageAWS(base64Image, type, key, (err, data) => {
                if (err) return reject(err)
                resolve(data)
            }) 
        })
    }

    if (imageService === imageServiceOptions_Cloudinary) {
        return new Promise((resolve, reject) => {
            uploadUpdatedImageCloudinary(image,  key, (err, data) => {
                if (err) return reject(err)
                resolve(data)
            }) 
        })
    }

}

exports.deleteImage = ( key) => { 

    if (imageService === imageServiceOptions_AWS) {
        return new Promise((resolve, reject) => {
            deleteImageAWS( key, (err, data) => {
                if (err) return reject(err)
                resolve(data)
            }) 
        })
    }

    if (imageService === imageServiceOptions_Cloudinary) {
        return new Promise((resolve, reject) => {
            deleteImageCloudinary( key, (err, data) => {
                console.log('err', err);
                if (err) return reject(err)
                resolve(data)
            }) 
        })
    }
}

function getImageAndType(image) {
    const base64Image = new Buffer.from(image.replace(/^data:image\/\w+;base64,/,''),'base64');
    const type = image.split(';')[0].split('/')[1];

    return { base64Image, type }
}