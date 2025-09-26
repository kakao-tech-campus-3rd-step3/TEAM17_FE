import styled from 'styled-components';

export const PostContainer = styled.article`
  background-color: #ffffff;
  border: 1px solid #dbdbdb;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  max-width: 38.375rem;
  width: 100%;
`;

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1rem;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const Avatar = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
`;

export const Username = styled.span`
  font-weight: 600;
  font-size: 0.875rem;
  color: #262626;
`;

export const MoreButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #262626;

  &:hover {
    background-color: #f5f5f5;
    border-radius: 50%;
  }
`;

export const PostImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 38.375rem;
  object-fit: cover;
  display: block;
`;

export const PostActions = styled.div`
  display: flex;
  align-items: center;
  padding: 0.375rem 1rem 0.5rem;
  gap: 1rem;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #262626;
  transition: color 0.2s ease;

  &:hover {
    color: #8e8e8e;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const LikesCount = styled.div`
  font-weight: 600;
  font-size: 0.875rem;
  color: #262626;
  padding: 0 1rem 0.5rem;
  text-align: left;
`;

export const Caption = styled.div`
  padding: 0 1rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.4;
  color: #262626;

  ${Username} {
    font-weight: 600;
    margin-right: 0.25rem;
  }
`;

export const Tags = styled.div`
  padding: 0 1rem 0.5rem;
  font-size: 0.875rem;
  color: #00376b;

  span {
    margin-right: 0.5rem;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const CommentsCount = styled.div`
  padding: 0 1rem 0.25rem;
  font-size: 0.875rem;
  color: #8e8e8e;
  cursor: pointer;

  &:hover {
    color: #262626;
  }
`;

export const TimeStamp = styled.div`
  padding: 0 1rem 0.75rem;
  font-size: 0.625rem;
  color: #8e8e8e;
  text-transform: uppercase;
  letter-spacing: 0.0125rem;
`;

export const CategoryTag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0 1rem 0.5rem;
  font-size: 0.75rem;
  color: #0095f6;
  font-weight: 500;
`;

export const FeedTypeTag = styled.div<{ $feedType: string }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  margin: 0 1rem 0.5rem;
  font-size: 0.625rem;
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

export const ProductsSection = styled.div`
  padding: 0 1rem 0.5rem;

  h4 {
    font-size: 0.75rem;
    font-weight: 600;
    color: #8e8e8e;
    margin: 0 0 0.5rem 0;
    text-transform: uppercase;
    letter-spacing: 0.03125rem;
  }
`;

export const ProductItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
    border-radius: 0.25rem;
  }
`;

export const ProductImage = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 0.25rem;
  object-fit: cover;
`;

export const ProductName = styled.span`
  font-size: 0.75rem;
  color: #262626;
  font-weight: 500;
`;
