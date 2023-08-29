import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const navigate = useNavigate();
    // 아이디
    const [userId, setUserId] = useState('');
    // 패스워드
    const [password, setPassword] = useState('');

    // POST로 넘겨줄 값 객체
    const inputValues = {
        userId,
        password,
    }

   // Submit 함수
   const handleSubmit = async (e)=>{
    e.preventDefault();
    
    try{
        // Axios 로 POST
        const response = await axios.post('http://localhost:8000/user/login', inputValues)
        if(response.data.success){
            localStorage.setItem('token', response.data.token); // 로컬 스토리지에 토큰 저장
            navigate('/');
        }else{
            console.log('로그인에 문제가 발생하였습니다.');
        }
    }catch(error){
        console.error('로그입 실패:', error);
    }
}

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='아이디' value={userId} onChange={(e)=> setUserId(e.target.value)} required/>
            <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">로그인</button>
        </form>
    )
}




export default Signin;