import React from 'react';
import {
  HeaderWrap,
  Brand,
  Actions,
  GhostLink,
  PrimaryLink,
  IconButton,
  Avatar,
  LogoutButton,
} from './Header.styles';
import { Link } from 'react-router-dom';

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
      {/* 나중에 로고 이미지 제작하면 그걸로 바꾸기 */}
      <Brand as={Link} to="/" aria-label="홈으로 이동" title="홈으로 이동">
        장비빨🔥
      </Brand>

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
            <GhostLink to="/login" onClick={onLoginClick} aria-label="로그인 페이지로 이동">
              로그인
            </GhostLink>
            <PrimaryLink to="/signup/profile" onClick={onSignUpClick} aria-label="회원가입 시작">
              회원가입
            </PrimaryLink>
          </>
        )}
      </Actions>
    </HeaderWrap>
  );
};

export default Header;
