// MySQL2
const mysql = require('mysql2');
// MySQL 설정
const connection = mysql.createConnection({
    host: '127.0.0.1', // 그냥 로컬호스트 하면 오류남
    user: 'root',
    password: 'alsWkd12!@',
    database: 'webffle_blog',
    port: '3306',
});

// MySQL 연결
connection.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('웹플 블로그 DB에 연결되었습니다.');
});


// User Model
const userModel = {
    // 유저 불러오기
    getUsers: (userData, callback) => {
        // SQL문
        const selectQuery = 'SELECT * FROM users WHERE userid = ? and password = ? ';
        // 넣어줄 데이터
        const inputData = [userData.form.userId, userData.form.password];
        // 데이터베이스 쿼리를 사용하여 유저 데이터 조회
        connection.query(selectQuery, inputData, (err, results) => {
            if (err) {
                console.error('유저 쿼리 오류:', err); // 오류 처리
                return callback(err, null);
            }
            callback(null, results); // 결과를 콜백으로 반환
        });
    },
    // 유저 회원가입
    createUsers: (userData, callback) => {
        // SQL문
        const insertQuery = 'INSERT INTO users (uid, username, userid, password) VALUES (?, ?, ?, ?)';
        // 넣어줄 데이터
        const inputData = [userData.uid, userData.form.name, userData.form.userId, userData.form.password];
        // 데이터베이스 쿼리를 사용하여 유저 데이터 조회
        connection.query(insertQuery, inputData, (err, results) => {
            if (err) {
                console.error('유저 등록 쿼리 오류:', err); // 오류 처리
                return callback(err, null);
            }
        });
    }

};

module.exports = userModel;