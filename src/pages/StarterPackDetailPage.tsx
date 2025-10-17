import React from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Heart, MessageSquare, Share, MoreHorizontal, Bookmark, Tag, Clock } from 'lucide-react';
import defaultAvatar from '@/assets/icon-smile.svg';
import { useStarterPackById, useStarterPackLike } from '@/hooks/useStarterPacks';
import { mockStartPacks } from '@/mocks/mock';
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
  MoreButton,
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
  TimeStamp,
} from './StarterPackDetailPage.styles';

const StarterPackDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const packId = id ? parseInt(id, 10) : 0;

  // 데모 확인 (URL에 ?demo=true가 있을 때만)
  const isDemoMode = searchParams.get('demo') === 'true';

  const { starterPack, loading, error } = useStarterPackById(packId);
  const { toggleLike } = useStarterPackLike(packId);

  // 데모 모드일 때만 Mock 데이터 사용
  const mockPack = isDemoMode ? mockStartPacks.find((pack) => pack.packId === packId) : null;
  const displayPack = starterPack || mockPack;

  const handleBack = () => {
    navigate(-1);
  };

  const handleLike = () => {
    toggleLike();
  };

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

  // 에러 상태 처리 (데모 모드가 아닐 때만 에러 표시)
  if (!isDemoMode && (error || !starterPack)) {
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

  if (!displayPack) {
    return (
      <StarterPackDetailPageContainer>
        <PageHeader>
          <BackButton onClick={handleBack}>←</BackButton>
          <PageTitle>스타터팩 상세보기</PageTitle>
        </PageHeader>
        <ErrorContainer>
          <ErrorMessage>스타터팩을 찾을 수 없습니다.</ErrorMessage>
        </ErrorContainer>
      </StarterPackDetailPageContainer>
    );
  }

  // 데모 모드가 아니고 데이터가 없는 경우
  if (!isDemoMode && !starterPack) {
    return (
      <StarterPackDetailPageContainer>
        <PageHeader>
          <BackButton onClick={handleBack}>←</BackButton>
          <PageTitle>스타터팩 상세보기</PageTitle>
        </PageHeader>
        <ErrorContainer>
          <ErrorMessage>스타터팩을 찾을 수 없습니다.</ErrorMessage>
        </ErrorContainer>
      </StarterPackDetailPageContainer>
    );
  }

  // 데모 모드이지만 Mock 데이터도 없는 경우
  if (isDemoMode && !displayPack) {
    return (
      <StarterPackDetailPageContainer>
        <PageHeader>
          <BackButton onClick={handleBack}>←</BackButton>
          <PageTitle>스타터팩 상세보기</PageTitle>
        </PageHeader>
        <ErrorContainer>
          <ErrorMessage>데모용 스타터팩을 찾을 수 없습니다.</ErrorMessage>
        </ErrorContainer>
      </StarterPackDetailPageContainer>
    );
  }

  // 현재 좋아요 상태
  const packWithLike = displayPack as StarterPack & { isLiked?: boolean };
  const isLiked = packWithLike?.isLiked ?? false;

  return (
    <StarterPackDetailPageContainer>
      <PageHeader>
        <BackButton onClick={handleBack}>←</BackButton>
        <PageTitle>스타터팩 상세보기</PageTitle>
      </PageHeader>

      {isDemoMode && (
        <div
          style={{
            textAlign: 'center',
            padding: '0.5rem',
            backgroundColor: '#fef3c7',
            color: '#92400e',
            fontSize: '0.875rem',
            borderBottom: '1px solid #f3e8ff',
          }}
        >
          📝 데모 모드
        </div>
      )}

      <ContentContainer>
        <TopSection>
          <LeftColumn>
            <MediaSection>
              <MediaImage src={displayPack?.mainImage} alt={displayPack?.name} />
            </MediaSection>
          </LeftColumn>

          <RightColumn>
            <InfoSection>
              <StarterPackHeader>
                <UserInfo>
                  <Avatar src={defaultAvatar} alt="스타터팩" />
                  <Username>@{displayPack?.categoryName}_master</Username>
                </UserInfo>
                <MoreButton>
                  <MoreHorizontal size={20} />
                </MoreButton>
              </StarterPackHeader>

              <StarterPackTitle>{displayPack?.name}</StarterPackTitle>

              <StarterPackDescription>{displayPack?.description}</StarterPackDescription>

              <CategoryTag>
                <Tag size={14} />
                {displayPack?.categoryName}
              </CategoryTag>

              <StatsSection>
                <StatItem>
                  <Heart size={16} />
                  {displayPack?.likeCount.toLocaleString()}개 좋아요
                </StatItem>
              </StatsSection>

              <ActionButtons>
                <ActionButton
                  onClick={handleLike}
                  disabled={isDemoMode}
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
                <ActionButton type="button" aria-label="저장" style={{ marginLeft: 'auto' }}>
                  <Bookmark size={24} />
                </ActionButton>
              </ActionButtons>

              <TimeStamp>
                <Clock size={12} />
                어제
              </TimeStamp>
            </InfoSection>
          </RightColumn>
        </TopSection>

        {displayPack?.products && displayPack.products.length > 0 && (
          <BottomSection>
            <ProductsSection>
              <SectionTitle>포함 상품</SectionTitle>
              <ProductsGrid>
                {displayPack.products.map((product) => (
                  <ProductCard key={product.id}>
                    <ProductImage src={product.src} alt={product.name} />
                    <ProductName>{product.name}</ProductName>
                  </ProductCard>
                ))}
              </ProductsGrid>
            </ProductsSection>
          </BottomSection>
        )}
      </ContentContainer>
    </StarterPackDetailPageContainer>
  );
};

export default StarterPackDetailPage;
