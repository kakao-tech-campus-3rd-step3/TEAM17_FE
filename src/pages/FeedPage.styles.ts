import styled from 'styled-components';

export const FeedContainer = styled.div`
  max-width: 75rem;
  margin: 0 auto;
  padding: 1.25rem;
  background-color: #fafafa;
  min-height: 100vh;
`;

export const FeedHeader = styled.div`
  background-color: #ffffff;
  border-bottom: 1px solid #dbdbdb;
  padding: 1rem 1.25rem;
  margin: -1.25rem -1.25rem 1.25rem -1.25rem;
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FeedTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #262626;
  margin: 0;
  flex: 1;
  text-align: center;
`;

export const HeaderWriteButton = styled.button`
  background-color: ${({ theme }) => theme.colors.orange.primary};
  color: ${({ theme }) => theme.colors.text.white};
  border: none;
  border-radius: 0.5rem;
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background-color: ${({ theme }) => theme.colors.orange.hover};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.orange.active};
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.8125rem;
  }
`;

export const FeedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  max-width: 75rem;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.125rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3.75rem 1.25rem;
`;

export const LoadingSpinner = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border: 0.1875rem solid #f3f3f3;
  border-top: 0.1875rem solid #0095f6;
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
  padding: 3.75rem 1.25rem;
  text-align: center;
`;

export const ErrorMessage = styled.p`
  color: #8e8e8e;
  font-size: 1rem;
  margin: 0;
`;

export const LoadMoreButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #0095f6;
  color: #ffffff;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1.25rem;
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
  padding: 3.75rem 1.25rem;
  text-align: center;

  p {
    color: #8e8e8e;
    font-size: 1rem;
    margin: 0;
  }
`;
