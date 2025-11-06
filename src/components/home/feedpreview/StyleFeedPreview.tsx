import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageSquare, Share } from 'lucide-react';
import { useFeeds } from '@/hooks/useFeeds';
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

const StyleFeedPreview = () => {
  const navigate = useNavigate();
  // 서버에서 인기순으로 상위 6개를 정렬
  const { feeds, loading, error } = useFeeds(0, 6, { sort: 'likeCount,desc' });

  // 인기순으로 정렬된 피드 6개 추출
  const popularFeeds = feeds as FeedPost[];

  const handleMoreClick = useCallback(() => {
    navigate('/feed');
  }, [navigate]);

  const handleFeedClick = useCallback(
    (feed: FeedPost) => {
      navigate(`/feed/${feed.feedId}`);
    },
    [navigate]
  );

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

  if (popularFeeds.length === 0) {
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
        {popularFeeds.map((feed) => (
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
              <ActionButton type="button" aria-label="좋아요">
                <Heart size={16} fill="#ef4444" color="#ef4444" />
              </ActionButton>
              <ActionButton type="button" aria-label="댓글 달기">
                <MessageSquare size={16} />
              </ActionButton>
              <ActionButton type="button" aria-label="공유하기">
                <Share size={16} />
              </ActionButton>
            </PostActions>

            <LikesCount>{(feed.likeCount ?? 0).toLocaleString()}개 좋아요</LikesCount>

            <Caption>
              <Username>@{feed.author.name}</Username> {feed.description}
            </Caption>

            <CategoryTag>#{feed.category.categoryName}</CategoryTag>

            <FeedTypeTag $feedType={feed.feedType}>{feed.feedType}</FeedTypeTag>
          </FeedItem>
        ))}
      </Grid>
    </Wrap>
  );
};

export default StyleFeedPreview;
