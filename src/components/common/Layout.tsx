import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { LayoutStyle } from './Layout.styles';

const Layout: React.FC = () => {
  return (
    <LayoutStyle>
      <Header />
      <Outlet />
    </LayoutStyle>
  );
};

export default Layout;
