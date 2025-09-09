import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import StartListPage from '@/pages/StartListPage';
import Layout from '@/components/common/Layout';

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/starter-pack" element={<StartListPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
