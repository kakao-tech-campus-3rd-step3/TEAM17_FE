import { useCallback, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageSquare, Share } from 'lucide-react';
import { useFeeds } from '@/hooks/useFeeds';
import { toggleFeedLike } from '@/api/feedApi';
import { tokens } from '@/styles/tokens';
import type { FeedPost } from '@/types/Feed';
import FeedSkeleton from '@/components/home/feedpreview/FeedSkeleton';
import {
  Wrap,
  Header,
  TitleWrapper,
  Title,
  Emoji,
  Button,
  Grid,
  FeedItem,
  PostHeader,
  UserInfo,
  Avatar,
  Username,
  PostImage,
  ImagePlaceholder,
  PostActions,
  ActionButton,
  LikesCount,
  Caption,
  CategoryTag,
  FeedTypeTag,
  ErrorContainer,
  ErrorMessage,
  EmptyState,
} from '@/components/home/feedpreview/StyleFeedPreview.styles';

const LOAD_MORE_PAGE_SIZE = 6;

const StyleFeedPreview = () => {
  const navigate = useNavigate();
  const [displayedCount, setDisplayedCount] = useState(LOAD_MORE_PAGE_SIZE);
  const [feedLikes, setFeedLikes] = useState<
    Record<number, { isLiked: boolean; likeCount: number }>
  >({});
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // 서버에서 인기순으로 정렬된 피드 가져오기
  const { feeds, loading, error, hasNext } = useFeeds(0, displayedCount, {
    sort: 'likeCount,desc',
  });

  // 피드 데이터가 변경될 때 좋아요 상태 초기화
  useEffect(() => {
    if (feeds.length > 0) {
      setFeedLikes((prev) => {
        const updated = { ...prev };
        feeds.forEach((feed) => {
          if (!updated[feed.feedId]) {
            updated[feed.feedId] = {
              isLiked: feed.isLiked ?? false,
              likeCount: feed.likeCount ?? 0,
            };
          }
        });
        return updated;
      });
    }
  }, [feeds]);

  // 무한 스크롤을 위한 Intersection Observer
  useEffect(() => {
    if (!hasNext || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setDisplayedCount((prev) => prev + LOAD_MORE_PAGE_SIZE);
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
  }, [hasNext, loading]);

  const handleMoreClick = useCallback(() => {
    navigate('/feed');
  }, [navigate]);

  const handleFeedClick = useCallback(
    (feed: FeedPost) => {
      navigate(`/feed/${feed.feedId}`);
    },
    [navigate]
  );

  const handleLikeClick = useCallback(
    async (e: React.MouseEvent, feed: FeedPost) => {
      e.stopPropagation();
      const currentLike = feedLikes[feed.feedId] || {
        isLiked: feed.isLiked ?? false,
        likeCount: feed.likeCount ?? 0,
      };

      // 낙관적 업데이트
      const newIsLiked = !currentLike.isLiked;
      const newLikeCount = newIsLiked
        ? currentLike.likeCount + 1
        : Math.max(0, currentLike.likeCount - 1);

      setFeedLikes((prev) => ({
        ...prev,
        [feed.feedId]: {
          isLiked: newIsLiked,
          likeCount: newLikeCount,
        },
      }));

      try {
        const response = await toggleFeedLike(feed.feedId);
        setFeedLikes((prev) => ({
          ...prev,
          [feed.feedId]: {
            isLiked: response.isLiked,
            likeCount: response.likeCount,
          },
        }));
      } catch (error) {
        // 실패 시 롤백
        setFeedLikes((prev) => ({
          ...prev,
          [feed.feedId]: currentLike,
        }));
        console.error('Failed to toggle like:', error);
      }
    },
    [feedLikes]
  );

  const handleCommentClick = useCallback(
    (e: React.MouseEvent, feed: FeedPost) => {
      e.stopPropagation();
      navigate(`/feed/${feed.feedId}`);
    },
    [navigate]
  );

  const handleShareClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    // 공유 기능 구현 (나중에 추가 가능)
  }, []);

  if (loading) {
    return (
      <Wrap>
        <Header>
          <TitleWrapper>
            <Title>개성 넘치는 피드러들을 보러 오세요!</Title>
            <Emoji>😊</Emoji>
          </TitleWrapper>
          <Button onClick={handleMoreClick}>더보기</Button>
        </Header>
        <Grid>
          {Array.from({ length: 6 }).map((_, index) => (
            <FeedSkeleton key={index} />
          ))}
        </Grid>
      </Wrap>
    );
  }

  if (error) {
    return (
      <Wrap>
        <Header>
          <TitleWrapper>
            <Title>개성 넘치는 피드러들을 보러 오세요!</Title>
            <Emoji>😊</Emoji>
          </TitleWrapper>
          <Button onClick={handleMoreClick}>더보기</Button>
        </Header>
        <ErrorContainer>
          <ErrorMessage>{error}</ErrorMessage>
        </ErrorContainer>
      </Wrap>
    );
  }

  if (!loading && feeds.length === 0) {
    return (
      <Wrap>
        <Header>
          <TitleWrapper>
            <Title>개성 넘치는 피드러들을 보러 오세요!</Title>
            <Emoji>😊</Emoji>
          </TitleWrapper>
          <Button onClick={handleMoreClick}>더보기</Button>
        </Header>
        <EmptyState>인기 피드 정보를 받아오지 못했어요.</EmptyState>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <Header>
        <TitleWrapper>
          <Title>개성 넘치는 피드러들을 보러 오세요!</Title>
          <Emoji>😊</Emoji>
        </TitleWrapper>
        <Button onClick={handleMoreClick}>더보기</Button>
      </Header>

      <Grid>
        {feeds.map((feed) => {
          const likeState = feedLikes[feed.feedId] || {
            isLiked: feed.isLiked ?? false,
            likeCount: feed.likeCount ?? 0,
          };

          return (
            <FeedItem key={feed.feedId} onClick={() => handleFeedClick(feed)}>
              <PostHeader>
                <UserInfo>
                  <Avatar
                    src={feed.author.profileImageUrl}
                    alt={feed.author.name}
                    loading="lazy"
                    decoding="async"
                  />
                  <Username>@{feed.author.name}</Username>
                </UserInfo>
              </PostHeader>

              {feed.imageUrl ? (
                <PostImage
                  src={feed.imageUrl}
                  alt={`Post by ${feed.author.name}`}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <ImagePlaceholder>이미지 없음</ImagePlaceholder>
              )}

              <PostActions>
                <ActionButton
                  type="button"
                  aria-label={likeState.isLiked ? '좋아요 취소' : '좋아요'}
                  onClick={(e) => handleLikeClick(e, feed)}
                >
                  <Heart
                    size={16}
                    fill={likeState.isLiked ? tokens.colors.orange.primary : 'none'}
                    color={tokens.colors.orange.primary}
                  />
                </ActionButton>
                <ActionButton
                  type="button"
                  aria-label="댓글 달기"
                  onClick={(e) => handleCommentClick(e, feed)}
                >
                  <MessageSquare size={16} color={tokens.colors.orange.primary} />
                </ActionButton>
                <ActionButton type="button" aria-label="공유하기" onClick={handleShareClick}>
                  <Share size={16} color={tokens.colors.orange.primary} />
                </ActionButton>
              </PostActions>

              <LikesCount>
                {typeof likeState.likeCount === 'number' && !isNaN(likeState.likeCount)
                  ? likeState.likeCount.toLocaleString()
                  : '0'}
                개 좋아요
              </LikesCount>

              <Caption>
                <Username>@{feed.author.name}</Username> {feed.description}
              </Caption>

              <CategoryTag>#{feed.category.categoryName}</CategoryTag>

              <FeedTypeTag $feedType={feed.feedType}>{feed.feedType}</FeedTypeTag>
            </FeedItem>
          );
        })}
      </Grid>

      {hasNext && <div ref={loadMoreRef} style={{ height: '1px', marginTop: '1rem' }} />}
      {loading && feeds.length > 0 && (
        <Grid>
          {Array.from({ length: 3 }).map((_, index) => (
            <FeedSkeleton key={`loading-${index}`} />
          ))}
        </Grid>
      )}
    </Wrap>
  );
};

export default StyleFeedPreview;
