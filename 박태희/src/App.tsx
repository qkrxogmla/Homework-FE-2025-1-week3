import { BrowserRouter, Route, Routes } from 'react-router';

import Feed from './Feed.tsx';
import Home from './home.tsx';
import Login from './login.tsx';
import MyPage from './mypage.tsx';
import Signup from './signup.tsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/signup"
          element={<Signup />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/mypage"
          element={<MyPage />}
        />
        <Route
          path="/feed"
          element={<Feed />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
