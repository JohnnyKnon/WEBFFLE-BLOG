import React, { useState } from 'react';
// 메인 CSS
import './App.css';
// 초기화 CSS
import './Reset.css';
// Axios
import axios from 'axios';
// 회원가입 폼
import './components/SignupForm';
import SignupForm from './components/SignupForm';
import Signin from './components/Signin';
// React Router
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
// JWT 디코더
import jwt_decode from 'jwt-decode';



// 메인 앱 함수
const App = () => {
  // Login JWT Token
  const loginToken = localStorage.getItem('token');
  // 로그인 인증여부 상태
  const [authenticationStatus, setAuthenticationStatus] = useState(false);

  // 로그인 인증여부 ( 허용된 토큰인지 파악 )
  const authenticateUser = async () => {
    // login 토큰이 존재할때만
    if(loginToken){
      try {
        const response = await axios.get('http://localhost:8000/user/login/auth', {
          headers: {
            'Authorization': loginToken, // 헤더에 토큰 추가
          }
        });
        setAuthenticationStatus(response.data.status); // 인증 성공
      } catch (error) {
        console.error(error); // 인증 실패
      }
    }
  };

  authenticateUser();
  
  // 로그인 UI
  const IsLogin = (token, authenticationStatus) => {
    // 토큰이 존재해야되고 인증이 true인 값만 로그인 될 수 있게
    if (token && authenticationStatus) {
      const userSession = jwt_decode(token);
      return <div>{userSession.username} 어서오세요.</div>;
    } else {
      return <div>로그인 해주세요.</div>;
    }
  };

  // Logout 함수
  // 페이지 이동을 위한 useNavigate
  const navigate = useNavigate();
  const isLogout = () => {
    localStorage.removeItem('token'); // 로컬 스토리지에서 토큰 삭제
    setAuthenticationStatus(false); // 인증 성공
    navigate('/');
  }

  return (
    <div className="App">
      <div>
        <nav>
          <ul>
            {/* 회원가입 */}
            <li>
            {!loginToken && !authenticationStatus ? (<Link to="/signup">회원가입</Link>) : '' }
            </li>
            {/* 로그인 */}
            <li>
            {!loginToken && !authenticationStatus ? (<Link to="/signin">로그인</Link>) : '' }
            </li>
            {/* 토큰여부와 인증여부 확인 후  */}
            <li>
            {loginToken && authenticationStatus ? (<button onClick={isLogout}>로그아웃</button>) : '' }
            </li>
          </ul>
        </nav>
        {/*  */}
        <Routes>
          <Route path="/" element={IsLogin(loginToken, authenticationStatus)} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/signin" element={<Signin/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
