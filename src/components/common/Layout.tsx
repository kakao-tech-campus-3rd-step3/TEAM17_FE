import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { LayoutStyle } from './Layout.styles';
import Footer from './Footer';

const Layout: React.FC = () => {
  return (
    <LayoutStyle>
      <Header />
      <Outlet />
      <Footer />
    </LayoutStyle>
  );
};

export default Layout;
