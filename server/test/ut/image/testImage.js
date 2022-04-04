 const imageToUri = require('image-to-uri')

const {changeImageService, uploadNewImage, uploadUpdatedImage, deleteImage} = require('./../../../utils/image/upload/imageService')
  
const operation_NEW = 0;
const operation_UPDATE = 1;
const operation_DELETE = 2;

const imageServiceOptions_AWS = 0;
const imageServiceOptions_Cloudinary = 1;

const operationChoice = operation_DELETE
const key_AWS = 'category/826db1eb-310b-46dd-baef-4a8403cd65d8.png'
const key_Cloudinary = 'kgb1wzyghhwl3qwby0cg'

const fileNew = "test/ut/image/android.png"
const fileUpdate = "test/ut/image/angular.png"

changeImageService(imageServiceOptions_AWS)

if(operationChoice === operation_NEW) {
  uploadNewImage(imageToUri(fileNew ))
  .then(data => {console.log(data);})
  .catch(err => {console.log(err);})
}

if(operationChoice === operation_UPDATE) {
  uploadUpdatedImage(imageToUri(fileUpdate ), key_AWS)
  .then(data => {console.log(data);})
  .catch(err => {console.log(err);})
}

if(operationChoice === operation_DELETE) {
  deleteImage(key_AWS)
  .then(data => {console.log(data);})
  .catch(err => {console.log(err);})
}

changeImageService(imageServiceOptions_Cloudinary)

if(operationChoice === operation_NEW) {
  uploadNewImage(imageToUri(fileNew ))
  .then(data => {console.log(data);})
  .catch(err => {console.log(err);})
}

if(operationChoice === operation_UPDATE) {
  uploadUpdatedImage(imageToUri(fileUpdate ), key_Cloudinary)
  .then(data => {console.log(data);})
  .catch(err => {console.log(err);})
}

if(operationChoice === operation_DELETE) {
  deleteImage(key_Cloudinary)
  .then(data => {console.log(data);})
  .catch(err => {console.log(err);})
}
