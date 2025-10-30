import { useNavigate } from 'react-router-dom';
import { Heart, MessageSquare, Share } from 'lucide-react';
import { useFeeds } from '@/hooks/useFeeds';
import type { FeedPost } from '@/types/Feed';
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
  LoadingContainer,
  LoadingSpinner,
  ErrorContainer,
  ErrorMessage,
  EmptyState,
} from './StyleFeedPreview.styles';

const StyleFeedPreview = () => {
  const navigate = useNavigate();
  const { feeds, loading, error } = useFeeds(0, 6); // 첫 페이지에서 6개 가져오기

  // 인기순으로 정렬된 피드 6개 추출
  const getPopularFeeds = (): FeedPost[] => {
    return feeds.sort((a, b) => b.likeCount - a.likeCount).slice(0, 6);
  };

  const popularFeeds = getPopularFeeds();

  const handleMoreClick = () => {
    navigate('/feed');
  };

  const handleFeedClick = (feed: FeedPost) => {
    navigate(`/feed/${feed.feedId}`);
  };

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
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
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
                <Avatar src={feed.author.profileImageUrl} alt={feed.author.name} />
                <Username>@{feed.author.name}</Username>
              </UserInfo>
            </PostHeader>

            {feed.imageUrl ? (
              <PostImage src={feed.imageUrl} alt={`Post by ${feed.author.name}`} />
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

            <LikesCount>{feed.likeCount.toLocaleString()}개 좋아요</LikesCount>

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
