import styled from 'styled-components';
import { tokens } from '@/styles/tokens';

export const InfoContainer = styled.div`
  background: ${tokens.colors.background.card};
  border-radius: 0.5rem;
  padding: 1.75rem 1.5rem;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.1);
  text-align: left;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const ProfileImage = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
  border: 0.125rem solid ${tokens.colors.orange.light};
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: ${tokens.colors.text.black};
  text-align: left;
`;

export const UserBio = styled.p`
  margin: 0.25rem 0 0 0;
  font-size: 0.875rem;
  color: ${tokens.colors.text.gray};
  text-align: left;
`;

export const PostContent = styled.div`
  font-size: 1rem;
  line-height: 1.6;
  color: ${tokens.colors.text.black};
  margin: 0;
  white-space: pre-line;
  text-align: left;
`;

export const PostDate = styled.div`
  font-size: 0.875rem;
  color: ${tokens.colors.text.lightGray};
  text-align: left;
`;

export const StatsSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

export const StatItem = styled.div<{ $clickable?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.9rem;
  color: ${tokens.colors.text.mediumGray};
  cursor: ${(props) => (props.$clickable ? 'pointer' : 'default')};
  transition: color 0.2s ease;

  &:hover {
    ${(props) => (props.$clickable ? `color: ${tokens.colors.orange.primary};` : '')}
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.6rem;
  color: ${tokens.colors.text.darkGray};
  font-size: 0.9rem;
  transition: color 0.2s ease;

  &:hover:not(:disabled) {
    color: ${tokens.colors.text.mediumGray};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${tokens.colors.orange.primary};
    outline-offset: 2px;
    border-radius: 0.25rem;
  }
`;

export const HashtagSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

export const Hashtag = styled.span`
  background: ${tokens.colors.orange.muted};
  color: ${tokens.colors.feed.hashtag};
  padding: 0.35rem 0.65rem;
  border-radius: 0.75rem;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: ${tokens.colors.orange.light};
    color: ${tokens.colors.orange.dark};
  }
`;

export const OwnerActions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.75rem;
  padding-top: 1.25rem;
  margin-top: 0.5rem;
  border-top: 1px solid ${tokens.colors.line.lightGray};
`;

export const OwnerButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  color: ${tokens.colors.text.mediumGray};
  padding: 0.4rem 0.6rem;
  border-radius: 0.4rem;
  transition:
    background 0.2s ease,
    color 0.2s ease;

  &:hover {
    background: ${tokens.colors.orange.muted};
    color: ${tokens.colors.orange.dark};
  }

  &:focus-visible {
    outline: 2px solid ${tokens.colors.orange.primary};
    outline-offset: 2px;
  }
`;

export const OwnerDeleteButton = styled(OwnerButton)`
  color: #ef4444;

  &:hover {
    background: rgba(239, 68, 68, 0.1);
    color: #dc2626;
  }
`;

export const ProductSection = styled.div`
  background: ${tokens.colors.orange.muted};
  border-radius: 0.5rem;
  padding: 1rem;
  border: 1px solid ${tokens.colors.orange.light};
`;

export const ProductTitle = styled.h4`
  margin: 0 0 1rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: ${tokens.colors.text.black};
  text-align: left;
`;

export const ProductItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid ${tokens.colors.line.lightGray};

  &:last-child {
    border-bottom: none;
  }
`;

export const ProductInfo = styled.div`
  flex: 1;
`;

export const ProductName = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${tokens.colors.text.black};
  margin-bottom: 0.25rem;
  text-align: left;
`;

export const ProductDescription = styled.div`
  font-size: 0.75rem;
  color: ${tokens.colors.text.gray};
  line-height: 1.4;
  text-align: left;
`;

export const ProductLink = styled.button`
  background: ${tokens.colors.feed.productLink};
  color: ${tokens.colors.text.white};
  border: none;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${tokens.colors.orange.hover};
    transform: translateY(-0.0625rem);
  }
`;

export const MoreProductsButton = styled.button`
  background: none;
  border: none;
  color: ${tokens.colors.text.gray};
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0.5rem 0;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  text-align: left;
  transition: all 0.2s;

  &:hover {
    color: ${tokens.colors.orange.hover};
  }
`;
