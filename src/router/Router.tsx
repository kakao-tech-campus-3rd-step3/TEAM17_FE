import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import SignupStep1 from '@/pages/SignupStep1';
import SignupStep2 from '@/pages/SignupStep2';
import StartListPage from '@/pages/StartListPage';
import StarterListPage from '@/pages/StarterListPage';
import Layout from '@/components/common/Layout';
import Login from '@/pages/Login';

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/signup/step1" element={<SignupStep1 />} />
        <Route path="/signup/step2" element={<SignupStep2 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/starter-pack" element={<StartListPage />} />
        <Route path="/starter-pack" element={<StarterListPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
