import React, { useState } from 'react';
import type { FeedDetail } from '@/types/Feed';
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
  onLike: (feedId: number, isLiked: boolean, likeCount: number) => void;
  onBookmark: (feedId: number, isBookmarked: boolean, bookmarkCount: number) => void;
}

const FeedMediaSection: React.FC<FeedMediaSectionProps> = ({ feed, onLike, onBookmark }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 이미지가 여러 개인 경우를 위한 배열
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

  return (
    <MediaContainer>
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

      {/* 좋아요, 댓글, 북마크, 공유 버튼 */}
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
        <EngagementItem>
          <EngagementIcon>📤</EngagementIcon>
          <EngagementCount>공유</EngagementCount>
        </EngagementItem>
      </EngagementSection>

      {/* 해시태그 */}
      {feed.hashtags.length > 0 && (
        <HashtagSection>
          {feed.hashtags.map((tag, index) => (
            <Hashtag key={index}>#{tag}</Hashtag>
          ))}
        </HashtagSection>
      )}
    </MediaContainer>
  );
};

export default FeedMediaSection;
