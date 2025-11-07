import React, { useState } from 'react';
import type { FeedDetail } from '@/types/Feed';
import {
  MediaContainer,
  ImageCarousel,
  ImageContainer,
  ImageNavigation,
  ImageCounter,
  ImageNavButton,
} from '@/components/feed/FeedMediaSection.styles';

interface FeedMediaSectionProps {
  feed: FeedDetail;
}

const FeedMediaSection: React.FC<FeedMediaSectionProps> = ({ feed }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 이미지가 여러 개인 경우를 위한 배열
  const images = Array.isArray(feed.imageUrl) ? feed.imageUrl : [feed.imageUrl];

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
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
    </MediaContainer>
  );
};

export default FeedMediaSection;
