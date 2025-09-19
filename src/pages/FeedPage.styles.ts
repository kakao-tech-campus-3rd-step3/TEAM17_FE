import styled from 'styled-components';

export const FeedContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fafafa;
  min-height: 100vh;
`;

export const FeedHeader = styled.div`
  background-color: #ffffff;
  border-bottom: 1px solid #dbdbdb;
  padding: 16px 20px;
  margin: -20px -20px 20px -20px;
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const FeedTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #262626;
  margin: 0;
  text-align: center;
`;

export const FeedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
`;

export const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #0095f6;
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
  padding: 60px 20px;
  text-align: center;
`;

export const ErrorMessage = styled.p`
  color: #8e8e8e;
  font-size: 16px;
  margin: 0;
`;

export const LoadMoreButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #0095f6;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #1877f2;
  }

  &:disabled {
    background-color: #b2dffc;
    cursor: not-allowed;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  text-align: center;

  p {
    color: #8e8e8e;
    font-size: 16px;
    margin: 0;
  }
`;
