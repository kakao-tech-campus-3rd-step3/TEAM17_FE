import styled from 'styled-components';

export const PostContainer = styled.article`
  background-color: #ffffff;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  margin-bottom: 24px;
  max-width: 614px;
  width: 100%;
`;

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

export const Username = styled.span`
  font-weight: 600;
  font-size: 14px;
  color: #262626;
`;

export const MoreButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: #262626;

  &:hover {
    background-color: #f5f5f5;
    border-radius: 50%;
  }
`;

export const PostImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 614px;
  object-fit: cover;
  display: block;
`;

export const PostActions = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 16px 8px;
  gap: 16px;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
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
  font-size: 14px;
  color: #262626;
  padding: 0 16px 8px;
  text-align: left;
`;

export const Caption = styled.div`
  padding: 0 16px 8px;
  font-size: 14px;
  line-height: 1.4;
  color: #262626;

  ${Username} {
    font-weight: 600;
    margin-right: 4px;
  }
`;

export const Tags = styled.div`
  padding: 0 16px 8px;
  font-size: 14px;
  color: #00376b;

  span {
    margin-right: 8px;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const CommentsCount = styled.div`
  padding: 0 16px 4px;
  font-size: 14px;
  color: #8e8e8e;
  cursor: pointer;

  &:hover {
    color: #262626;
  }
`;

export const TimeStamp = styled.div`
  padding: 0 16px 12px;
  font-size: 10px;
  color: #8e8e8e;
  text-transform: uppercase;
  letter-spacing: 0.2px;
`;

export const CategoryTag = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 16px 8px;
  font-size: 12px;
  color: #0095f6;
  font-weight: 500;
`;

export const FeedTypeTag = styled.div<{ feedType: string }>`
  display: inline-block;
  padding: 4px 8px;
  margin: 0 16px 8px;
  font-size: 10px;
  font-weight: 600;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background-color: ${(props) => {
    switch (props.feedType) {
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
    switch (props.feedType) {
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
  padding: 0 16px 8px;

  h4 {
    font-size: 12px;
    font-weight: 600;
    color: #8e8e8e;
    margin: 0 0 8px 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

export const ProductItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
    border-radius: 4px;
  }
`;

export const ProductImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  object-fit: cover;
`;

export const ProductName = styled.span`
  font-size: 12px;
  color: #262626;
  font-weight: 500;
`;
