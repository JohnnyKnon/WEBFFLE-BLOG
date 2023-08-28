const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');


// 유저 관련 라우트 정의
router.get('/', userController.getUsers);