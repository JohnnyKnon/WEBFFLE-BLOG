// 메인 CSS
import './App.css';
// 초기화 CSS
import './Reset.css';
// 회원가입 폼
import './components/SignupForm';
import SignupForm from './components/SignupForm';
import Signin from './components/Signin';
// React Router
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// JWT 디코더
import jwt_decode from 'jwt-decode';


// 메인 앱 함수
const App = () => {
  // Login Token
  const loginToken = localStorage.getItem('token');

  // Login
  const IsLogin = (token) =>{
    if(token){
      const userSession = jwt_decode(token);
      return <div>{userSession.username} 어서오세요.</div>
    }else{
      return <div>로그인 해주세요.</div>
    }
  }

  // Logout
  const isLogout = () => {
    localStorage.removeItem('token'); // 로컬 스토리지에서 토큰 삭제
  }

  return (
    <div className="App">
     <Router>
      <div>
        <nav>
          <ul>
            {/* 회원가입 */}
            <li>
            {!loginToken ? (<Link to="/signup">회원가입</Link>) : '' }
            </li>
            {/* 로그인 */}
            <li>
            {!loginToken ? (<Link to="/signin">로그인</Link>) : '' }
            </li>
            <li>
            {loginToken ? (<button onClick={isLogout}>로그아웃</button>) : '' }
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={IsLogin(loginToken)} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/signin" element={<Signin/>} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
