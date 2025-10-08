import styled from 'styled-components';

export const DetailContainer = styled.div`
  max-width: 75rem;
  margin: 0 auto;
  padding: 1.25rem;
  background-color: #fafafa;
  min-height: 100vh;
`;

export const DetailHeader = styled.div`
  background-color: #ffffff;
  border-bottom: 1px solid #dbdbdb;
  padding: 1rem 1.25rem;
  margin: -1.25rem -1.25rem 1.25rem -1.25rem;
`;

export const DetailTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #262626;
  margin: 0;
  text-align: center;
`;

export const DetailContent = styled.div`
  background-color: #ffffff;
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
