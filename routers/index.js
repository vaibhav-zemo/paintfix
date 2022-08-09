const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');
console.log("router Loaded");

router.get('/',homeController.home);
router.use('/user',require('./user'));

module.exports = router;