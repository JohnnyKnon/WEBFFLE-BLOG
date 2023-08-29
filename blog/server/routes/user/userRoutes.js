const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user/userController');


// 유저 등록 라우트 정의
router.post('/', userController.createUser);
// 유저 로그인 라우터 정의
router.post('/login', userController.loginUser);
// 보호된 라우터
router.get('/login/auth', userController.loginAuth);

module.exports = router;