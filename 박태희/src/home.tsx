import React from 'react';
import { useNavigate } from 'react-router';

import logo from './assets/logo.png';
import styles from './home.module.css';

interface TodoButtonProps {
  label: string;
  onClick?: () => void;
}

const TodoButton: React.FC<TodoButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={styles.button_guest_signup}
    >
      {label}
    </button>
  );
};

const Home = () => {
  const navigate = useNavigate();

  const handleClick = (index: number) => {
    if (index === 0) {
      void navigate('/login');
    } else if (index === 1) {
      void navigate('/signup');
    }
  };

  return (
    <div className={styles.container}>
      <img
        src={logo}
        alt="logo"
        className={styles.logo}
      />
      <h1 className={styles.h1}>todo mate</h1>
      <p className={styles.p}>할 일을 작성하고 매일을 기록해보세요.</p>
      <TodoButton label="게스트로 시작" />
      <TodoButton
        label="회원가입"
        onClick={() => handleClick(1)}
      />
      <button
        className={styles.button_login}
        onClick={() => handleClick(0)}
      >
        로그인
      </button>
    </div>
  );
};

export default Home;
