const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/:email/check-email', userController.isEmailRepeated);
router.patch('/', userController.modifyPassword);
router.get('/:id', userController.getMyInfo);

module.exports = router;
