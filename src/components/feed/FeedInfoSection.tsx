import React, { useState } from 'react';
import type { FeedDetail } from '@/types/Feed';
import {
  InfoContainer,
  UserProfile,
  ProfileImage,
  UserInfo,
  UserName,
  UserBio,
  PostContent,
  PostDate,
  ProductSection,
  ProductTitle,
  ProductItem,
  ProductInfo,
  ProductName,
  ProductDescription,
  ProductLink,
  MoreProductsButton,
} from './FeedInfoSection.styles';

interface FeedInfoSectionProps {
  feed: FeedDetail;
}

const FeedInfoSection: React.FC<FeedInfoSectionProps> = ({ feed }) => {
  const [showAllProducts, setShowAllProducts] = useState(false);

  const displayedProducts = showAllProducts ? feed.products : feed.products.slice(0, 3);

  return (
    <InfoContainer>
      {/* 유저 프로필 섹션 */}
      <UserProfile>
        <ProfileImage src={feed.author.profileImageUrl} alt={feed.author.name} />
        <UserInfo>
          <UserName>{feed.author.name}</UserName>
          <UserBio>INFP 감성 빵 제조기입니당~</UserBio>
        </UserInfo>
      </UserProfile>

      {/* 본문 내용 */}
      <PostContent>{feed.description}</PostContent>
      <PostDate>{feed.createdAt}</PostDate>

      {/* 취미팩 상품링크 */}
      {feed.products.length > 0 && (
        <ProductSection>
          <ProductTitle>취미팩 상품링크</ProductTitle>
          {displayedProducts.map((product) => (
            <ProductItem key={product.productId}>
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductDescription>{product.description}</ProductDescription>
              </ProductInfo>
              <ProductLink>링크로 이동</ProductLink>
            </ProductItem>
          ))}
          {feed.products.length > 3 && !showAllProducts && (
            <MoreProductsButton onClick={() => setShowAllProducts(true)}>
              취미 팩 더보기 ↓
            </MoreProductsButton>
          )}
        </ProductSection>
      )}
    </InfoContainer>
  );
};

export default FeedInfoSection;
