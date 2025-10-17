import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import FeedPost from '@/components/feed/FeedPost';
import { useAuth } from '@/hooks/useAuth';
import type { FeedPost as FeedPostType, FeedResponse } from '@/types/Feed';
import { fetchFeeds } from '@/api/feedApi';
import {
  FeedContainer,
  FeedHeader,
  FeedTitle,
  HeaderWriteButton,
  FeedGrid,
  LoadingContainer,
  LoadingSpinner,
  ErrorContainer,
  ErrorMessage,
  LoadMoreButton,
  EmptyState,
} from './FeedPage.styles';

const FEED_CONSTANTS = {
  INITIAL_PAGE: 0,
  INITIAL_PAGE_SIZE: 12,
  LOAD_MORE_PAGE_SIZE: 12,
} as const;

const FeedPage = () => {
  const navigate = useNavigate();
  const { isLogin } = useAuth();
  const [posts, setPosts] = useState<FeedPostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(FEED_CONSTANTS.INITIAL_PAGE);
  const [isLastPage, setIsLastPage] = useState(false);

  const handleWriteClick = () => {
    if (!isLogin) {
      alert('로그인이 필요한 서비스입니다.\n로그인 페이지로 이동합니다.');
      navigate('/login');
      return;
    }
    navigate('/feedwriting');
  };

  useEffect(() => {
    const loadInitialPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response: FeedResponse = await fetchFeeds(
          FEED_CONSTANTS.INITIAL_PAGE,
          FEED_CONSTANTS.INITIAL_PAGE_SIZE
        );

        setPosts(response.content);
        setCurrentPage(response.number);
        setIsLastPage(response.last);
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
    if (!isLastPage && !loadingMore) {
      try {
        setLoadingMore(true);
        const response: FeedResponse = await fetchFeeds(
          currentPage + 1,
          FEED_CONSTANTS.LOAD_MORE_PAGE_SIZE
        );

        setPosts((prev) => [...prev, ...response.content]);
        setCurrentPage(response.number);
        setIsLastPage(response.last);
      } catch (err) {
        setError('피드를 불러오는데 실패했습니다.');
        console.error('Failed to load more posts:', err);
      } finally {
        setLoadingMore(false);
      }
    }
  }, [isLastPage, loadingMore, currentPage]);

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
          <HeaderWriteButton onClick={handleWriteClick}>글쓰기</HeaderWriteButton>
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
          <HeaderWriteButton onClick={handleWriteClick}>글쓰기</HeaderWriteButton>
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
        {posts.map((post) => (
          <FeedPost key={post.feedId} post={post} onLike={handleLike} />
        ))}
      </FeedGrid>

      {!isLastPage && (
        <LoadMoreButton onClick={handleLoadMore} disabled={loadingMore}>
          {loadingMore ? '로딩 중...' : '더 보기'}
        </LoadMoreButton>
      )}
    </FeedContainer>
  );
};

export default FeedPage;
