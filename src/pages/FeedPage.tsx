import { useEffect, useState, useCallback } from 'react';
import FeedPost from '@/components/feed/FeedPost';
import type { FeedPost as FeedPostType, FeedResponse } from '@/types/Feed';
import { fetchFeedPosts } from '@/mocks/feedData';
import {
  FeedContainer,
  FeedHeader,
  FeedTitle,
  FeedGrid,
  LoadingContainer,
  LoadingSpinner,
  ErrorContainer,
  ErrorMessage,
  LoadMoreButton,
  EmptyState,
} from './FeedPage.styles';

const FEED_CONSTANTS = {
  INITIAL_PAGE: 1,
  INITIAL_PAGE_SIZE: 12,
  LOAD_MORE_PAGE_SIZE: 12,
} as const;

const FeedPage = () => {
  const [posts, setPosts] = useState<FeedPostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(FEED_CONSTANTS.INITIAL_PAGE);
  const [hasNext, setHasNext] = useState(false);

  useEffect(() => {
    const loadInitialPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response: FeedResponse = await fetchFeedPosts(
          FEED_CONSTANTS.INITIAL_PAGE,
          FEED_CONSTANTS.INITIAL_PAGE_SIZE
        );

        setPosts(response.feeds);
        setCurrentPage(response.currentPage);
        setHasNext(response.hasNext);
      } catch (err) {
        setError('피드를 불러오는데 실패했습니다.');
        console.error('Failed to load posts:', err);
      } finally {
        setLoading(false);
      }
    };

    loadInitialPosts();
  }, []);

  const handleLoadMore = useCallback(async () => {
    if (hasNext && !loadingMore) {
      try {
        setLoadingMore(true);
        const response: FeedResponse = await fetchFeedPosts(
          currentPage + 1,
          FEED_CONSTANTS.LOAD_MORE_PAGE_SIZE
        );

        setPosts((prev) => [...prev, ...response.feeds]);
        setCurrentPage(response.currentPage);
        setHasNext(response.hasNext);
      } catch (err) {
        setError('피드를 불러오는데 실패했습니다.');
        console.error('Failed to load more posts:', err);
      } finally {
        setLoadingMore(false);
      }
    }
  }, [hasNext, loadingMore, currentPage]);

  const handleLike = useCallback((feedId: number, isLiked: boolean, likeCount: number) => {
    setPosts((prev) =>
      prev.map((post) => (post.feedId === feedId ? { ...post, isLiked, likeCount } : post))
    );
  }, []);

  if (loading) {
    return (
      <FeedContainer>
        <FeedHeader>
          <FeedTitle>피드</FeedTitle>
        </FeedHeader>
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      </FeedContainer>
    );
  }

  if (error) {
    return (
      <FeedContainer>
        <FeedHeader>
          <FeedTitle>피드</FeedTitle>
        </FeedHeader>
        <ErrorContainer>
          <ErrorMessage>{error}</ErrorMessage>
        </ErrorContainer>
      </FeedContainer>
    );
  }

  if (posts.length === 0) {
    return (
      <FeedContainer>
        <FeedHeader>
          <FeedTitle>피드</FeedTitle>
        </FeedHeader>
        <EmptyState>
          <p>아직 게시물이 없습니다.</p>
        </EmptyState>
      </FeedContainer>
    );
  }

  return (
    <>
      <FeedContainer>
        <FeedHeader>
          <FeedTitle>피드</FeedTitle>
        </FeedHeader>

        <FeedGrid>
          {posts.map((post) => (
            <FeedPost key={post.feedId} post={post} onLike={handleLike} />
          ))}
        </FeedGrid>

        {hasNext && (
          <LoadMoreButton onClick={handleLoadMore} disabled={loadingMore}>
            {loadingMore ? '로딩 중...' : '더 보기'}
          </LoadMoreButton>
        )}
      </FeedContainer>
    </>
  );
};

export default FeedPage;
