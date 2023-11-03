const userModel = require('../../models/user/userModel');
// JWT
const JWT = require('jsonwebtoken');
const SECRET_KEY = 'd7edfa71b56c99098ac72e2ea04b322795a1e50027be88bbe7208d834ac2c5e7a89e62654bc0adb2689fd6efa731519871a2358f22b6ced273c99f39a6c20dfe';

// 랜덤 UID 생성 함수
const generateUID = () => {
    const randomSegment = () => Math.random().toString(36).slice(2, 7);
    return `${randomSegment()}-${randomSegment()}-${randomSegment()}`;
}

// 유저 회원가입 함수
const createUser = async (req, res) => {
    // Model에서 처리할 신규 유저 데이터
    const userData = {
        uid:generateUID(),
        form: req.body,
    };

    try {
        await userModel.createUsers(userData);
        console.log('데이터가 성공적으로 삽입되었습니다.');
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: '데이터 삽입 실패' });
    }
};

// 로그인 구현하기
const loginUser = async (req, res) => {
    try {
        // 유저 데이터
        const userData = {
            form: req.body,
        };
        // 유저 모델
        userModel.getUsers(userData, (err, results) => {
            console.log(results); // results값 확인
            // 서버 자체에 오류가 발생할 경우
            if (err) {
                return res.status(500).json({ success: false, error: '유저 데이터 조회 실패' });
            }
            // 일치하는 유저가 없을 경우
            if (results.length === 0) {
                return res.json({ success: false, message: '일치하는 유저 없음' });
            }
            // 성공했을 경우 JWT로 토큰을 발급
            const token = JWT.sign({ ...results[0] }, SECRET_KEY);
            console.log(token); // 토큰이 어떤식으로 형성되는지 확인
            return res.json({ success: true, message: '유저 조회 성공', user: results[0], token:token, });
        });

    } catch (error) {
        res.status(500).json({ success: false, error: '데이터 불러오기 실패' });
    }
};

//  로그인 인증 함수
const loginAuth = async (req, res) =>{
    // token
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: '토큰을 찾을 수 없습니다.', status: false });
    }

    JWT.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: '허용되지 않은 토큰입니다.', status: false });
        }

        // 인증 성공
        res.json({ message: '인증되었습니다.', status: true });
    });
}


module.exports = {
    createUser,
    loginUser,
    loginAuth,
};