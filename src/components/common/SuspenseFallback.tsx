import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  width: 100%;
  gap: 16px;
`;

const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  color: #666;
  font-size: 14px;
  margin: 0;
`;

interface SuspenseFallbackProps {
  message?: string;
}

const SuspenseFallback: React.FC<SuspenseFallbackProps> = ({ message = '로딩 중...' }) => {
  return (
    <LoadingContainer>
      <LoadingSpinner />
      <LoadingText>{message}</LoadingText>
    </LoadingContainer>
  );
};

export default SuspenseFallback;
