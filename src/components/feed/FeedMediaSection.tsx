import React, { useState } from 'react';
import { Heart, MessageCircle, Bookmark } from 'lucide-react';
import type { FeedDetail } from '@/types/Feed';
import { tokens } from '@/styles/tokens';
import {
  MediaContainer,
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
} from './FeedMediaSection.styles';

interface FeedMediaSectionProps {
  feed: FeedDetail;
  onLike: (isLiked: boolean, likeCount: number) => void;
  onBookmark: (isBookmarked: boolean, bookmarkCount: number) => void;
  onOpenLikers?: () => void;
}

const FeedMediaSection: React.FC<FeedMediaSectionProps> = ({
  feed,
  onLike,
  onBookmark,
  onOpenLikers,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 이미지가 여러 개인 경우를 위한 배열
  const images = Array.isArray(feed.imageUrl) ? feed.imageUrl : [feed.imageUrl];

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike(!feed.isLiked, feed.isLiked ? feed.likeCount - 1 : feed.likeCount + 1);
  };

  const handleLikeCountClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onOpenLikers && feed.likeCount > 0) {
      onOpenLikers();
    }
  };

  const handleBookmark = () => {
    onBookmark(
      !feed.isBookmarked,
      feed.isBookmarked ? feed.bookmarkCount - 1 : feed.bookmarkCount + 1
    );
  };

  return (
    <MediaContainer>
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
                  <ImageNavButton onClick={handlePreviousImage} $position="left">
                    ←
                  </ImageNavButton>
                  <ImageNavButton onClick={handleNextImage} $position="right">
                    →
                  </ImageNavButton>
                </ImageNavigation>
                <ImageCounter>
                  {currentImageIndex + 1}/{images.length}
                </ImageCounter>
              </>
            )}
          </ImageContainer>
        </ImageCarousel>
      )}

      <EngagementSection>
        <EngagementItem>
          <EngagementIcon onClick={handleLike}>
            <Heart
              size={18}
              strokeWidth={2}
              fill={feed.isLiked ? tokens.colors.orange.primary : 'none'}
              color={tokens.colors.orange.primary}
            />
          </EngagementIcon>
          <EngagementCount onClick={handleLikeCountClick} $clickable={feed.likeCount > 0}>
            {feed.likeCount}
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
          {feed.hashtags.map((tag) => (
            <Hashtag key={tag}>{tag}</Hashtag>
          ))}
        </HashtagSection>
      )}
    </MediaContainer>
  );
};

export default FeedMediaSection;
