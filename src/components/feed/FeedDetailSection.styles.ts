import styled from 'styled-components';

export const FeedDetailContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

export const UserBio = styled.p`
  margin: 4px 0 0 0;
  font-size: 14px;
  color: #666;
`;

export const PostContent = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  margin-bottom: 8px;
  white-space: pre-line;
`;

export const PostDate = styled.div`
  font-size: 14px;
  color: #999;
  margin-bottom: 16px;
`;

export const ImageCarousel = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ImageNavigation = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
  pointer-events: none;
`;

export const ImageNavButton = styled.button<{ position: 'left' | 'right' }>`
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: auto;
  font-size: 18px;
  font-weight: bold;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

export const ImageCounter = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
`;

export const EngagementSection = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
`;

export const EngagementItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

export const EngagementIcon = styled.span`
  font-size: 18px;
`;

export const EngagementCount = styled.span`
  font-size: 14px;
  color: #666;
  font-weight: 500;
`;

export const HashtagSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
`;

export const Hashtag = styled.span`
  background: #f0f0f0;
  color: #007bff;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
`;

export const ProductSection = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
`;

export const ProductTitle = styled.h4`
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

export const ProductItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #e9ecef;

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
  color: #333;
  margin-bottom: 4px;
`;

export const ProductDescription = styled.div`
  font-size: 12px;
  color: #666;
  line-height: 1.4;
`;

export const ProductLink = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #0056b3;
  }
`;

export const MoreProductsButton = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  padding: 8px 0;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    color: #333;
  }
`;
