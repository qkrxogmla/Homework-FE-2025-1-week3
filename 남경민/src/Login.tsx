import '../public/css/reset.css';

import { ChevronLeft, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import homeCSS from '../public/css/Home.module.css';
import joinCSS from '../public/css/Join.module.css';
import loginCSS from '../public/css/Login.module.css';
import { api } from './api/index';
import { TokenLocalStorageRepository } from './repository/localstorage';
import { UserLocalStorageRepository } from './repository/localstorage';

type UserWithToken = {
  id: string;
  name: string;
  email: string;
  token: string;
};

type UserResponse = {
  id: string;
  name: string;
  email: string;
  slogan: string;
  favorites: string[];
};

type User = Pick<UserWithToken, 'name' | 'email'>;

const loginUser = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const body = { email, password };
  return api<UserWithToken>({
    path: 'users/session',
    method: 'POST',
    body,
  });
};

const getUserByToken = ({ token }: { token: string }) => {
  return api<UserResponse>({
    path: 'users/me',
    method: 'GET',
    token,
  });
};

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const { getToken, setToken } = TokenLocalStorageRepository;

  useEffect(() => {
    const token = getToken();
    if (token === null) {
      return;
    }
    let ignore = false;
    getUserByToken({ token })
      .then((response) => {
        if (!ignore) {
          if (response.type === 'error') {
            setResponseMessage(response.message);
            return;
          }
          setUser({ name: response.data.name, email: response.data.email });
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
        ignore = true;
      });
  }, [getToken]);

  const handleClickLoginButton = () => {
    let ignore = false;
    setLoading(true);
    loginUser({ email, password })
      .then((response) => {
        if (!ignore) {
          if (response.type === 'error') {
            setResponseMessage(response.message);
            return;
          }
          setUser(response.data);
          UserLocalStorageRepository.setUser(response.data);
          setToken({ token: response.data.token });
          void navigate('/mypage');
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
        ignore = true;
      });
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
              <div className={loginCSS.title}>로그인</div>
            </div>
            <div className={joinCSS.join_registerInputs}>
              <input
                className={joinCSS.register_email}
                placeholder="이메일"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <input
                className={joinCSS.register_PW}
                placeholder="비밀번호"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <div className={joinCSS.join_bottom}>
                <button
                  className={loginCSS.login_btn}
                  onClick={handleClickLoginButton}
                >
                  확인
                </button>
              </div>
              <a className={loginCSS.forgot_PW}>비밀번호를 잊었다면?</a>
              <span>{responseMessage}</span>
              {loading && <span>wait a minute...</span>}
              {user !== null && (
                <div>
                  <span>이름: {user.name}</span>
                  <span>이메일: {user.email}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
