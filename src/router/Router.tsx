import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import SignupProfile from '@/pages/SignupProfile';
import SignupAccount from '@/pages/SignupAccount';
import StarterListPage from '@/pages/StarterListPage';
import Layout from '@/components/common/Layout';
import Login from '@/pages/Login';

export const Router = () => (
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/signup/profile" element={<SignupProfile />} /> 
        <Route path="/signup/account" element={<SignupAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/starterpack" element={<StarterListPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
