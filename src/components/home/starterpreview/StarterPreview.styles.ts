import styled from 'styled-components';

export const Wrap = styled.div`
  background-color: #ffffff;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
`;

export const Badge = styled.span`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 0.875rem;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  font-weight: 500;
`;

export const Button = styled.button`
  font-size: 0.875rem;
  font-weight: 500;
  color: #3b82f6;
  cursor: pointer;
  background: transparent;
  border: 1px solid #d1d5db;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
    border-color: #3b82f6;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.375rem;
  }
`;

export const GridItem = styled.div`
  background-color: #e5e7eb;
  border-radius: 0.5rem;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    height: 5rem;
  }

  @media (max-width: 480px) {
    height: 4rem;
  }
`;

export const ImagePlaceholder = styled.span`
  color: #9ca3af;
  font-size: 0.75rem;
  text-align: center;
  padding: 0.5rem;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6rem;
`;

export const LoadingSpinner = styled.div`
  width: 2rem;
  height: 2rem;
  border: 2px solid #e5e7eb;
  border-top: 2px solid #3b82f6;
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
  height: 6rem;
`;

export const ErrorMessage = styled.span`
  color: #ef4444;
  font-size: 0.875rem;
  text-align: center;
`;

export const EmptyState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6rem;
  color: #9ca3af;
  font-size: 0.875rem;
`;
