import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import SignupStep1 from '@/pages/SignupStep1';
import SignupStep2 from '@/pages/SignupStep2';
import StarterListPage from '@/pages/StarterListPage';
import Layout from '@/components/common/Layout';
import Login from '@/pages/Login';
//import ProtectedRoute from '@/components/common/ProtectedRoute';
import MyPage from '@/pages/Mypage';

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/signup/step1" element={<SignupStep1 />} />
        <Route path="/signup/step2" element={<SignupStep2 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/starterpack" element={<StarterListPage />} />
        <Route path="/mypage" element={<MyPage />} />
        {/* 보호할 페이지 이런식으로 작성하기*/}
        {/* 
        <Route 
          path="/mypage" 
          element={
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          } 
        /> 
        */}
      </Route>
    </Routes>
  </BrowserRouter>
);
