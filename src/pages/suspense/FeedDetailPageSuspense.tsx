import { Suspense, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import FeedMediaSection from '@/components/feed/FeedMediaSection';
import FeedInfoSection from '@/components/feed/FeedInfoSection';
import CommentSection from '@/components/comment/CommentSection';
import { useSuspenseQuery } from '@/hooks/useSuspenseQuery';
import { useCommentActions } from '@/hooks/useFeeds';
import { fetchFeedById } from '@/api/feedApi';
import type { FeedDetail, CreateCommentRequest, CreateReplyRequest } from '@/types/Feed';
import SuspenseFallback from '@/components/common/SuspenseFallback';
import ErrorBoundaryWithRecovery from '@/components/common/ErrorBoundaryWithRecovery';
import { QUERY_KEYS } from '@/utils/queryKeys';
import {
  FeedDetailPageContainer,
  PageHeader,
  PageTitle,
  BackButton,
  ContentContainer,
  TopSection,
  LeftColumn,
  RightColumn,
  BottomSection,
} from '../FeedDetailPage.styles';

const FeedDetailData = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const feedId = id ? parseInt(id, 10) : 0;

  const { data: feed } = useSuspenseQuery<FeedDetail>(
    QUERY_KEYS.feeds.detail(feedId),
    () => fetchFeedById(feedId),
    {
      staleTime: 5 * 60 * 1000,
    }
  ) as { data: FeedDetail };

  const { addComment, addReply } = useCommentActions(feedId);

  const [localFeed, setLocalFeed] = useState<FeedDetail>(feed);

  useEffect(() => {
    setLocalFeed(feed);
  }, [feed]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleLike = (isLiked: boolean, likeCount: number) => {
    setLocalFeed((prev) => ({ ...prev, isLiked, likeCount }));

    queryClient.setQueryData(QUERY_KEYS.feeds.detail(feedId), (old: FeedDetail | undefined) => {
      if (!old) return old;
      return { ...old, isLiked, likeCount };
    });
  };

  const handleBookmark = (isBookmarked: boolean, bookmarkCount: number) => {
    setLocalFeed((prev) => ({ ...prev, isBookmarked, bookmarkCount }));

    queryClient.setQueryData(QUERY_KEYS.feeds.detail(feedId), (old: FeedDetail | undefined) => {
      if (!old) return old;
      return { ...old, isBookmarked, bookmarkCount };
    });
  };

  const handleAddComment = async (comment: CreateCommentRequest) => {
    try {
      await addComment(comment);
      alert('댓글이 추가되었습니다!');
    } catch (error) {
      console.error('댓글 작성 실패:', error);
      alert('댓글 작성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleAddReply = async (reply: CreateReplyRequest) => {
    try {
      await addReply(reply);
      alert('답글이 추가되었습니다!');
    } catch (error) {
      console.error('답글 작성 실패:', error);
      alert('답글 작성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleLikeComment = (commentId: number, isLiked: boolean, likeCount: number) => {
    setLocalFeed((prev) => ({
      ...prev,
      comments: prev.comments.map((comment) =>
        comment.commentId === commentId ? { ...comment, isLiked, likeCount } : comment
      ),
    }));
  };

  const handleLikeReply = (replyId: number, isLiked: boolean, likeCount: number) => {
    setLocalFeed((prev) => ({
      ...prev,
      comments: prev.comments.map((comment) => ({
        ...comment,
        replies:
          comment.replies?.map((reply) => {
            const replyWithId = reply as typeof reply & { replyId?: number };
            return (replyWithId.replyId || reply.commentId) === replyId
              ? { ...reply, isLiked, likeCount }
              : reply;
          }) || [],
      })),
    }));
  };

  if (!localFeed) {
    return (
      <FeedDetailPageContainer>
        <PageHeader>
          <BackButton onClick={handleBack}>←</BackButton>
          <PageTitle>취미 꾸미기 피드 상세보기</PageTitle>
        </PageHeader>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <p>피드를 찾을 수 없습니다.</p>
        </div>
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
            <FeedMediaSection feed={localFeed} onLike={handleLike} onBookmark={handleBookmark} />
          </LeftColumn>

          <RightColumn>
            <FeedInfoSection feed={localFeed} />
          </RightColumn>
        </TopSection>

        <BottomSection>
          <CommentSection
            comments={localFeed.comments}
            feedId={localFeed.feedId}
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

const FeedDetailPageSuspense = () => {
  return (
    <ErrorBoundaryWithRecovery>
      <Suspense fallback={<SuspenseFallback message="피드 상세를 불러오는 중..." />}>
        <FeedDetailData />
      </Suspense>
    </ErrorBoundaryWithRecovery>
  );
};

export default FeedDetailPageSuspense;
