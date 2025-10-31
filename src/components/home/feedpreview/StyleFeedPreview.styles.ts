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

export const Emoji = styled.span`
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

export const FeedItem = styled.article`
  background-color: #ffffff;
  border: 1px solid #dbdbdb;
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-0.125rem);
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);
  }
`;

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Avatar = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  object-fit: cover;
`;

export const Username = styled.span`
  font-weight: 600;
  font-size: 0.75rem;
  color: #262626;
`;

export const PostImage = styled.img`
  width: 100%;
  height: 8rem;
  object-fit: cover;
  display: block;

  @media (max-width: 768px) {
    height: 7rem;
  }

  @media (max-width: 480px) {
    height: 6rem;
  }
`;

export const ImagePlaceholder = styled.div`
  width: 100%;
  height: 8rem;
  background-color: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-size: 0.75rem;

  @media (max-width: 768px) {
    height: 7rem;
  }

  @media (max-width: 480px) {
    height: 6rem;
  }
`;

export const PostActions = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  gap: 0.75rem;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  color: #262626;
  transition: color 0.2s ease;

  &:hover {
    color: #8e8e8e;
  }
`;

export const LikesCount = styled.div`
  font-weight: 600;
  font-size: 0.75rem;
  color: #262626;
  padding: 0 0.75rem 0.5rem;
  text-align: left;
`;

export const Caption = styled.div`
  padding: 0 0.75rem 0.5rem;
  font-size: 0.75rem;
  line-height: 1.4;
  color: #262626;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  ${Username} {
    font-weight: 600;
    margin-right: 0.25rem;
  }
`;

export const CategoryTag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0 0.75rem 0.5rem;
  font-size: 0.625rem;
  color: #0095f6;
  font-weight: 500;
`;

export const FeedTypeTag = styled.div<{ $feedType: string }>`
  display: inline-block;
  padding: 0.125rem 0.375rem;
  margin: 0 0.75rem 0.5rem;
  font-size: 0.5rem;
  font-weight: 600;
  border-radius: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.03125rem;
  background-color: ${(props) => {
    switch (props.$feedType) {
      case 'INFO':
        return '#e3f2fd';
      case 'REVIEW':
        return '#f3e5f5';
      case 'QUESTION':
        return '#fff3e0';
      case 'TIP':
        return '#e8f5e8';
      default:
        return '#f5f5f5';
    }
  }};
  color: ${(props) => {
    switch (props.$feedType) {
      case 'INFO':
        return '#1976d2';
      case 'REVIEW':
        return '#7b1fa2';
      case 'QUESTION':
        return '#f57c00';
      case 'TIP':
        return '#388e3c';
      default:
        return '#666';
    }
  }};
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8rem;
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
  height: 8rem;
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
  height: 8rem;
  color: #9ca3af;
  font-size: 0.875rem;
`;
