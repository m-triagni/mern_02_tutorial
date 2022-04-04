const express = require('express');
const router = express.Router();

//API list
const {listAPI} = require('../listAPI');

// validators
const { linkCreateValidator, linkUpdateValidator } = require('../validators/link');
const { runValidation } = require('../validators');

// controllers
const { requireSignIn, authMiddleware, adminMiddleware } = require('../controllers/auth');
const { save, list, listByUser, read, remove, updateClickCount, popular, popularInCategory, newest } = require('../controllers/link');
 
// routes
//router.post(`${listAPI.API_LinkCreate}`, linkCreateValidator, runValidation, requireSignIn, authMiddleware, create);
//router.put(`${listAPI.API_LinkUpdate}`, linkUpdateValidator, runValidation, requireSignIn, authMiddleware, update);

router.post(`${listAPI.API_LinkSave}`, linkCreateValidator, runValidation, requireSignIn, authMiddleware, save);
router.get(`${listAPI.API_LinkList}`, requireSignIn, adminMiddleware, list);
router.get(`${listAPI.API_LinkListByUser}`, requireSignIn, authMiddleware, listByUser);
router.get(`${listAPI.API_LinkRead}`, read);
router.get(`${listAPI.API_LinkReadNewest}`, newest);
router.get(`${listAPI.API_LinkReadPopular}`, popular);
router.get(`${listAPI.API_LinkReadPopularByCategory}`, popularInCategory);
router.delete(`${listAPI.API_LinkDelete}`, requireSignIn, authMiddleware, remove);
router.put(`${listAPI.API_LinkUpdateClickCount}`, updateClickCount);

module.exports = router;
 