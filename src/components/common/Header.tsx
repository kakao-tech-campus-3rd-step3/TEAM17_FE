import React from 'react';
import {
  HeaderWrap,
  Brand,
  Actions,
  GhostButton,
  PrimaryButton,
  IconButton,
  Avatar,
  LogoutButton,
} from './Header.styles';

import { User as UserIcon } from 'lucide-react';

type HeaderProps = {
  isAuthenticated?: boolean;
  userName?: string;
  avatarUrl?: string;
  onLoginClick?: () => void;
  onSignUpClick?: () => void;
  onLogoutClick?: () => void;
  onProfileClick?: () => void;
};

const Header: React.FC<HeaderProps> = ({
  isAuthenticated = false,
  userName,
  avatarUrl,
  onLoginClick,
  onSignUpClick,
  onLogoutClick,
  onProfileClick,
}) => {
  return (
    <HeaderWrap>
      <Brand>장비빨🔥</Brand>

      <Actions>
        {isAuthenticated ? (
          <>
            <LogoutButton onClick={onLogoutClick}>로그아웃</LogoutButton>

            {avatarUrl ? (
              <IconButton
                onClick={onProfileClick}
                aria-label={userName ? `${userName} 프로필 열기` : '프로필 열기'}
                title={userName}
              >
                <Avatar src={avatarUrl} alt={userName ?? 'User'} />
              </IconButton>
            ) : (
              <IconButton
                onClick={onProfileClick}
                aria-label={userName ? `${userName} 프로필 열기` : '프로필 열기'}
                title={userName}
              >
                <UserIcon size={16} />
                <span style={{ fontSize: 12, fontWeight: 700 }}>{userName?.[0] ?? 'U'}</span>
              </IconButton>
            )}
          </>
        ) : (
          <>
            <GhostButton onClick={onLoginClick}>로그인</GhostButton>
            <PrimaryButton onClick={onSignUpClick}>회원가입</PrimaryButton>
          </>
        )}
      </Actions>
    </HeaderWrap>
  );
};

export default Header;
