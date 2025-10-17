import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

import Header from '@/components/common/Header';
import { LayoutStyle } from '@/components/common/Layout.styles';
import Footer from '@/components/common/Footer';

const Layout: React.FC = () => {
  const { isLogin, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <LayoutStyle>
      <Header
        isAuthenticated={isLogin} 
        onLogoutClick={logout} 
        onProfileClick={() => navigate('/mypage')}
        onLoginClick={() => navigate('/login')}
        onSignUpClick={() => navigate('/signup/profile')}
      />
      <Outlet />
      <Footer />
    </LayoutStyle>
  );
};

export default Layout;
