import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SignupForm = () =>{
    const navigate = useNavigate();
    // 로그인을 위한 상태값
    // 이름
    const [name, setName] = useState('');
    // 아이디
    const [userId, setUserId] = useState('');
    // 패스워드
    const [password, setPassword] = useState('');

    // POST로 넘겨줄 값 객체
    const inputValues = {
        name,
        userId,
        password,
    }
    // Submit 함수
    const handleSubmit = async (e)=>{
        e.preventDefault();
        
        try{
            // Axios 로 POST
            const response = await axios.post('http://localhost:8000/user/', inputValues)
            if(response.data.success){
                navigate('/');
            }else{
                console.log('회원가입에 문제가 발생하였습니다.');
            }
        }catch(error){
            console.error('회원가입 실패:', error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='이름' value={name} onChange={(e)=> setName(e.target.value)} required/>
            <input type="text" placeholder='아이디' value={userId} onChange={(e)=> setUserId(e.target.value)} required/>
            <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">회원가입</button>
        </form>
    )
}


export default SignupForm;