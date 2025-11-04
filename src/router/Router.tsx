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
// TODO: 디자인 확인 후 삭제 가능한 임시 Mock 페이지
import FeedMockPage from '@/pages/mock/FeedMockPage';

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
      {/* TODO: 디자인 확인 후 삭제 가능 - Mock 페이지 */}
      <Route path="/mock/feed" element={<FeedMockPage />} />
    </Route>
  </Routes>
);
