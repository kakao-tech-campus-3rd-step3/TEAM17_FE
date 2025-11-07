import React, { useState } from 'react';
import { Heart, MessageCircle, Bookmark } from 'lucide-react';
import type { FeedDetail } from '@/types/Feed';
import { tokens } from '@/styles/tokens';
import { formatFeedDate } from '@/utils/date';
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
} from '@/components/feed/FeedDetailSection.styles';

interface FeedDetailSectionProps {
  feed: FeedDetail;
  onLike: (feedId: number, isLiked: boolean, likeCount: number) => void;
  onBookmark: (feedId: number, isBookmarked: boolean, bookmarkCount: number) => void;
}

const FeedDetailSection: React.FC<FeedDetailSectionProps> = ({ feed, onLike, onBookmark }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 이미지가 여러 개인 경우를 위한 배열 (실제로는 feed.imageUrl이 배열이어야 함)
  const images = Array.isArray(feed.imageUrl) ? feed.imageUrl : [feed.imageUrl];

  // products에서 displayedProducts 계산 (필요시 slice, filter, map 등으로 처리)
  const displayedProducts = feed.products || [];

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

  return (
    <FeedDetailContainer>
      {/* 유저 프로필 섹션 */}
      <UserProfile>
        <ProfileImage src={feed.author.profileImageUrl} alt={feed.author.name} />
        <UserInfo>
          <UserName>{feed.author.nickname || feed.author.name}</UserName>
          {feed.author.bio && <UserBio>{feed.author.bio}</UserBio>}
        </UserInfo>
      </UserProfile>

      {/* 본문 내용 */}
      <PostContent>{feed.description}</PostContent>
      <PostDate>{formatFeedDate(feed.createdAt)}</PostDate>

      {/* 이미지 캐러셀 */}
      {images.length > 0 && (
        <ImageCarousel>
          <ImageContainer>
            <img
              src={images[currentImageIndex]}
              alt="피드 이미지"
              onError={(e) => {
                // 이미지 로드 실패 시 숨김 (blob URL이 만료된 경우 등)
                e.currentTarget.style.display = 'none';
              }}
            />
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
          <EngagementIcon>
            <Heart
              size={18}
              strokeWidth={2}
              fill={feed.isLiked ? tokens.colors.orange.primary : 'none'}
              color={tokens.colors.orange.primary}
            />
          </EngagementIcon>
          <EngagementCount>
            {typeof feed.likeCount === 'number' && !isNaN(feed.likeCount)
              ? feed.likeCount.toLocaleString()
              : '0'}
          </EngagementCount>
        </EngagementItem>
        <EngagementItem>
          <EngagementIcon>
            <MessageCircle size={18} strokeWidth={2} color={tokens.colors.orange.primary} />
          </EngagementIcon>
          <EngagementCount>{feed.commentCount}</EngagementCount>
        </EngagementItem>
        <EngagementItem onClick={handleBookmark}>
          <EngagementIcon>
            <Bookmark
              size={18}
              strokeWidth={2}
              fill={feed.isBookmarked ? tokens.colors.orange.primary : 'none'}
              color={tokens.colors.orange.primary}
            />
          </EngagementIcon>
          <EngagementCount>{feed.bookmarkCount}</EngagementCount>
        </EngagementItem>
      </EngagementSection>

      {/* 해시태그 */}
      {feed.hashtags && feed.hashtags.length > 0 && (
        <HashtagSection>
          {feed.hashtags.map((tag, index) => {
            const tagName = typeof tag === 'string' ? tag : tag.hashtagName;
            const tagKey = typeof tag === 'string' ? tag : tag.id;
            return <Hashtag key={tagKey || index}>#{tagName}</Hashtag>;
          })}
        </HashtagSection>
      )}

      {/* 취미팩 상품링크 */}
      {displayedProducts.length > 0 && (
        <ProductSection>
          <ProductTitle>취미팩 상품링크</ProductTitle>
          {displayedProducts.map((product) => (
            <ProductItem key={product.productId || product.id || product.name}>
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                {product.description && (
                  <ProductDescription>{product.description}</ProductDescription>
                )}
              </ProductInfo>
              <ProductLink>링크로 이동</ProductLink>
            </ProductItem>
          ))}
        </ProductSection>
      )}
    </FeedDetailContainer>
  );
};

export default FeedDetailSection;
