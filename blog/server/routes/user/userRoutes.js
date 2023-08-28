const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user/userController');


// 유저 등록 라우트 정의
router.post('/', userController.createUser);

module.exports = router;