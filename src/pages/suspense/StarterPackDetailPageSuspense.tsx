import { Suspense, useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, MessageSquare, Share, Bookmark, Tag } from 'lucide-react';
import defaultAvatar from '@/assets/icon-smile.svg';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchStarterPackById } from '@/api/starterPackApi';
import type { StarterPack } from '@/types/StarterPack';
import type { Comment, CreateCommentRequest, CreateReplyRequest } from '@/types/Feed';
import CommentSection from '@/components/comment/CommentSection';
import {
  usePackComments,
  usePackCommentActions,
  useStarterPackLike,
} from '@/hooks/useStarterPacks';
import SuspenseFallback from '@/components/common/SuspenseFallback';
import ErrorBoundaryWithRecovery from '@/components/common/ErrorBoundaryWithRecovery';
import {
  StarterPackDetailPageContainer,
  PageHeader,
  PageTitle,
  BackButton,
  ContentContainer,
  TopSection,
  LeftColumn,
  RightColumn,
  BottomSection,
  MediaSection,
  MediaImage,
  InfoSection,
  StarterPackHeader,
  StarterPackTitle,
  StarterPackDescription,
  CategoryTag,
  StatsSection,
  StatItem,
  ActionButtons,
  ActionButton,
  ProductsSection,
  SectionTitle,
  ProductsGrid,
  ProductCard,
  ProductImage,
  ProductName,
  ErrorStateContainer,
} from '../StarterPackDetailPage.styles';

const StarterPackDetailData = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const packId = Number(id);
  if (!id || isNaN(packId)) {
    throw new Error('유효하지 않은 스타터팩 ID입니다.');
  }

  const { data: displayPack } = useSuspenseQuery<StarterPack>({
    queryKey: ['starterPack', packId],
    queryFn: () => fetchStarterPackById(packId),
    staleTime: 5 * 60 * 1000,
  });

  const { comments, refresh: refreshComments } = usePackComments(packId);
  const { addComment: addCommentApi } = usePackCommentActions(packId);
  const { toggleLike } = useStarterPackLike(packId);
  const [localComments, setLocalComments] = useState<Comment[]>([]);

  useEffect(() => {
    setLocalComments(comments);
  }, [comments]);

  const handleLikeComment = useCallback(
    (commentId: number, isLiked: boolean, likeCount: number) => {
      setLocalComments((prev) =>
        prev.map((comment) =>
          comment.commentId === commentId ? { ...comment, isLiked, likeCount } : comment
        )
      );
    },
    []
  );

  const handleLikeReply = useCallback((replyId: number, isLiked: boolean, likeCount: number) => {
    setLocalComments((prev) =>
      prev.map((comment) => ({
        ...comment,
        replies:
          comment.replies?.map((reply) => {
            const replyWithId = reply as typeof reply & { replyId?: number };
            return (replyWithId.replyId || reply.commentId) === replyId
              ? { ...reply, isLiked, likeCount }
              : reply;
          }) || [],
      }))
    );
  }, []);

  const handleAddComment = async (comment: CreateCommentRequest) => {
    if (!packId) return;

    try {
      await addCommentApi(comment.content, comment.parentId);
      await refreshComments();
    } catch (error) {
      console.error('Failed to add comment:', error);
      alert('댓글 작성에 실패했습니다.');
    }
  };

  const handleAddReply = async (reply: CreateReplyRequest) => {
    if (!packId) return;

    try {
      // 답글은 parentId를 포함하여 댓글 작성
      await addCommentApi(reply.content, reply.commentId);
      await refreshComments();
    } catch (error) {
      console.error('Failed to add reply:', error);
      alert('답글 작성에 실패했습니다.');
    }
  };

  if (!displayPack) {
    return (
      <StarterPackDetailPageContainer>
        <PageHeader>
          <BackButton onClick={() => navigate(-1)}>← 뒤로</BackButton>
          <PageTitle>스타터팩 상세</PageTitle>
        </PageHeader>
        <ErrorStateContainer>
          <p>스타터팩을 찾을 수 없습니다.</p>
        </ErrorStateContainer>
      </StarterPackDetailPageContainer>
    );
  }

  const handleBack = () => {
    navigate(-1);
  };

  const handleLike = () => {
    toggleLike();
  };

  const handleShare = () => {
    console.log('Share clicked');
  };

  const handleBookmark = () => {
    console.log('Bookmark toggled');
  };

  return (
    <StarterPackDetailPageContainer>
      <PageHeader>
        <BackButton onClick={handleBack}>← 뒤로</BackButton>
        <PageTitle>스타터팩 상세</PageTitle>
      </PageHeader>

      <ContentContainer>
        <TopSection>
          <LeftColumn>
            <MediaSection>
              <MediaImage
                src={displayPack.mainImageUrl || defaultAvatar}
                alt={displayPack.name || '스타터팩'}
              />
            </MediaSection>
          </LeftColumn>
          <RightColumn>
            <InfoSection>
              <StarterPackHeader>
                <StarterPackTitle>{displayPack.name}</StarterPackTitle>
              </StarterPackHeader>
              <StarterPackDescription>{displayPack.description}</StarterPackDescription>

              <CategoryTag>
                <Tag size={16} />
                {displayPack.categoryName}
              </CategoryTag>

              <StatsSection>
                <StatItem>
                  <Heart size={16} />
                  {displayPack.likeCount}개
                </StatItem>
                <StatItem>
                  <MessageSquare size={16} />
                  {displayPack.commentCount || 0}개
                </StatItem>
                <StatItem>
                  <Bookmark size={16} />
                  {displayPack.bookmarkCount || 0}개
                </StatItem>
              </StatsSection>

              <ActionButtons>
                <ActionButton onClick={handleLike}>
                  <Heart size={20} />
                  좋아요
                </ActionButton>
                <ActionButton onClick={handleShare}>
                  <Share size={20} />
                  공유
                </ActionButton>
                <ActionButton onClick={handleBookmark}>
                  <Bookmark size={20} />
                  북마크
                </ActionButton>
              </ActionButtons>
            </InfoSection>
          </RightColumn>
        </TopSection>

        {displayPack.items && displayPack.items.length > 0 && (
          <BottomSection>
            <ProductsSection>
              <SectionTitle>포함된 제품들</SectionTitle>
              <ProductsGrid>
                {displayPack.items.map((item) => {
                  const itemKey = `${item.name}-${item.linkUrl}`;
                  return (
                    <ProductCard key={itemKey}>
                      <ProductImage src={item.imageUrl || defaultAvatar} alt={item.name} />
                      <ProductName>{item.name}</ProductName>
                    </ProductCard>
                  );
                })}
              </ProductsGrid>
            </ProductsSection>
          </BottomSection>
        )}

        <BottomSection>
          <CommentSection
            comments={localComments}
            feedId={packId}
            onAddComment={handleAddComment}
            onAddReply={handleAddReply}
            onLikeComment={handleLikeComment}
            onLikeReply={handleLikeReply}
          />
        </BottomSection>
      </ContentContainer>
    </StarterPackDetailPageContainer>
  );
};

const StarterPackDetailPageSuspense = () => {
  return (
    <ErrorBoundaryWithRecovery>
      <Suspense fallback={<SuspenseFallback message="스타터팩 상세를 불러오는 중..." />}>
        <StarterPackDetailData />
      </Suspense>
    </ErrorBoundaryWithRecovery>
  );
};

export default StarterPackDetailPageSuspense;
