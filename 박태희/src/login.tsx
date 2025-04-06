import { ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { api } from './api';
import styles from './login.module.css';
import { TokenLocalStorageRepository } from './repository/localstorages';

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
  slogan?: string;
  favorites?: string;
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const { getToken, setToken } = TokenLocalStorageRepository;

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
          setUser({ name: response.data.name, email: response.data.email });
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

  useEffect(() => {
    const token = getToken();

    if (token === null) {
      return;
    }

    let ignore = false;
    setLoading(true);

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

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <ChevronLeft
          size={32}
          strokeWidth={1.5}
          onClick={() => void navigate('/')}
          className={styles.before}
        />
        <h2>로그인</h2>
      </div>
      <input
        type="text"
        placeholder="이메일"
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
      />
      <input
        type="password"
        placeholder="비밀번호"
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />

      <button
        disabled={loading}
        onClick={handleClickLoginButton}
        className={styles.button}
      >
        확인
      </button>

      <a
        href="#"
        className={styles.lost_pw}
      >
        비밀번호를 잊었다면?
      </a>
      <span>{responseMessage}</span>

      {loading && <p>로딩중 . . . </p>}
    </div>
  );
};

export default Login;
