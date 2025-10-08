import styled from 'styled-components';

export const StarterPackContainer = styled.div`
  max-width: 75rem;
  margin: 0 auto;
  padding: 1.25rem;
  background-color: #fafafa;
  min-height: 100vh;
`;

export const StarterPackHeader = styled.div`
  background-color: #ffffff;
  border-bottom: 1px solid #dbdbdb;
  padding: 1rem 1.25rem;
  margin: -1.25rem -1.25rem 1.25rem -1.25rem;
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const StarterPackTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #262626;
  margin: 0 0 1rem 0;
  text-align: center;
`;

export const CategoryTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
`;

export const CategoryBtn = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid ${(props) => (props.active ? '#ff6b35' : '#dbdbdb')};
  background-color: ${(props) => (props.active ? '#ff6b35' : '#ffffff')};
  color: ${(props) => (props.active ? '#ffffff' : '#262626')};
  border-radius: 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    border-color: #ff6b35;
    background-color: ${(props) => (props.active ? '#ff6b35' : '#fff5f0')};
    color: ${(props) => (props.active ? '#ffffff' : '#ff6b35')};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const StarterPackGrid = styled.div`
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
  border-top: 0.1875rem solid #ff6b35;
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
