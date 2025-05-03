import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { api } from './api';
import styles from './signup.module.css';
const signupUser = ({
  email,
  name,
  password,
}: {
  email: string;
  name: string;
  password: string;
}) => {
  const body = { email, name, password };
  return api({
    path: 'users/',
    method: 'POST',
    body,
  });
};

const Signup = () => {
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const isFormValid =
    email.trim() !== '' &&
    name.trim() !== '' &&
    password !== '' &&
    passwordConfirm !== '';

  const handleSignup = () => {
    if (password !== passwordConfirm) {
      setResponseMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    setLoading(true);
    signupUser({ email, name, password })
      .then((response) => {
        console.log('response:', response);
        if (response.type === 'error') {
          setResponseMessage(response.message);
          return;
        }
        void navigate('/login');
      })
      .catch((error) => {
        console.error(error);
        setResponseMessage('오류가 발생했습니다.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <ChevronLeft
          size={32}
          strokeWidth={1.5}
          onClick={() => void navigate('/')}
          className={styles.before}
        />
        <h2>가입하기</h2>
      </div>
      <input
        type="text"
        placeholder="이메일 등록"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
      />
      <input
        type="password"
        placeholder="비밀번호 등록"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />
      <input
        type="password"
        placeholder="비밀번호 확인"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        className={styles.input}
      />

      <input
        type="text"
        placeholder="유저이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={styles.input}
      />
      <button
        onClick={handleSignup}
        className={styles.button}
        disabled={!isFormValid || loading}
      >
        회원가입
      </button>

      {responseMessage && <span>{responseMessage}</span>}
    </div>
  );
};

export default Signup;
