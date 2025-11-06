import styled from 'styled-components';
import { tokens } from '@/styles/tokens';

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
  color: ${tokens.colors.text.darkGray};
`;

export const MoreButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: ${tokens.colors.text.darkGray};

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
  cursor: pointer;
`;

export const PostActions = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  gap: 1.25rem;
  border-bottom: 1px solid ${tokens.colors.line.lightGray};
  margin-bottom: 0.75rem;
`;

export const EngagementItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

export const EngagementIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${tokens.colors.orange.primary};
  cursor: pointer;
`;

export const EngagementCount = styled.span`
  font-size: 0.875rem;
  color: ${tokens.colors.text.black};
  font-weight: 400;
  cursor: pointer;
  user-select: none;
`;

export const BookmarkButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: ${tokens.colors.orange.primary};
  margin-left: auto;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;

  &:hover {
    opacity: 0.7;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: ${tokens.colors.text.darkGray};
  transition: color 0.2s ease;

  &:hover {
    color: ${tokens.colors.text.mediumGray};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const LikesCount = styled.div`
  font-weight: 600;
  font-size: 0.875rem;
  color: ${tokens.colors.text.darkGray};
  padding: 0 1rem;
  text-align: left;
  margin-bottom: 0.75rem;
`;

export const Caption = styled.div`
  padding: 0 1rem;
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${tokens.colors.text.darkGray};
  margin-bottom: 0.75rem;

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
  color: ${tokens.colors.text.mediumGray};
  cursor: pointer;

  &:hover {
    color: ${tokens.colors.text.darkGray};
  }
`;

export const TimeStamp = styled.div`
  padding: 0 1rem 1rem;
  font-size: 0.625rem;
  color: ${tokens.colors.text.mediumGray};
  text-transform: uppercase;
  letter-spacing: 0.0125rem;
`;

export const CategoryTag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0 1rem;
  font-size: 0.75rem;
  color: ${tokens.colors.orange.primary};
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

export const FeedTypeTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  margin: 0 1rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${tokens.colors.text.mediumGray};
  background: #f3f4f6;
  border: 1px solid ${tokens.colors.line.lightGray};
  text-transform: uppercase;
`;

export const ProductsSection = styled.div`
  padding: 0 1rem 0.5rem;

  h4 {
    font-size: 0.75rem;
    font-weight: 600;
    color: ${tokens.colors.text.mediumGray};
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
  color: ${tokens.colors.text.darkGray};
  font-weight: 500;
`;
