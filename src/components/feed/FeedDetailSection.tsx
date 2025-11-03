import React, { useState } from 'react';
import type { FeedDetail } from '@/types/Feed';
import { FEED_CONSTANTS } from '@/constants/feed';
import {
  FeedDetailContainer,
  UserProfile,
  ProfileImage,
  UserInfo,
  UserName,
  UserBio,
  PostContent,
  PostDate,
  ImageCarousel,
  ImageContainer,
  ImageNavigation,
  ImageCounter,
  ImageNavButton,
  EngagementSection,
  EngagementItem,
  EngagementIcon,
  EngagementCount,
  HashtagSection,
  Hashtag,
  ProductSection,
  ProductTitle,
  ProductItem,
  ProductInfo,
  ProductName,
  ProductDescription,
  ProductLink,
  MoreProductsButton,
} from './FeedDetailSection.styles';

interface FeedDetailSectionProps {
  feed: FeedDetail;
  onLike: (feedId: number, isLiked: boolean, likeCount: number) => void;
  onBookmark: (feedId: number, isBookmarked: boolean, bookmarkCount: number) => void;
}

const FeedDetailSection: React.FC<FeedDetailSectionProps> = ({ feed, onLike, onBookmark }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllProducts, setShowAllProducts] = useState(false);

  // 이미지가 여러 개인 경우를 위한 배열 (실제로는 feed.imageUrl이 배열이어야 함)
  const images = Array.isArray(feed.imageUrl) ? feed.imageUrl : [feed.imageUrl];

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleLike = () => {
    onLike(feed.feedId, !feed.isLiked, feed.isLiked ? feed.likeCount - 1 : feed.likeCount + 1);
  };

  const handleBookmark = () => {
    onBookmark(
      feed.feedId,
      !feed.isBookmarked,
      feed.isBookmarked ? feed.bookmarkCount - 1 : feed.bookmarkCount + 1
    );
  };

  const products = feed.products || [];
  const displayedProducts = showAllProducts
    ? products
    : products.slice(0, FEED_CONSTANTS.INITIAL_PRODUCT_DISPLAY_COUNT);

  return (
    <FeedDetailContainer>
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

      {/* 이미지 캐러셀 */}
      {images.length > 0 && (
        <ImageCarousel>
          <ImageContainer>
            <img src={images[currentImageIndex]} alt="피드 이미지" />
            {images.length > 1 && (
              <>
                <ImageNavigation>
                  <ImageNavButton onClick={handlePreviousImage} position="left">
                    ←
                  </ImageNavButton>
                  <ImageNavButton onClick={handleNextImage} position="right">
                    →
                  </ImageNavButton>
                </ImageNavigation>
                <ImageCounter>
                  {currentImageIndex + 1}/{images.length}+
                </ImageCounter>
              </>
            )}
          </ImageContainer>
        </ImageCarousel>
      )}

      {/* 좋아요, 댓글, 북마크 */}
      <EngagementSection>
        <EngagementItem onClick={handleLike}>
          <EngagementIcon>❤️</EngagementIcon>
          <EngagementCount>{feed.likeCount}</EngagementCount>
        </EngagementItem>
        <EngagementItem>
          <EngagementIcon>💬</EngagementIcon>
          <EngagementCount>{feed.commentCount}</EngagementCount>
        </EngagementItem>
        <EngagementItem onClick={handleBookmark}>
          <EngagementIcon>🔖</EngagementIcon>
          <EngagementCount>{feed.bookmarkCount}</EngagementCount>
        </EngagementItem>
      </EngagementSection>

      {/* 해시태그 */}
      {feed.hashtags && feed.hashtags.length > 0 && (
        <HashtagSection>
          {feed.hashtags.map((tag) => (
            <Hashtag key={tag}>{tag}</Hashtag>
          ))}
        </HashtagSection>
      )}

      {/* 취미팩 상품링크 */}
      {products.length > 0 && (
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
          {products.length > FEED_CONSTANTS.INITIAL_PRODUCT_DISPLAY_COUNT && !showAllProducts && (
            <MoreProductsButton onClick={() => setShowAllProducts(true)}>
              취미 팩 더보기 ↓
            </MoreProductsButton>
          )}
        </ProductSection>
      )}
    </FeedDetailContainer>
  );
};

export default FeedDetailSection;
