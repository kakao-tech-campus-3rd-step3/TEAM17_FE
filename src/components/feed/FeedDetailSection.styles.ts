import styled from 'styled-components';

export const FeedDetailContainer = styled.div`
  background: white;
  border-radius: 0.5rem;
  padding: 1.25rem;
  margin-bottom: 1.25rem;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.1);
  text-align: left;
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
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  text-align: left;
`;

export const UserBio = styled.p`
  margin: 0.25rem 0 0 0;
  font-size: 0.875rem;
  color: #666;
  text-align: left;
`;

export const PostContent = styled.div`
  font-size: 1rem;
  line-height: 1.5;
  color: #333;
  margin-bottom: 0.5rem;
  white-space: pre-line;
  text-align: left;
`;

export const PostDate = styled.div`
  font-size: 0.875rem;
  color: #999;
  margin-bottom: 1rem;
  text-align: left;
`;

export const ImageCarousel = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 25rem;
  border-radius: 0.5rem;
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
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: auto;
  font-size: 1.125rem;
  font-weight: bold;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

export const ImageCounter = styled.div`
  position: absolute;
  bottom: 0.75rem;
  right: 0.75rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.75rem;
  font-size: 0.75rem;
`;

export const EngagementSection = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
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
  font-size: 1.125rem;
`;

export const EngagementCount = styled.span`
  font-size: 0.875rem;
  color: #666;
  font-weight: 500;
`;

export const HashtagSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
`;

export const Hashtag = styled.span`
  background: #f0f0f0;
  color: #007bff;
  padding: 0.25rem 0.5rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
`;

export const ProductSection = styled.div`
  background: #f8f9fa;
  border-radius: 0.5rem;
  padding: 1rem;
`;

export const ProductTitle = styled.h4`
  margin: 0 0 1rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  text-align: left;
`;

export const ProductItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e9ecef;

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
  color: #333;
  margin-bottom: 0.25rem;
  text-align: left;
`;

export const ProductDescription = styled.div`
  font-size: 0.75rem;
  color: #666;
  line-height: 1.4;
  text-align: left;
`;

export const ProductLink = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
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
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0.5rem 0;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  text-align: left;

  &:hover {
    color: #333;
  }
`;
