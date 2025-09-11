import React from 'react';
import { HeaderWrap, Brand, Actions, GhostButton, PrimaryButton } from './Header.styles';

const Header = () => {
  return (
    <HeaderWrap>
      <Brand>장비빨🔥</Brand>
      <Actions>
        <GhostButton>로그인</GhostButton>
        <PrimaryButton>회원가입</PrimaryButton>
      </Actions>
    </HeaderWrap>
  );
};

export default Header;
