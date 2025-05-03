import { Bell, Compass, House, User } from 'lucide-react';
import { useNavigate } from 'react-router';

import styles from './Menubar.module.css';

type MenubarProps = {
  house: string;
  compass: string;
  bell: string;
  user: string;
};

const Menubar = ({ house, compass, bell, user }: MenubarProps) => {
  const navigate = useNavigate();
  return (
    <div className={styles.low_bar}>
      <div className={styles.menu_item}>
        <House
          size={24}
          className={styles[`${house}_icon`]}
          onClick={() => void navigate('/feed')}
        />
        <span className={styles[`${house}_text`]}>피드</span>
      </div>
      <div className={styles.menu_item}>
        <Compass
          size={24}
          className={styles[`${compass}_icon`]}
        />
        <span className={styles[`${compass}_text`]}>둘러보기</span>
      </div>
      <div className={styles.menu_item}>
        <Bell
          size={24}
          className={styles[`${bell}_icon`]}
        />
        <span className={styles[`${bell}_text`]}>알림</span>
      </div>
      <div className={styles.menu_item}>
        <User
          size={24}
          className={styles[`${user}_icon`]}
          onClick={() => void navigate('/mypage')}
        />
        <span className={styles[`${user}_text`]}>My</span>
      </div>
    </div>
  );
};

export default Menubar;
