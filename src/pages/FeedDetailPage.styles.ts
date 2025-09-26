import styled from 'styled-components';
import { tokens } from '@/styles/tokens';

export const FeedDetailPageContainer = styled.div`
  min-height: 100vh;
  background: ${tokens.colors.background.lightGray};
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  background: ${tokens.colors.background.card};
  border-bottom: 1px solid ${tokens.colors.line.lightGray};
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  margin-right: 16px;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.2s;
  color: ${tokens.colors.text.black};

  &:hover {
    background: ${tokens.colors.orange.muted};
    color: ${tokens.colors.orange.primary};
  }
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: ${tokens.colors.text.black};
  flex: 1;
  text-align: left;
`;

export const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: left;
  align-items: flex-start;
  min-height: calc(100vh - 80px);
`;

export const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
`;

export const LeftColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const BottomSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
`;

export const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const ErrorMessage = styled.p`
  color: #666;
  font-size: 16px;
  text-align: left;
  margin: 0;
`;
