import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  padding: 2rem;
  text-align: center;
  border-radius: 0.5rem;
  margin: 1rem;
`;

const NetworkErrorContainer = styled(ErrorContainer)`
  background-color: #fef2f2;
  border: 1px solid #fecaca;
`;

const AuthErrorContainer = styled(ErrorContainer)`
  background-color: #fef3cd;
  border: 1px solid #fde68a;
`;

const ServerErrorContainer = styled(ErrorContainer)`
  background-color: #fef2f2;
  border: 1px solid #fecaca;
`;

const NotFoundErrorContainer = styled(ErrorContainer)`
  background-color: #f0f9ff;
  border: 1px solid #bae6fd;
`;

const ErrorTitle = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
`;

const ErrorMessage = styled.p`
  margin-bottom: 1rem;
  font-size: 0.875rem;
`;

const ErrorActions = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const ErrorButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;

  ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'primary':
        return `
          background-color: #dc2626;
          color: white;
          &:hover {
            background-color: #b91c1c;
          }
        `;
      case 'secondary':
        return `
          background-color: #f3f4f6;
          color: #374151;
          border: 1px solid #d1d5db;
          &:hover {
            background-color: #e5e7eb;
          }
        `;
    }
  }}
`;

interface ErrorUIProps {
  type: 'network' | 'auth' | 'server' | 'notFound' | 'unknown';
  message?: string;
  onRetry?: () => void;
  onGoHome?: () => void;
  onLogin?: () => void;
}

const ErrorUI: React.FC<ErrorUIProps> = ({ type, message, onRetry, onGoHome, onLogin }) => {
  const getErrorContent = () => {
    switch (type) {
      case 'network':
        return {
          container: NetworkErrorContainer,
          title: '네트워크 연결 오류',
          defaultMessage: '인터넷 연결을 확인해주세요.',
          color: '#dc2626',
        };
      case 'auth':
        return {
          container: AuthErrorContainer,
          title: '인증이 필요합니다',
          defaultMessage: '로그인이 필요한 서비스입니다.',
          color: '#d97706',
        };
      case 'server':
        return {
          container: ServerErrorContainer,
          title: '서버 오류',
          defaultMessage: '서버에 일시적인 문제가 발생했습니다.',
          color: '#dc2626',
        };
      case 'notFound':
        return {
          container: NotFoundErrorContainer,
          title: '페이지를 찾을 수 없습니다',
          defaultMessage: '요청하신 페이지가 존재하지 않습니다.',
          color: '#0284c7',
        };
      default:
        return {
          container: ErrorContainer,
          title: '오류가 발생했습니다',
          defaultMessage: '알 수 없는 오류가 발생했습니다.',
          color: '#dc2626',
        };
    }
  };

  const { container: Container, title, defaultMessage, color } = getErrorContent();

  return (
    <Container>
      <ErrorTitle style={{ color }}>{title}</ErrorTitle>
      <ErrorMessage style={{ color }}>{message || defaultMessage}</ErrorMessage>
      <ErrorActions>
        {onRetry && <ErrorButton onClick={onRetry}>다시 시도</ErrorButton>}
        {onLogin && type === 'auth' && <ErrorButton onClick={onLogin}>로그인하기</ErrorButton>}
        {onGoHome && (
          <ErrorButton variant="secondary" onClick={onGoHome}>
            홈으로
          </ErrorButton>
        )}
      </ErrorActions>
    </Container>
  );
};

export default ErrorUI;
