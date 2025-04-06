import '../public/css/reset.css';

import { useNavigate } from 'react-router-dom';

import homeCSS from '../public/css/Home.module.css';

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <section className={homeCSS.mobile_frame}>
        <div className={homeCSS.home_container}>
          <div className={homeCSS.home_inner_container}>
            <div className={homeCSS.home_top}>
              <div className={homeCSS.logo_container}>
                <img src="/img/todomate_black.png" />
              </div>
              <h1 className={homeCSS.title}>todo mate</h1>
              <p className={homeCSS.info}>
                할 일을 작성하고 매일을 기록해보세요.
              </p>
            </div>
            <div className={homeCSS.home_bottom}>
              <div className={homeCSS.btn_container}>
                <div className={homeCSS.btn_guest}>게스트로 시작</div>
                <div
                  className={homeCSS.btn_join}
                  onClick={() => void navigate(`/join`)}
                >
                  회원가입
                </div>
                <a
                  className={homeCSS.btn_login}
                  onClick={() => void navigate(`/login`)}
                >
                  로그인
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
