import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import SignupProfile from '@/pages/SignupProfile';
import SignupAccount from '@/pages/SignupAccount';
import StarterListPage from '@/pages/StarterListPage';
import StarterPackDetailPage from '@/pages/StarterPackDetailPage';
import FeedPage from '@/pages/FeedPage';
import FeedDetailPage from '@/pages/FeedDetailPage';
import Layout from '@/components/common/Layout';
import Login from '@/pages/Login';
import MyPage from '@/pages/MyPage';
import FeedWriting from '@/pages/FeedWriting';

export const Router = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/signup/profile" element={<SignupProfile />} />
      <Route path="/signup/account" element={<SignupAccount />} />
      <Route path="/login" element={<Login />} />
      <Route path="/starterpack" element={<StarterListPage />} />
      <Route path="/starterpack/:id" element={<StarterPackDetailPage />} />
      <Route path="/mypage/*" element={<MyPage />} />
      <Route path="/feed" element={<FeedPage />} />
      <Route path="/feed/:id" element={<FeedDetailPage />} />
      <Route path="/feedwriting" element={<FeedWriting />} />
    </Route>
  </Routes>
);
