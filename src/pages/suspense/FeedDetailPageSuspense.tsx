import { Suspense, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Edit, Trash2 } from 'lucide-react';
import FeedMediaSection from '@/components/feed/FeedMediaSection';
import FeedInfoSection from '@/components/feed/FeedInfoSection';
import CommentSection from '@/components/comment/CommentSection';
import FeedLikersModal from '@/components/feed/FeedLikersModal';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useCommentActions, useFeedBookmark, useFeedLike } from '@/hooks/useFeeds';
import { fetchFeedById, deleteFeed, fetchComments } from '@/api/feedApi';
import { useUser, useAuth } from '@/hooks/useAuth';
import type {
  FeedDetail,
  CreateCommentRequest,
  CreateReplyRequest,
  CommentResponse,
} from '@/types/Feed';
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
  ActionButtons,
  ActionButton,
  DeleteButton,
} from '@/pages/FeedDetailPage.styles';

const FeedDetailData = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: currentUser } = useUser();

  const feedId = Number(id);
  if (!id || isNaN(feedId)) {
    throw new Error('유효하지 않은 피드 ID입니다.');
  }

  const { data: feed } = useSuspenseQuery<FeedDetail>({
    queryKey: QUERY_KEYS.feeds.detail(feedId),
    queryFn: () => fetchFeedById(feedId),
    staleTime: 5 * 60 * 1000,
  });

  const { data: commentsResponse } = useSuspenseQuery<CommentResponse>({
    queryKey: QUERY_KEYS.feeds.comments(feedId),
    queryFn: () => fetchComments(feedId),
    staleTime: 60 * 1000,
  });

  const initialComments = commentsResponse?.content ?? [];

  const { addComment } = useCommentActions(feedId);
  const { toggleBookmark } = useFeedBookmark(feedId);
  const { toggleLike } = useFeedLike(feedId);
  const { isLogin } = useAuth();

  // 작성자 확인: 현재 사용자와 피드 작성자 비교
  const isAuthor = currentUser?.userId === feed?.author.userId;

  const [localFeed, setLocalFeed] = useState<FeedDetail>({
    ...feed,
    comments: initialComments,
  });
  const [isLikersModalOpen, setIsLikersModalOpen] = useState(false);

  useEffect(() => {
    if (feed) {
      setLocalFeed({
        ...feed,
        comments: commentsResponse?.content ?? [],
      });
    }
  }, [feed, commentsResponse]);

  const handleBack = () => {
    navigate(-1);
  };

  // 수정 핸들러
  const handleEdit = () => {
    navigate(`/feed-writing?edit=${feedId}`);
  };

  // 삭제 핸들러
  const handleDelete = async () => {
    const confirmed = window.confirm(
      '정말로 이 피드를 삭제하시겠습니까?\n삭제된 피드는 복구할 수 없습니다.'
    );
    if (!confirmed) return;

    try {
      await deleteFeed(feedId);
      queryClient.removeQueries({ queryKey: QUERY_KEYS.feeds.detail(feedId) });
      queryClient.invalidateQueries({ queryKey: ['feeds'] });
      alert('피드가 삭제되었습니다.');
      navigate('/feed');
    } catch (error) {
      console.error('Failed to delete feed:', error);
      alert('피드 삭제에 실패했습니다.');
    }
  };

  const handleLike = () => {
    if (!localFeed) return;
    if (!isLogin) {
      alert('로그인이 필요한 기능입니다.');
      navigate('/login');
      return;
    }

    const newIsLiked = !localFeed.isLiked;
    const newLikeCount = newIsLiked
      ? (localFeed.likeCount ?? 0) + 1
      : Math.max(0, (localFeed.likeCount ?? 0) - 1);

    setLocalFeed((prev) =>
      prev ? { ...prev, isLiked: newIsLiked, likeCount: newLikeCount } : prev
    );

    queryClient.setQueryData(QUERY_KEYS.feeds.detail(feedId), (old: FeedDetail | undefined) => {
      if (!old) return old;
      return { ...old, isLiked: newIsLiked, likeCount: newLikeCount };
    });

    toggleLike();
  };

  const handleShare = () => {
    if (!localFeed) return;

    const shareData = {
      title: '피드 공유',
      text: localFeed.description || '',
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData).catch((shareError) => {
        console.error('공유 실패:', shareError);
      });
      return;
    }

    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          alert('링크가 클립보드에 복사되었습니다.');
        })
        .catch((clipboardError) => {
          console.error('클립보드 복사 실패:', clipboardError);
          alert('공유 기능을 사용할 수 없습니다.');
        });
      return;
    }

    alert('이 브라우저에서는 공유 기능을 지원하지 않습니다.');
  };

  const handleBookmark = () => {
    if (!localFeed) return;
    if (!isLogin) {
      alert('로그인이 필요한 기능입니다.');
      navigate('/login');
      return;
    }

    const newIsBookmarked = !localFeed.isBookmarked;
    const newBookmarkCount = newIsBookmarked
      ? (localFeed.bookmarkCount ?? 0) + 1
      : Math.max(0, (localFeed.bookmarkCount ?? 0) - 1);

    setLocalFeed((prev) =>
      prev ? { ...prev, isBookmarked: newIsBookmarked, bookmarkCount: newBookmarkCount } : prev
    );

    queryClient.setQueryData(QUERY_KEYS.feeds.detail(feedId), (old: FeedDetail | undefined) => {
      if (!old) return old;
      return { ...old, isBookmarked: newIsBookmarked, bookmarkCount: newBookmarkCount };
    });

    toggleBookmark();
  };

  const handleAddComment = async (comment: CreateCommentRequest) => {
    try {
      await addComment(comment);
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.feeds.comments(feedId) });
      alert('댓글이 추가되었습니다!');
    } catch (error) {
      console.error('댓글 작성 실패:', error);
      alert('댓글 작성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleAddReply = async (reply: CreateReplyRequest) => {
    try {
      await addComment({
        feedId: reply.feedId,
        content: reply.content,
        parentId: reply.commentId,
      });
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.feeds.comments(feedId) });
      alert('답글이 추가되었습니다!');
    } catch (error) {
      console.error('답글 작성 실패:', error);
      alert('답글 작성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleLikeComment = (commentId: number, isLiked: boolean, likeCount: number) => {
    setLocalFeed((prev) => ({
      ...prev,
      comments: (prev.comments || []).map((comment) =>
        comment.commentId === commentId ? { ...comment, isLiked, likeCount } : comment
      ),
    }));
  };

  const handleLikeReply = (replyId: number, isLiked: boolean, likeCount: number) => {
    setLocalFeed((prev) => ({
      ...prev,
      comments: (prev.comments || []).map((comment) => ({
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
            <FeedMediaSection feed={localFeed} />
          </LeftColumn>

          <RightColumn>
            <FeedInfoSection
              feed={localFeed}
              onLike={handleLike}
              onShare={handleShare}
              onBookmark={handleBookmark}
              onOpenLikers={() => setIsLikersModalOpen(true)}
            />
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
            comments={localFeed.comments || []}
            feedId={localFeed.feedId}
            onAddComment={handleAddComment}
            onAddReply={handleAddReply}
            onLikeComment={handleLikeComment}
            onLikeReply={handleLikeReply}
          />
        </BottomSection>
      </ContentContainer>

      <FeedLikersModal
        feedId={feedId}
        isOpen={isLikersModalOpen}
        onClose={() => setIsLikersModalOpen(false)}
      />
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
