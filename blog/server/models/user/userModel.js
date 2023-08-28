// MySQL2
const mysql = require('mysql2');
// MySQL 설정
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'alsWkd12!@',
    database: 'webffle_blog'
});

// MySQL 연결
connection.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('웹플 블로그 DB에 연결되었습니다.');
});


const userModel = {
    // 유저 불러오기
    getUsers: (callback) => {
        // 데이터베이스 쿼리를 사용하여 유저 데이터 조회
        connection.query('', (err, results) => {
            if (err) {
                console.error('유저 쿼리 오류:', err); // 오류 처리
                return callback(err, null); 
            }
            callback(null, results);
        });
    },

};

module.exports = userModel;