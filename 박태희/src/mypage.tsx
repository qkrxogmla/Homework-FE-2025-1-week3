import { Bell, Compass, House, Settings, User } from 'lucide-react';
import { useEffect, useState } from 'react';

import { api } from './api';
import profile from './assets/profile.png';
import styles from './mypage.module.css';
import { TokenLocalStorageRepository } from './repository/localstorages';

type UserResponse = {
  id: string;
  name: string;
  email: string;
  slogan?: string;
  favorites?: string;
};

const MyPage = () => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const { getToken } = TokenLocalStorageRepository;

  useEffect(() => {
    const token = getToken();
    if (token === null) {
      setErrorMessage('로그인이 필요합니다.');
      setLoading(false);
      return;
    }

    api<UserResponse>({
      path: 'users/me',
      method: 'GET',
      token,
    })
      .then((response) => {
        if (response.type === 'error') {
          setErrorMessage(response.message);
        } else {
          setUser(response.data);
        }
      })
      .catch(() => {
        setErrorMessage('유저 정보를 불러오지 못했습니다.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [getToken]);

  if (loading) return <p>로딩 중...</p>;
  if (errorMessage) return <p>{errorMessage}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.setting_bar}>
        <Settings
          size={32}
          strokeWidth={1.5}
          className={styles.setting}
        />
      </div>
      <div className={styles.profile_info}>
        <img
          src={profile}
          alt="profile"
          className={styles.profile}
        />
        <div className={styles.profile_info_name_mail}>
          <p>
            <strong>{user?.name}</strong>
          </p>
          <p className={styles.profile_info_mail}>{user?.email}</p>
        </div>
      </div>
      <div className={styles.low_bar}>
        <div className={styles.menu_item}>
          <House
            size={24}
            className={styles.inactive_icon}
          />
          <span className={styles.inactive_text}>피드</span>
        </div>
        <div className={styles.menu_item}>
          <Compass
            size={24}
            className={styles.inactive_icon}
          />
          <span className={styles.inactive_text}>둘러보기</span>
        </div>
        <div className={styles.menu_item}>
          <Bell
            size={24}
            className={styles.inactive_icon}
          />
          <span className={styles.inactive_text}>알림</span>
        </div>
        <div className={styles.menu_item}>
          <User
            size={24}
            className={styles.active_icon}
          />
          <span className={styles.active_text}>My</span>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
