const express = require('express');
const router = express.Router();

const userController = require('../Controllers/UserController');

const {checkAuth} = require('../Middleware/Auth');

router.get('/users',checkAuth, userController.getall);
router.get('/users/:email', userController.getbyemail);
router.post('/users', userController.create);
router.put('/users/:email',checkAuth, userController.update);
router.delete('/users/:email',checkAuth, userController.remove);

module.exports = {
    router
};