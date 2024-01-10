const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/:email/check-email', userController.isEmailRepeated);
router.post('/logout', userController.logout);
router.patch('/', userController.modifyPassword);
router.get('/:id', userController.getMyInfo);

module.exports = router;