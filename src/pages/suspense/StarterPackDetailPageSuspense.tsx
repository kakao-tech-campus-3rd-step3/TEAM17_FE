import { Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, MessageSquare, Share, Bookmark, Tag } from 'lucide-react';
import defaultAvatar from '@/assets/icon-smile.svg';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchStarterPackById } from '@/api/starterPackApi';
import type { StarterPack } from '@/types/StarterPack';
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
  EmptyStateContainer,
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
    console.log('Like toggled');
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

        <BottomSection>
          <ProductsSection>
            <SectionTitle>포함된 제품들</SectionTitle>
            <ProductsGrid>
              {displayPack.items && displayPack.items.length > 0 ? (
                displayPack.items.map((item) => {
                  const itemKey = `${item.name}-${item.linkUrl}`;
                  return (
                    <ProductCard key={itemKey}>
                      <ProductImage src={item.imageUrl || defaultAvatar} alt={item.name} />
                      <ProductName>{item.name}</ProductName>
                    </ProductCard>
                  );
                })
              ) : (
                <EmptyStateContainer>
                  <p>포함된 제품이 없습니다.</p>
                </EmptyStateContainer>
              )}
            </ProductsGrid>
          </ProductsSection>
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
