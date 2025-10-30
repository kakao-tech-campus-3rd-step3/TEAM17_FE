import { Suspense, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useSuspenseQuery } from '@/hooks/useSuspenseQuery';
import { fetchFeeds } from '@/api/feedApi';
import type { FeedPost as FeedPostType, FeedResponse } from '@/types/Feed';
import FeedPost from '@/components/feed/FeedPost';
import SuspenseFallback from '@/components/common/SuspenseFallback';
import ErrorBoundaryWithRecovery from '@/components/common/ErrorBoundaryWithRecovery';
import {
  FeedContainer,
  FeedHeader,
  FeedTitle,
  HeaderWriteButton,
  FeedGrid,
  LoadMoreButton,
  EmptyState,
} from '../FeedPage.styles';

const FEED_CONSTANTS = {
  INITIAL_PAGE: 0,
  INITIAL_PAGE_SIZE: 12,
  LOAD_MORE_PAGE_SIZE: 12,
} as const;

const FeedData = () => {
  const navigate = useNavigate();
  const { isLogin } = useAuth();

  const { data: feedResponse } = useSuspenseQuery<FeedResponse>(
    ['feeds', FEED_CONSTANTS.INITIAL_PAGE, FEED_CONSTANTS.INITIAL_PAGE_SIZE],
    () => fetchFeeds(FEED_CONSTANTS.INITIAL_PAGE, FEED_CONSTANTS.INITIAL_PAGE_SIZE),
    {
      staleTime: 5 * 60 * 1000,
    }
  ) as { data: FeedResponse };

  const handleWriteClick = () => {
    if (!isLogin) {
      alert('로그인이 필요한 서비스입니다.\n로그인 페이지로 이동합니다.');
      navigate('/login');
      return;
    }
    navigate('/feedwriting');
  };

  const handleLike = useCallback((feedId: number, isLiked: boolean, likeCount: number) => {
    console.log('Like updated:', { feedId, isLiked, likeCount });
  }, []);

  if (feedResponse.content.length === 0) {
    return (
      <FeedContainer>
        <FeedHeader>
          <FeedTitle>피드</FeedTitle>
          <HeaderWriteButton onClick={handleWriteClick}>글쓰기</HeaderWriteButton>
        </FeedHeader>
        <EmptyState>
          <p>아직 게시물이 없습니다.</p>
        </EmptyState>
      </FeedContainer>
    );
  }

  return (
    <FeedContainer>
      <FeedHeader>
        <FeedTitle>피드</FeedTitle>
        <HeaderWriteButton onClick={handleWriteClick}>글쓰기</HeaderWriteButton>
      </FeedHeader>

      <FeedGrid>
        {feedResponse.content.map((post: FeedPostType) => (
          <FeedPost key={post.feedId} post={post} onLike={handleLike} />
        ))}
      </FeedGrid>

      {!feedResponse.last && (
        <LoadMoreButton onClick={() => {}} disabled={false}>
          더 보기
        </LoadMoreButton>
      )}
    </FeedContainer>
  );
};

const FeedPageSuspense = () => {
  return (
    <ErrorBoundaryWithRecovery>
      <Suspense fallback={<SuspenseFallback message="피드를 불러오는 중..." />}>
        <FeedData />
      </Suspense>
    </ErrorBoundaryWithRecovery>
  );
};

export default FeedPageSuspense;
