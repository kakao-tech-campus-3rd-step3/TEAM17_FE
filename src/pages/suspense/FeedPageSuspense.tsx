import { Suspense, useCallback, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query';
import { fetchFeeds, toggleFeedLike, toggleFeedBookmark } from '@/api/feedApi';
import type { FeedPost as FeedPostType, FeedResponse } from '@/types/Feed';
import { FEED_CONSTANTS, FEED_CATEGORIES, type FeedCategoryKey } from '@/constants/feed';
import { CATEGORY_MAPPING } from '@/constants/starterPack';
import FeedPost from '@/components/feed/FeedPost';
import SuspenseFallback from '@/components/common/SuspenseFallback';
import ErrorBoundaryWithRecovery from '@/components/common/ErrorBoundaryWithRecovery';
import { QUERY_KEYS } from '@/utils/queryKeys';
import {
  FeedContainer,
  FeedHeader,
  FeedHeaderTop,
  FeedTitle,
  HeaderWriteButton,
  CategoryTabs,
  CategoryBtn,
  FeedGrid,
  EmptyState,
} from '@/pages/FeedPage.styles';

const FEED_PAGE_CONSTANTS = {
  INITIAL_PAGE: 0,
  INITIAL_PAGE_SIZE: 12,
  LOAD_MORE_PAGE_SIZE: 12,
} as const;

const FeedData = () => {
  const navigate = useNavigate();
  const { isLogin } = useAuth();
  const queryClient = useQueryClient();
  const [activeCategory, setActiveCategory] = useState<FeedCategoryKey>(
    FEED_CONSTANTS.DEFAULT_CATEGORY
  );

  const { data: feedResponse } = useSuspenseQuery<FeedResponse>({
    queryKey: ['feeds', FEED_PAGE_CONSTANTS.INITIAL_PAGE, FEED_PAGE_CONSTANTS.INITIAL_PAGE_SIZE],
    queryFn: () =>
      fetchFeeds(FEED_PAGE_CONSTANTS.INITIAL_PAGE, FEED_PAGE_CONSTANTS.INITIAL_PAGE_SIZE),
    staleTime: 5 * 60 * 1000,
  });

  const matchCategory = (post: FeedPostType, category: FeedCategoryKey) => {
    if (category === '전체') return true;
    const postCategory = post.category.categoryName?.trim() ?? '';
    const activeCategoryTrimmed = category.trim();

    if (postCategory === activeCategoryTrimmed) return true;

    const mappedCategory = CATEGORY_MAPPING[postCategory] as FeedCategoryKey | undefined;
    if (mappedCategory && mappedCategory === activeCategoryTrimmed) return true;

    return false;
  };

  const filteredPosts = useMemo(() => {
    if (!feedResponse?.content) return [];
    return feedResponse.content.filter((post) => matchCategory(post, activeCategory));
  }, [feedResponse?.content, activeCategory]);

  const handleWriteClick = () => {
    if (!isLogin) {
      alert('로그인이 필요한 서비스입니다.\n로그인 페이지로 이동합니다.');
      navigate('/login');
      return;
    }
    navigate('/feed-writing');
  };

  const handleLike = useCallback(
    async (feedId: number, isLiked: boolean, likeCount: number) => {
      const queryKey = [
        'feeds',
        FEED_PAGE_CONSTANTS.INITIAL_PAGE,
        FEED_PAGE_CONSTANTS.INITIAL_PAGE_SIZE,
      ] as const;

      const previousData = queryClient.getQueryData<FeedResponse>(queryKey);

      if (!previousData) return;

      queryClient.setQueryData<FeedResponse>(queryKey, (old) => {
        if (!old?.content) return old;
        return {
          ...old,
          content: old.content.map((post) => ({
            ...post,
            ...(post.feedId === feedId && { isLiked, likeCount }),
          })),
        };
      });

      try {
        const response = await toggleFeedLike(feedId);
        queryClient.setQueryData<FeedResponse>(queryKey, (old) => {
          if (!old?.content) return old;
          return {
            ...old,
            content: old.content.map((post) => ({
              ...post,
              ...(post.feedId === feedId && {
                isLiked: response.isLiked,
                likeCount: response.likeCount,
              }),
            })),
          };
        });
      } catch {
        queryClient.setQueryData(queryKey, previousData);
      }
    },
    [queryClient]
  );

  const handleBookmark = useCallback(
    async (feedId: number, isBookmarked: boolean, bookmarkCount: number) => {
      const queryKey = [
        'feeds',
        FEED_PAGE_CONSTANTS.INITIAL_PAGE,
        FEED_PAGE_CONSTANTS.INITIAL_PAGE_SIZE,
      ] as const;

      const previousData = queryClient.getQueryData<FeedResponse>(queryKey);

      if (!previousData) return;

      queryClient.setQueryData<FeedResponse>(queryKey, (old) => {
        if (!old?.content) return old;
        return {
          ...old,
          content: old.content.map((post) => {
            if (post.feedId !== feedId) return post;
            return {
              ...post,
              isBookmarked,
              bookmarkCount,
            } as typeof post & { isBookmarked: boolean; bookmarkCount: number };
          }),
        };
      });

      try {
        const response = await toggleFeedBookmark(feedId);
        queryClient.setQueryData<FeedResponse>(queryKey, (old) => {
          if (!old?.content) return old;
          return {
            ...old,
            content: old.content.map((post) => {
              if (post.feedId !== feedId) return post;
              return {
                ...post,
                isBookmarked: response.isBookmarked,
                bookmarkCount: response.bookmarkCount,
              } as typeof post & { isBookmarked: boolean; bookmarkCount: number };
            }),
          };
        });
        // 북마크 변경 시 프로필 데이터 갱신
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.all });
      } catch {
        queryClient.setQueryData(queryKey, previousData);
      }
    },
    [queryClient]
  );

  if (!feedResponse?.content || feedResponse.content.length === 0) {
    return (
      <FeedContainer>
        <FeedHeader>
          <FeedHeaderTop>
            <FeedTitle>피드</FeedTitle>
            <HeaderWriteButton onClick={handleWriteClick}>글쓰기</HeaderWriteButton>
          </FeedHeaderTop>
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
        <FeedHeaderTop>
          <FeedTitle>피드</FeedTitle>
          <HeaderWriteButton onClick={handleWriteClick}>글쓰기</HeaderWriteButton>
        </FeedHeaderTop>
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
        <FeedGrid>
          {filteredPosts.map((post: FeedPostType) => (
            <FeedPost
              key={post.feedId}
              post={post}
              onLike={handleLike}
              onBookmark={handleBookmark}
            />
          ))}
        </FeedGrid>
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
