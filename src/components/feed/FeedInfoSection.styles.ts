import styled from 'styled-components';
import { tokens } from '@/styles/tokens';

export const InfoContainer = styled.div`
  background: ${tokens.colors.background.card};
  border-radius: 0.5rem;
  padding: 1.25rem;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.1);
  text-align: left;
  height: fit-content;
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const ProfileImage = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-right: 0.75rem;
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
  line-height: 1.5;
  color: ${tokens.colors.text.black};
  margin-bottom: 0.5rem;
  white-space: pre-line;
  text-align: left;
`;

export const PostDate = styled.div`
  font-size: 0.875rem;
  color: ${tokens.colors.text.lightGray};
  margin-bottom: 1rem;
  text-align: left;
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
