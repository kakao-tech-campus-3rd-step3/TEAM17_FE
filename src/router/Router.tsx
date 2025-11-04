import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import SignupProfile from '@/pages/SignupProfile';
import SignupAccount from '@/pages/SignupAccount';
import StarterListPageSuspense from '@/pages/suspense/StarterListPageSuspense';
import StarterPackDetailPageSuspense from '@/pages/suspense/StarterPackDetailPageSuspense';
import FeedPageSuspense from '@/pages/suspense/FeedPageSuspense';
import FeedDetailPageSuspense from '@/pages/suspense/FeedDetailPageSuspense';
import Layout from '@/components/common/Layout';
import Login from '@/pages/Login';
import MyPage from '@/pages/MyPage';
import PackWriting from '@/pages/PackWriting';
import FeedWriting from '@/pages/FeedWriting';
export const Router = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/signup/profile" element={<SignupProfile />} />
      <Route path="/signup/account" element={<SignupAccount />} />
      <Route path="/login" element={<Login />} />
      <Route path="/starterpack" element={<StarterListPageSuspense />} />
      <Route path="/starterpack/:id" element={<StarterPackDetailPageSuspense />} />
      <Route path="/mypage/*" element={<MyPage />} />
      <Route path="/feed" element={<FeedPageSuspense />} />
      <Route path="/feed/:id" element={<FeedDetailPageSuspense />} />
      <Route path="/pack-writing" element={<PackWriting />} />
      <Route path="/feed-writing" element={<FeedWriting />} />
    </Route>
  </Routes>
);
