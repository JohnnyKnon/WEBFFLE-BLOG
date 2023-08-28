const express = require('express');
const app = express();
const port = 8000; // 사용할 포트 번호
const userRoutes = require('./routes/user/userRoutes'); // 유저 라우터

// 메인 라우터 (나중에 라우터만 따로 뺄 예정)
app.get('/', (req, res) => {
  res.send('Node.js 서버가 실행 중입니다.');
});


// 유저 라우터
app.use('/user', userRoutes);


// 서버 실행
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});


