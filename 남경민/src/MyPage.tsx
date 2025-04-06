import '../public/css/reset.css';

import { Bell, Compass, House, Settings, User } from 'lucide-react';
import { useEffect, useState } from 'react';

import homeCSS from '../public/css/Home.module.css';
import myPageCSS from '../public/css/MyPage.module.css';
import { useAuth } from './context/useAuth';
import { UserLocalStorageRepository } from './repository/localstorage';

function MyPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    } else {
      const stored = UserLocalStorageRepository.getUser();
      if (stored) {
        setName(stored.name);
        setEmail(stored.email);
      }
    }
  }, [user]);

  return (
    <>
      <section className={homeCSS.mobile_frame}>
        <div className={homeCSS.home_container}>
          <div className={myPageCSS.inner_container}>
            <div className={myPageCSS.profile_container}>
              <div className={myPageCSS.user_settings}>
                <Settings
                  color="black"
                  size={32}
                />
              </div>
              <div className={myPageCSS.user_info_container}>
                <div className={myPageCSS.img_background}>
                  <div className={myPageCSS.img_container}>
                    <img src="/img/todomate_white.png" />
                  </div>
                </div>
                <div className={myPageCSS.user_name_email}>
                  <span className={myPageCSS.user_name}>{name}</span>
                  <span className={myPageCSS.user_email}>{email}</span>
                </div>
              </div>
            </div>
            <div className={myPageCSS.bottom_navBar}>
              <div className={myPageCSS.nav_menu_1}>
                <div className={myPageCSS.nav_menu_1_img}>
                  <House
                    color="gray"
                    size={32}
                  />
                </div>
                <div className={myPageCSS.nav_menu_1_title}>피드</div>
              </div>
              <div className={myPageCSS.nav_menu_2}>
                <div className={myPageCSS.nav_menu_2_img}>
                  <Compass
                    color="gray"
                    size={32}
                  />
                </div>
                <div className={myPageCSS.nav_menu_2_title}>둘러보기</div>
              </div>
              <div className={myPageCSS.nav_menu_3}>
                <div className={myPageCSS.nav_menu_3_img}>
                  <Bell
                    color="gray"
                    size={32}
                  />
                </div>
                <div className={myPageCSS.nav_menu_3_title}>알림</div>
              </div>
              <div className={myPageCSS.nav_menu_4}>
                <div className={myPageCSS.nav_menu_4_img}>
                  <User
                    color="black"
                    size={32}
                  />
                </div>
                <div className={myPageCSS.nav_menu_4_title}>My</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MyPage;
