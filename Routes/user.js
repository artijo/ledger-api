const express = require('express');
const router = express.Router();

const userController = require('../Controllers/UserController');

router.get('/users', userController.getall);

module.exports = {
    router
};