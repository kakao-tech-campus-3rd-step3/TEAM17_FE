import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import StarterListPage from '@/pages/StarterListPage';
import Layout from '@/components/common/Layout';

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/starterpack" element={<StarterListPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
