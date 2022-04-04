const express = require('express');
const router = express.Router();

//API list
const {listAPI} = require('../listAPI');

//validator
const {categoryCreateValidator, categoryUpdateValidator } = require('../validators/category');
const {runValidation} = require('../validators/index');

//middleware
const { requireSignIn, adminMiddleware } = require('../controllers/auth');

//controller
const {save, list , read, remove} = require('../controllers/category');

//router
//router.post(`${listAPI.API_CategoryCreate}`, categoryCreateValidator,  requireSignIn, adminMiddleware, create);
//router.put(`${listAPI.API_CategoryUpdate}`,  categoryUpdateValidator, runValidation,  requireSignIn, adminMiddleware, update);
router.post(`${listAPI.API_CategorySave}`, categoryCreateValidator,  requireSignIn, adminMiddleware, save);
router.get(`${listAPI.API_CategoryList}`,  list);
router.post(`${listAPI.API_CategoryRead}`,  read);
router.delete(`${listAPI.API_CategoryDelete}`,  requireSignIn, adminMiddleware, remove);

module.exports = router;

