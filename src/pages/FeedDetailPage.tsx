import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';
import FeedMediaSection from '@/components/feed/FeedMediaSection';
import FeedInfoSection from '@/components/feed/FeedInfoSection';
import CommentSection from '@/components/comment/CommentSection';
import type { CreateCommentRequest, CreateReplyRequest } from '@/types/Feed';
import { useFeedDetail } from '@/hooks/useFeedDetail';
import { useCommentActions } from '@/hooks/useFeeds';
import { useUser } from '@/hooks/useAuth';
import { deleteFeed } from '@/api/feedApi';
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
  ActionButtons,
  ActionButton,
  DeleteButton,
} from './FeedDetailPage.styles';

const FeedDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { feed, loading, error, updateFeed, refetch } = useFeedDetail(id);
  const { data: currentUser } = useUser();

  // feedId가 있을 때만 댓글 액션 훅 사용
  const feedId = feed?.feedId;
  const { addComment: addCommentApi } = useCommentActions(feedId || 0);

  // 작성자 확인: 현재 사용자와 피드 작성자 비교
  const isAuthor = currentUser?.userId === feed?.author.userId;

  const handleLike = (isLiked: boolean, likeCount: number) => {
    updateFeed({ isLiked, likeCount });
  };

  const handleBookmark = (isBookmarked: boolean, bookmarkCount: number) => {
    updateFeed({ isBookmarked, bookmarkCount });
  };

  const handleAddComment = async (comment: CreateCommentRequest) => {
    if (feedId === undefined) return;

    try {
      await addCommentApi(comment);
      // 댓글 작성 성공 후 피드 상세 정보 새로고침
      await refetch();
    } catch (error) {
      console.error('Failed to add comment:', error);
      alert('댓글 작성에 실패했습니다.');
    }
  };

  const handleAddReply = async (reply: CreateReplyRequest) => {
    if (feedId === undefined) return;

    try {
      // 답글은 댓글 작성 API에 parentId를 포함하여 호출
      await addCommentApi({
        feedId: reply.feedId,
        content: reply.content,
        parentId: reply.commentId, // commentId를 parentId로 사용
      });
      // 답글 작성 성공 후 피드 상세 정보 새로고침
      await refetch();
    } catch (error) {
      console.error('Failed to add reply:', error);
      alert('답글 작성에 실패했습니다.');
    }
  };

  const handleLikeComment = (commentId: number, isLiked: boolean, likeCount: number) => {
    if (feed && feed.comments) {
      const updatedComments = feed.comments.map((comment) =>
        comment.commentId === commentId ? { ...comment, isLiked, likeCount } : comment
      );
      updateFeed({ comments: updatedComments });
    }
  };

  const handleLikeReply = (replyId: number, isLiked: boolean, likeCount: number) => {
    if (feed && feed.comments) {
      const updatedComments = feed.comments.map((comment) => ({
        ...comment,
        replies:
          comment.replies?.map((reply) => {
            const replyWithId = reply as typeof reply & { replyId?: number };
            return (replyWithId.replyId || reply.commentId) === replyId
              ? { ...reply, isLiked, likeCount }
              : reply;
          }) || [],
      }));
      updateFeed({ comments: updatedComments });
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  // 수정 핸들러
  const handleEdit = () => {
    if (!feedId) return;
    navigate(`/feed-writing?edit=${feedId}`);
  };

  // 삭제 핸들러
  const handleDelete = async () => {
    if (!feedId) return;

    const confirmed = window.confirm(
      '정말로 이 피드를 삭제하시겠습니까?\n삭제된 피드는 복구할 수 없습니다.'
    );
    if (!confirmed) return;

    try {
      await deleteFeed(feedId);
      alert('피드가 삭제되었습니다.');
      navigate('/feed');
    } catch (error) {
      console.error('Failed to delete feed:', error);
      alert('피드 삭제에 실패했습니다.');
    }
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
            {isAuthor && (
              <ActionButtons>
                <ActionButton onClick={handleEdit} type="button" aria-label="수정하기">
                  <Edit size={20} />
                  수정하기
                </ActionButton>
                <DeleteButton onClick={handleDelete} type="button" aria-label="삭제하기">
                  <Trash2 size={20} />
                  삭제하기
                </DeleteButton>
              </ActionButtons>
            )}
          </RightColumn>
        </TopSection>

        <BottomSection>
          <CommentSection
            comments={feed.comments || []}
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
