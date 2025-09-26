import styled from 'styled-components';
import { tokens } from '@/styles/tokens';

export const InfoContainer = styled.div`
  background: ${tokens.colors.background.card};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
  height: fit-content;
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const ProfileImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 12px;
  object-fit: cover;
  border: 2px solid ${tokens.colors.orange.light};
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: ${tokens.colors.text.black};
  text-align: left;
`;

export const UserBio = styled.p`
  margin: 4px 0 0 0;
  font-size: 14px;
  color: ${tokens.colors.text.gray};
  text-align: left;
`;

export const PostContent = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: ${tokens.colors.text.black};
  margin-bottom: 8px;
  white-space: pre-line;
  text-align: left;
`;

export const PostDate = styled.div`
  font-size: 14px;
  color: ${tokens.colors.text.lightGray};
  margin-bottom: 16px;
  text-align: left;
`;

export const ProductSection = styled.div`
  background: ${tokens.colors.orange.muted};
  border-radius: 8px;
  padding: 16px;
  border: 1px solid ${tokens.colors.orange.light};
`;

export const ProductTitle = styled.h4`
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: ${tokens.colors.text.black};
  text-align: left;
`;

export const ProductItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid ${tokens.colors.line.lightGray};

  &:last-child {
    border-bottom: none;
  }
`;

export const ProductInfo = styled.div`
  flex: 1;
`;

export const ProductName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${tokens.colors.text.black};
  margin-bottom: 4px;
  text-align: left;
`;

export const ProductDescription = styled.div`
  font-size: 12px;
  color: ${tokens.colors.text.gray};
  line-height: 1.4;
  text-align: left;
`;

export const ProductLink = styled.button`
  background: ${tokens.colors.feed.productLink};
  color: ${tokens.colors.text.white};
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${tokens.colors.orange.hover};
    transform: translateY(-1px);
  }
`;

export const MoreProductsButton = styled.button`
  background: none;
  border: none;
  color: ${tokens.colors.text.gray};
  font-size: 14px;
  cursor: pointer;
  padding: 8px 0;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  text-align: left;
  transition: all 0.2s;

  &:hover {
    color: ${tokens.colors.orange.hover};
  }
`;
