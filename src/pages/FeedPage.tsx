import { useEffect, useState } from 'react';
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

const FeedPage = () => {
  const [posts, setPosts] = useState<FeedPostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);

  const loadPosts = async (page: number = 1, append: boolean = false) => {
    try {
      if (page === 1) {
        setLoading(true);
        setError(null);
      } else {
        setLoadingMore(true);
      }

      const response: FeedResponse = await fetchFeedPosts(page, 10);

      if (append) {
        setPosts((prev) => [...prev, ...response.feeds]);
      } else {
        setPosts(response.feeds);
      }

      setCurrentPage(response.currentPage);
      setHasNext(response.hasNext);
    } catch (err) {
      setError('피드를 불러오는데 실패했습니다.');
      console.error('Failed to load posts:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadPosts(1);
  }, []);

  const handleLoadMore = () => {
    if (hasNext && !loadingMore) {
      loadPosts(currentPage + 1, true);
    }
  };

  const handleLike = (feedId: number, isLiked: boolean) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.feedId === feedId
          ? { ...post, likeCount: isLiked ? post.likeCount + 1 : post.likeCount - 1 }
          : post
      )
    );
  };

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
  );
};

export default FeedPage;
