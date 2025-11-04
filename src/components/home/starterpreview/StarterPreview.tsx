import { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStarterPack } from '@/hooks/useStarterPacks';
import type { StarterPack } from '@/types/StarterPack';
import StarterSkeleton from './StarterSkeleton';
import {
  Wrap,
  Header,
  TitleWrapper,
  Title,
  Badge,
  Button,
  Grid,
  GridItem,
  ImagePlaceholder,
  PackImage,
  ErrorContainer,
  ErrorMessage,
  EmptyState,
} from './StarterPreview.styles';

const StarterPreview = () => {
  const navigate = useNavigate();
  const { starterPack, loading, error } = useStarterPack();

  // 인기순으로 정렬된 스타터팩 3개 추출
  const popularPacks = useMemo<StarterPack[]>(() => {
    if (!starterPack || typeof starterPack !== 'object') return [];
    const allPacks: StarterPack[] = (Object.values(starterPack) as StarterPack[][]).flat();
    return [...allPacks].sort((a, b) => b.likeCount - a.likeCount).slice(0, 3);
  }, [starterPack]);

  const handleMoreClick = useCallback(() => {
    navigate('/starterpack');
  }, [navigate]);

  const handlePackClick = useCallback(
    (pack: StarterPack) => {
      navigate(`/starterpack/${pack.id}`);
    },
    [navigate]
  );

  if (loading) {
    return (
      <Wrap>
        <Header>
          <TitleWrapper>
            <Title>BEST 스타터팩</Title>
            <Badge>🚀</Badge>
          </TitleWrapper>
          <Button onClick={handleMoreClick}>더보기</Button>
        </Header>
        <Grid>
          {Array.from({ length: 3 }).map((_, index) => (
            <StarterSkeleton key={index} />
          ))}
        </Grid>
      </Wrap>
    );
  }

  if (error) {
    return (
      <Wrap>
        <Header>
          <TitleWrapper>
            <Title>BEST 스타터팩</Title>
            <Badge>🚀</Badge>
          </TitleWrapper>
          <Button onClick={handleMoreClick}>더보기</Button>
        </Header>
        <ErrorContainer>
          <ErrorMessage>{error}</ErrorMessage>
        </ErrorContainer>
      </Wrap>
    );
  }

  if (popularPacks.length === 0) {
    return (
      <Wrap>
        <Header>
          <TitleWrapper>
            <Title>BEST 스타터팩</Title>
            <Badge>🚀</Badge>
          </TitleWrapper>
          <Button onClick={handleMoreClick}>더보기</Button>
        </Header>
        <EmptyState>인기 스타터팩 정보를 받아오지 못했어요.</EmptyState>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <Header>
        <TitleWrapper>
          <Title>BEST 스타터팩</Title>
          <Badge>🚀</Badge>
        </TitleWrapper>
        <Button onClick={handleMoreClick}>더보기</Button>
      </Header>
      <Grid>
        {popularPacks.map((pack) => (
          <GridItem
            key={pack.id}
            onClick={() => handlePackClick(pack)}
            style={{ cursor: 'pointer' }}
          >
            {pack.mainImageUrl ? (
              <PackImage src={pack.mainImageUrl} alt={pack.name} loading="lazy" decoding="async" />
            ) : (
              <ImagePlaceholder>{pack.name}</ImagePlaceholder>
            )}
          </GridItem>
        ))}
      </Grid>
    </Wrap>
  );
};

export default StarterPreview;
