const express = require('express');
const router = express.Router();

const userController = require('../Controllers/UserController');

router.get('/users', userController.getall);
router.get('/users/:email', userController.getbyemail);
router.post('/users', userController.create);
router.put('/users/:email', userController.update);
router.delete('/users/:email', userController.remove);

module.exports = {
    router
};