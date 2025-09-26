import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FeedMediaSection from '@/components/feed/FeedMediaSection';
import FeedInfoSection from '@/components/feed/FeedInfoSection';
import CommentSection from '@/components/comment/CommentSection';
import type { CreateCommentRequest, CreateReplyRequest } from '@/types/Feed';
import { useFeedDetail } from '@/hooks/useFeedDetail';
import {
  FeedDetailPageContainer,
  PageHeader,
  PageTitle,
  BackButton,
  LoadingContainer,
  LoadingSpinner,
  ErrorContainer,
  ErrorMessage,
  ContentContainer,
  TopSection,
  LeftColumn,
  RightColumn,
  BottomSection,
} from './FeedDetailPage.styles';

const FeedDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { feed, loading, error, updateFeed } = useFeedDetail(id);

  const handleLike = (isLiked: boolean, likeCount: number) => {
    updateFeed({ isLiked, likeCount });
  };

  const handleBookmark = (isBookmarked: boolean, bookmarkCount: number) => {
    updateFeed({ isBookmarked, bookmarkCount });
  };

  const handleAddComment = (comment: CreateCommentRequest) => {
    // TODO: API 호출
    console.log('Adding comment:', comment);
  };

  const handleAddReply = (reply: CreateReplyRequest) => {
    // TODO: API 호출
    console.log('Adding reply:', reply);
  };

  const handleLikeComment = (commentId: number, isLiked: boolean, likeCount: number) => {
    if (feed) {
      const updatedComments = feed.comments.map((comment) =>
        comment.commentId === commentId ? { ...comment, isLiked, likeCount } : comment
      );
      updateFeed({ comments: updatedComments });
    }
  };

  const handleLikeReply = (replyId: number, isLiked: boolean, likeCount: number) => {
    if (feed) {
      const updatedComments = feed.comments.map((comment) => ({
        ...comment,
        replies:
          comment.replies?.map((reply) =>
            reply.replyId === replyId ? { ...reply, isLiked, likeCount } : reply
          ) || [],
      }));
      updateFeed({ comments: updatedComments });
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <FeedDetailPageContainer>
        <PageHeader>
          <BackButton onClick={handleBack}>←</BackButton>
          <PageTitle>취미 꾸미기 피드 상세보기</PageTitle>
        </PageHeader>
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      </FeedDetailPageContainer>
    );
  }

  if (error) {
    return (
      <FeedDetailPageContainer>
        <PageHeader>
          <BackButton onClick={handleBack}>←</BackButton>
          <PageTitle>취미 꾸미기 피드 상세보기</PageTitle>
        </PageHeader>
        <ErrorContainer>
          <ErrorMessage>{error}</ErrorMessage>
        </ErrorContainer>
      </FeedDetailPageContainer>
    );
  }

  if (!feed) {
    return (
      <FeedDetailPageContainer>
        <PageHeader>
          <BackButton onClick={handleBack}>←</BackButton>
          <PageTitle>취미 꾸미기 피드 상세보기</PageTitle>
        </PageHeader>
        <ErrorContainer>
          <ErrorMessage>피드를 찾을 수 없습니다.</ErrorMessage>
        </ErrorContainer>
      </FeedDetailPageContainer>
    );
  }

  return (
    <FeedDetailPageContainer>
      <PageHeader>
        <BackButton onClick={handleBack}>←</BackButton>
        <PageTitle>취미 꾸미기 피드 상세보기</PageTitle>
      </PageHeader>

      <ContentContainer>
        <TopSection>
          <LeftColumn>
            <FeedMediaSection feed={feed} onLike={handleLike} onBookmark={handleBookmark} />
          </LeftColumn>

          <RightColumn>
            <FeedInfoSection feed={feed} />
          </RightColumn>
        </TopSection>

        <BottomSection>
          <CommentSection
            comments={feed.comments}
            feedId={feed.feedId}
            onAddComment={handleAddComment}
            onAddReply={handleAddReply}
            onLikeComment={handleLikeComment}
            onLikeReply={handleLikeReply}
          />
        </BottomSection>
      </ContentContainer>
    </FeedDetailPageContainer>
  );
};

export default FeedDetailPage;
