import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FeedMediaSection from '@/components/feed/FeedMediaSection';
import FeedInfoSection from '@/components/feed/FeedInfoSection';
import CommentSection from '@/components/comment/CommentSection';
import type { FeedDetail, CreateCommentRequest, CreateReplyRequest } from '@/types/Feed';
import { MOCK_FEED_DETAIL } from '@/mocks/feedData';
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
  const [feed, setFeed] = useState<FeedDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFeedDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        setFeed(MOCK_FEED_DETAIL);
      } catch (err) {
        setError('피드 상세 정보를 불러오는데 실패했습니다.');
        console.error('Failed to load feed detail:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadFeedDetail();
    }
  }, [id]);

  const handleLike = (isLiked: boolean, likeCount: number) => {
    if (feed) {
      setFeed((prev) => (prev ? { ...prev, isLiked, likeCount } : null));
    }
  };

  const handleBookmark = (isBookmarked: boolean, bookmarkCount: number) => {
    if (feed) {
      setFeed((prev) => (prev ? { ...prev, isBookmarked, bookmarkCount } : null));
    }
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
      setFeed((prev) => (prev ? { ...prev, comments: updatedComments } : null));
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
      setFeed((prev) => (prev ? { ...prev, comments: updatedComments } : null));
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
