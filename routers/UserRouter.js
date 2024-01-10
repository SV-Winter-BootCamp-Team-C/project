const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/check-email', userController.isEmailRepeated);
router.post('/logout', userController.logout);
router.patch('/', userController.modifyPassword);

module.exports = router;