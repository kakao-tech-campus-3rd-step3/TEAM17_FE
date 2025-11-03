import React, { useState } from 'react';
import FeedPost from '@/components/feed/FeedPost';
import FeedDetailSection from '@/components/feed/FeedDetailSection';
import FeedMediaSection from '@/components/feed/FeedMediaSection';
import type { FeedPost as FeedPostType, FeedDetail } from '@/types/Feed';
import {
  MockPageContainer,
  MockPageHeader,
  MockPageTitle,
  MockPageDescription,
  MockSection,
  MockSectionTitle,
  MockGrid,
} from './FeedMockPage.styles';

// Mock Feed 데이터
const mockFeedPost: FeedPostType = {
  feedId: 1,
  author: {
    userId: 1,
    name: '빵수니',
    profileImageUrl: 'https://via.placeholder.com/40',
  },
  description: '오늘 만든 쿠키! 정말 맛있게 만들어졌어요 🍪',
  imageUrl: 'https://via.placeholder.com/600x600',
  feedType: 'REVIEW',
  category: {
    categoryId: 1,
    categoryName: '베이킹',
  },
  likeCount: 18,
  isLiked: false,
  createdAt: new Date().toISOString(),
};

const mockFeedDetail: FeedDetail = {
  feedId: 1,
  author: {
    userId: 1,
    email: 'bread@example.com',
    password: '',
    name: '빵수니',
    nickname: '빵수니',
    provider: 'EMAIL',
    providerId: '',
    profileImageUrl: 'https://via.placeholder.com/40',
    role: 'USER',
    birthDate: '1995-01-01',
    gender: 'FEMALE',
    phoneNumber: '',
    hobby: '베이킹',
    bio: 'INFP 감성 빵 제조기입니당~',
    refreshToken: '',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  description: '오늘 만든 쿠키! 정말 맛있게 만들어졌어요 🍪',
  imageUrl: ['https://via.placeholder.com/600x600', 'https://via.placeholder.com/600x600'],
  feedType: 'REVIEW',
  category: {
    categoryId: 1,
    categoryName: '베이킹',
  },
  likeCount: 18,
  isLiked: false,
  createdAt: new Date().toISOString(),
  commentCount: 8,
  bookmarkCount: 36,
  isBookmarked: false,
  hashtags: ['#베이킹', '#쿠키', '#홈베이킹'],
  comments: [],
};

const FeedMockPage: React.FC = () => {
  const [localFeedDetail, setLocalFeedDetail] = useState<FeedDetail>(mockFeedDetail);

  // FeedMediaSection용 핸들러 (feedId 없음)
  const handleLikeForMedia = (isLiked: boolean, likeCount: number) => {
    console.log('좋아요 클릭 (Media):', { isLiked, likeCount });
    setLocalFeedDetail((prev) => ({ ...prev, isLiked, likeCount }));
  };

  const handleBookmarkForMedia = (isBookmarked: boolean, bookmarkCount: number) => {
    console.log('북마크 클릭 (Media):', { isBookmarked, bookmarkCount });
    setLocalFeedDetail((prev) => ({ ...prev, isBookmarked, bookmarkCount }));
  };

  // FeedDetailSection용 핸들러 (feedId 포함)
  const handleLikeForDetail = (feedId: number, isLiked: boolean, likeCount: number) => {
    console.log('좋아요 클릭 (Detail):', { feedId, isLiked, likeCount });
    setLocalFeedDetail((prev) => ({ ...prev, isLiked, likeCount }));
  };

  const handleBookmarkForDetail = (
    feedId: number,
    isBookmarked: boolean,
    bookmarkCount: number
  ) => {
    console.log('북마크 클릭 (Detail):', { feedId, isBookmarked, bookmarkCount });
    setLocalFeedDetail((prev) => ({ ...prev, isBookmarked, bookmarkCount }));
  };

  return (
    <MockPageContainer>
      <MockPageHeader>
        <MockPageTitle>피드 디자인 Mock 페이지</MockPageTitle>
        <MockPageDescription>
          이 페이지는 디자인 확인용 임시 페이지입니다. 확인 후 삭제 가능합니다.
        </MockPageDescription>
      </MockPageHeader>

      <MockSection>
        <MockSectionTitle>1. 피드 목록 아이템 (FeedPost)</MockSectionTitle>
        <MockGrid>
          <FeedPost
            post={mockFeedPost}
            onLike={(feedId, isLiked, likeCount) => {
              console.log('FeedPost 좋아요:', { feedId, isLiked, likeCount });
            }}
          />
        </MockGrid>
      </MockSection>

      <MockSection>
        <MockSectionTitle>2. 피드 상세 - 미디어 섹션 (FeedMediaSection)</MockSectionTitle>
        <MockGrid>
          <FeedMediaSection
            feed={localFeedDetail}
            onLike={handleLikeForMedia}
            onBookmark={handleBookmarkForMedia}
            onOpenLikers={() => alert('좋아요 사용자 목록 모달 열기')}
          />
        </MockGrid>
      </MockSection>

      <MockSection>
        <MockSectionTitle>3. 피드 상세 - 정보 섹션 (FeedDetailSection)</MockSectionTitle>
        <MockGrid>
          <FeedDetailSection
            feed={localFeedDetail}
            onLike={handleLikeForDetail}
            onBookmark={handleBookmarkForDetail}
          />
        </MockGrid>
      </MockSection>
    </MockPageContainer>
  );
};

export default FeedMockPage;
