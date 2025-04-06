import '../public/css/reset.css';

import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import homeCSS from '../public/css/Home.module.css';
import joinCSS from '../public/css/Join.module.css';
import { api } from './api/index';
import { useAuth } from './context/useAuth';

function Join() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { login } = useAuth();

  interface SignUpResponse {
    id: string;
    name: string;
    email: string;
    token: string;
  }

  const handleJoinBtn = async () => {
    if (!email || !password || !username) {
      alert('모든 필드를 입력하세요!');
      return;
    }

    const result = await api<SignUpResponse>({
      path: 'users/',
      method: 'POST',
      body: {
        email,
        password,
        name: username,
      },
    });

    if (result.type === 'error') {
      alert(result.message);
      return;
    }

    localStorage.setItem('token', result.data.token);
    login(result.data); // 로그인 상태 저장하기
    void navigate('/mypage');
  };

  return (
    <>
      <section className={homeCSS.mobile_frame}>
        <div className={homeCSS.home_container}>
          <div className={joinCSS.join_inner_container}>
            <div className={joinCSS.join_navBar}>
              <div
                className={joinCSS.return_btn}
                onClick={() => void navigate(`/`)}
              >
                <ChevronLeft
                  color="black"
                  size={32}
                />
              </div>
              <div className={joinCSS.title}>가입하기</div>
            </div>
            <div className={joinCSS.join_body_container}>
              <div className={joinCSS.join_registerInputs}>
                <input
                  className={joinCSS.register_email}
                  placeholder="이메일 등록"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                <input
                  className={joinCSS.register_PW}
                  placeholder="비밀번호 등록"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
                <input
                  className={joinCSS.register_username}
                  placeholder="유저 이름"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                ></input>
              </div>
              <div className={joinCSS.join_bottom}>
                <button
                  className={joinCSS.join_btn}
                  onClick={() => {
                    void handleJoinBtn();
                  }}
                >
                  회원가입
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Join;
