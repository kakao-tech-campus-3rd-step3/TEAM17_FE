import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@/components/common/ProtectedRoute';

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
import ErrorPage from '@/pages/404Page';

export const Router = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/signup/profile" element={<SignupProfile />} />
      <Route path="/signup/account" element={<SignupAccount />} />
      <Route path="/login" element={<Login />} />
      <Route path="/starterpack" element={<StarterListPageSuspense />} />
      <Route path="/starterpack/:id" element={<StarterPackDetailPageSuspense />} />
      <Route
        path="/mypage/:userId"
        element={<MyPage />} // 다른 사람 페이지는 로그인 없어도 조회 가능
      />
      <Route
        path="/mypage/*"
        element={
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        }
      />

      <Route path="/feed" element={<FeedPageSuspense />} />
      <Route path="/feed/:id" element={<FeedDetailPageSuspense />} />
      <Route path="/pack-writing" element={<PackWriting />} />
      <Route path="/feed-writing" element={<FeedWriting />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  </Routes>
);
