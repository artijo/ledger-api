const express = require('express');
const router = express.Router();

const authController = require('../Controllers/AuthController');

router.post('/loginwithgoogle', authController.loginwithgoogle);

module.exports = {
    router
};