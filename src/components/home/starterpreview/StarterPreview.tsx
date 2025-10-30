import { useNavigate } from 'react-router-dom';
import { useStarterPack } from '@/hooks/useStarterPacks';
import type { StarterPack } from '@/types/StarterPack';
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
  LoadingContainer,
  LoadingSpinner,
  ErrorContainer,
  ErrorMessage,
  EmptyState,
} from './StarterPreview.styles';

const StarterPreview = () => {
  const navigate = useNavigate();
  const { starterPack, loading, error } = useStarterPack();

  // 인기순으로 정렬된 스타터팩 3개 추출
  const getPopularStarterPacks = (): StarterPack[] => {
    if (!starterPack || typeof starterPack !== 'object') return [];

    const allPacks: StarterPack[] = Object.values(starterPack).flat();
    return allPacks.sort((a, b) => b.likeCount - a.likeCount).slice(0, 3);
  };

  const popularPacks = getPopularStarterPacks();

  const handleMoreClick = () => {
    navigate('/starterpack');
  };

  const handlePackClick = (pack: StarterPack) => {
    navigate(`/starterpack/${pack.packId}`);
  };

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
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
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
            key={pack.packId}
            onClick={() => handlePackClick(pack)}
            style={{ cursor: 'pointer' }}
          >
            {pack.mainImage ? (
              <img
                src={pack.mainImage}
                alt={pack.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '0.5rem',
                }}
              />
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
