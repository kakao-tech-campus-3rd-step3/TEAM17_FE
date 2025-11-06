import React, { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, MessageSquare, Share, Bookmark, Tag, Clock, Edit, Trash2 } from 'lucide-react';
import defaultProfile from '@/assets/defaultProfile.png';
import {
  useStarterPackById,
  useStarterPackLike,
  usePackComments,
  usePackCommentActions,
  useStarterPackActions,
} from '@/hooks/useStarterPacks';
import { useUser } from '@/hooks/useAuth';
import CommentSection from '@/components/comment/CommentSection';
import type { Comment, CreateCommentRequest, CreateReplyRequest } from '@/types/Feed';
import type { StarterPack } from '@/types/StarterPack';
import {
  StarterPackDetailPageContainer,
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
  MediaSection,
  MediaImage,
  InfoSection,
  StarterPackHeader,
  UserInfo,
  Avatar,
  Username,
  StarterPackTitle,
  StarterPackDescription,
  CategoryTag,
  StatsSection,
  StatItem,
  ActionButtons,
  ActionButton,
  ActionButtonRight,
  DeleteButton,
  ProductsSection,
  SectionTitle,
  ProductsGrid,
  ProductCard,
  ProductImage,
  ProductName,
  TimeStamp,
} from '@/pages/StarterPackDetailPage.styles';

const StarterPackDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const packId = id ? parseInt(id, 10) : 0;

  const { starterPack, loading, error } = useStarterPackById(packId);
  const { toggleLike } = useStarterPackLike(packId);
  const { comments, refresh: refreshComments } = usePackComments(packId);
  const { addComment: addCommentApi } = usePackCommentActions(packId);
  const { remove: deletePack, loading: isActionLoading } = useStarterPackActions();
  const { data: currentUser } = useUser();
  const [localComments, setLocalComments] = useState<Comment[]>([]);

  // 작성자 확인: 현재 사용자와 스타터팩 작성자 비교
  const isAuthor = currentUser?.userId === starterPack?.memberId;

  // 댓글 상태 동기화
  useEffect(() => {
    setLocalComments(comments);
  }, [comments]);

  // 수정 핸들러
  const handleEdit = () => {
    navigate(`/pack-writing?edit=${packId}`);
  };

  // 삭제 핸들러
  const handleDelete = async () => {
    if (!packId) return;

    const confirmed = window.confirm(
      '정말로 이 스타터팩을 삭제하시겠습니까?\n삭제된 스타터팩은 복구할 수 없습니다.'
    );
    if (!confirmed) return;

    try {
      await deletePack(packId);
      alert('스타터팩이 삭제되었습니다.');
      navigate('/starterpack');
    } catch (error) {
      console.error('Failed to delete pack:', error);
      alert('스타터팩 삭제에 실패했습니다.');
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleLike = () => {
    toggleLike();
  };

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

  // 로딩 상태 처리
  if (loading) {
    return (
      <StarterPackDetailPageContainer>
        <PageHeader>
          <BackButton onClick={handleBack}>←</BackButton>
          <PageTitle>스타터팩 상세보기</PageTitle>
        </PageHeader>
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      </StarterPackDetailPageContainer>
    );
  }

  // 에러 상태 처리
  if (error || !starterPack) {
    return (
      <StarterPackDetailPageContainer>
        <PageHeader>
          <BackButton onClick={handleBack}>←</BackButton>
          <PageTitle>스타터팩 상세보기</PageTitle>
        </PageHeader>
        <ErrorContainer>
          <ErrorMessage>{error || '스타터팩을 찾을 수 없습니다.'}</ErrorMessage>
        </ErrorContainer>
      </StarterPackDetailPageContainer>
    );
  }

  // 현재 좋아요 상태
  const packWithLike = starterPack as StarterPack & { isLiked?: boolean };
  const isLiked = packWithLike?.isLiked ?? false;

  return (
    <StarterPackDetailPageContainer>
      <PageHeader>
        <BackButton onClick={handleBack}>←</BackButton>
        <PageTitle>스타터팩 상세보기</PageTitle>
      </PageHeader>

      <ContentContainer>
        <TopSection>
          <LeftColumn>
            <MediaSection>
              <MediaImage src={starterPack?.mainImageUrl} alt={starterPack?.name} />
            </MediaSection>
          </LeftColumn>

          <RightColumn>
            <InfoSection>
              <StarterPackHeader>
                <UserInfo>
                  <Avatar
                    src={starterPack?.authorProfileImageUrl || defaultProfile}
                    alt={starterPack?.authorNickname || '작성자'}
                  />
                  <Username>@{starterPack?.authorNickname}</Username>
                </UserInfo>
              </StarterPackHeader>

              <StarterPackTitle>{starterPack?.name}</StarterPackTitle>

              <StarterPackDescription>{starterPack?.description}</StarterPackDescription>

              <CategoryTag>
                <Tag size={14} />
                {starterPack?.categoryName}
              </CategoryTag>

              <StatsSection>
                <StatItem>
                  <Heart size={16} />
                  {(starterPack?.likeCount ?? 0).toLocaleString()}개 좋아요
                </StatItem>
              </StatsSection>

              <ActionButtons>
                <ActionButton
                  onClick={handleLike}
                  type="button"
                  aria-label={isLiked ? '좋아요 취소' : '좋아요'}
                  aria-pressed={isLiked}
                >
                  <Heart
                    size={24}
                    fill={isLiked ? '#ef4444' : 'none'}
                    color={isLiked ? '#ef4444' : '#000'}
                  />
                </ActionButton>
                <ActionButton type="button" aria-label="댓글 달기">
                  <MessageSquare size={24} />
                </ActionButton>
                <ActionButton type="button" aria-label="공유하기">
                  <Share size={24} />
                </ActionButton>
                <ActionButtonRight type="button" aria-label="저장">
                  <Bookmark size={24} />
                </ActionButtonRight>
              </ActionButtons>

              {isAuthor && (
                <ActionButtons>
                  <ActionButton
                    onClick={handleEdit}
                    disabled={isActionLoading}
                    type="button"
                    aria-label="수정하기"
                  >
                    <Edit size={20} />
                    수정하기
                  </ActionButton>
                  <DeleteButton
                    onClick={handleDelete}
                    disabled={isActionLoading}
                    type="button"
                    aria-label="삭제하기"
                  >
                    <Trash2 size={20} />
                    삭제하기
                  </DeleteButton>
                </ActionButtons>
              )}

              <TimeStamp>
                <Clock size={12} />
                어제
              </TimeStamp>
            </InfoSection>
          </RightColumn>
        </TopSection>

        {starterPack?.items && starterPack.items.length > 0 && (
          <BottomSection>
            <ProductsSection>
              <SectionTitle>포함 상품</SectionTitle>
              <ProductsGrid>
                {starterPack.items.map((item, index) => (
                  <ProductCard key={index}>
                    <ProductImage src={item.imageUrl} alt={item.name} />
                    <ProductName>{item.name}</ProductName>
                  </ProductCard>
                ))}
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

export default StarterPackDetailPage;
