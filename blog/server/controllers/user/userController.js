const userModel = require('../../models/user/userModel');

// 랜덤 UID 생성 함수
const generateUID = () => {
    const randomSegment = () => Math.random().toString(36).slice(2, 7);
    return `${randomSegment()}-${randomSegment()}-${randomSegment()}`;
}

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



module.exports = {
    createUser
};