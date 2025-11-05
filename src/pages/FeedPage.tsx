import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import FeedPost from '@/components/feed/FeedPost';
import { useAuth } from '@/hooks/useAuth';
import type { FeedPost as FeedPostType, FeedResponse } from '@/types/Feed';
import { fetchFeeds } from '@/api/feedApi';
import { FEED_CONSTANTS, FEED_CATEGORIES, type FeedCategoryKey } from '@/constants/feed';
import {
  FeedContainer,
  FeedHeader,
  FeedHeaderTop,
  FeedTitle,
  HeaderWriteButton,
  CategoryTabs,
  CategoryBtn,
  FeedGrid,
  LoadingContainer,
  LoadingSpinner,
  ErrorContainer,
  ErrorMessage,
  EmptyState,
  LoadMoreObserver,
} from './FeedPage.styles';

const FEED_PAGE_CONSTANTS = {
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
  const [currentPage, setCurrentPage] = useState<number>(FEED_PAGE_CONSTANTS.INITIAL_PAGE);
  const [isLastPage, setIsLastPage] = useState(false);
  const [activeCategory, setActiveCategory] = useState<FeedCategoryKey>(
    FEED_CONSTANTS.DEFAULT_CATEGORY
  );
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const handleWriteClick = () => {
    if (!isLogin) {
      alert('로그인이 필요한 서비스입니다.\n로그인 페이지로 이동합니다.');
      navigate('/login');
      return;
    }
    navigate('/feed-writing');
  };

  useEffect(() => {
    const loadInitialPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response: FeedResponse = await fetchFeeds(
          FEED_PAGE_CONSTANTS.INITIAL_PAGE,
          FEED_PAGE_CONSTANTS.INITIAL_PAGE_SIZE
        );

        setPosts(response?.content ?? []);
        setCurrentPage(response?.number ?? FEED_PAGE_CONSTANTS.INITIAL_PAGE);
        setIsLastPage(response?.last ?? false);
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
          FEED_PAGE_CONSTANTS.LOAD_MORE_PAGE_SIZE
        );

        setPosts((prev) => [...prev, ...(response?.content ?? [])]);
        setCurrentPage(response?.number ?? currentPage + 1);
        setIsLastPage(response?.last ?? false);
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

  const matchCategory = (post: FeedPostType, category: FeedCategoryKey) => {
    if (category === '전체') return true;
    const postCategory = post.category.categoryName?.trim() ?? '';
    const activeCategoryTrimmed = category.trim();

    if (postCategory === activeCategoryTrimmed) return true;

    const CATEGORY_MAPPING: Record<string, FeedCategoryKey> = {
      헬스: '헬스',
      요리: '요리',
      러닝: '러닝',
      베이킹: '베이킹',
      캠핑: '캠핑',
      독서: '독서',
    };

    const mappedCategory = CATEGORY_MAPPING[postCategory];
    if (mappedCategory && mappedCategory === activeCategoryTrimmed) return true;

    return false;
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => matchCategory(post, activeCategory));
  }, [posts, activeCategory]);

  // Intersection Observer를 사용한 무한 스크롤
  useEffect(() => {
    if (isLastPage || loadingMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current = observer;

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (observer && currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isLastPage, loadingMore, loading, handleLoadMore]);

  const showCategories = !loading && !error;

  if (loading) {
    return (
      <FeedContainer>
        <FeedHeader>
          <FeedHeaderTop>
            <FeedTitle>피드</FeedTitle>
            <HeaderWriteButton onClick={handleWriteClick}>글쓰기</HeaderWriteButton>
          </FeedHeaderTop>
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
          <FeedHeaderTop>
            <FeedTitle>피드</FeedTitle>
            <HeaderWriteButton onClick={handleWriteClick}>글쓰기</HeaderWriteButton>
          </FeedHeaderTop>
        </FeedHeader>
        <ErrorContainer>
          <ErrorMessage>{error}</ErrorMessage>
        </ErrorContainer>
      </FeedContainer>
    );
  }

  return (
    <FeedContainer>
      <FeedHeader>
        <FeedHeaderTop>
          <FeedTitle>피드</FeedTitle>
          <HeaderWriteButton onClick={handleWriteClick}>글쓰기</HeaderWriteButton>
        </FeedHeaderTop>
        {showCategories && (
          <CategoryTabs role="tablist" aria-label="피드 카테고리">
            {FEED_CATEGORIES.map((category) => (
              <CategoryBtn
                key={category}
                role="tab"
                aria-selected={activeCategory === category}
                $active={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </CategoryBtn>
            ))}
          </CategoryTabs>
        )}
      </FeedHeader>

      {filteredPosts.length === 0 && (
        <EmptyState>
          <p>
            아직 {activeCategory === '전체' ? '게시물' : `${activeCategory} 카테고리 게시물`}이
            없습니다.
          </p>
        </EmptyState>
      )}

      {filteredPosts.length > 0 && (
        <>
          <FeedGrid>
            {filteredPosts.map((post) => (
              <FeedPost key={post.feedId} post={post} onLike={handleLike} />
            ))}
          </FeedGrid>
          {!isLastPage && <LoadMoreObserver ref={loadMoreRef} />}
        </>
      )}
    </FeedContainer>
  );
};

export default FeedPage;
