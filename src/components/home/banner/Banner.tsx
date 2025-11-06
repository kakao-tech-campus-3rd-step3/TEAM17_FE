import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  CarouselContainer,
  CarouselWrapper,
  Card,
  Overlay,
  BottomLeft,
  TopRight,
  Kicker,
  Title,
  BannerBadge,
  NavigationButton,
  Indicator,
} from '@/components/home/banner/Banner.styles';

type BannerItem = {
  id: number;
  kicker: string;
  title: string;
  badge: string;
  variant: 'left' | 'right';
  alpha: number;
  imageUrl?: string;
};

const LEFT_BANNER_ITEMS: BannerItem[] = [
  {
    id: 1,
    kicker: '캠핑장',
    title: '나의 감성 듬뿍 담은, 텐트 꾸미기!',
    badge: '리뷰',
    variant: 'left',
    alpha: 0.3,
    imageUrl: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&h=400&fit=crop',
  },
  {
    id: 2,
    kicker: '요리',
    title: '집에서 만드는 수제 파스타!',
    badge: '팁',
    variant: 'left',
    alpha: 0.3,
    imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&h=400&fit=crop',
  },
  {
    id: 3,
    kicker: '독서',
    title: '이번 주 베스트셀러 읽기',
    badge: '리뷰',
    variant: 'left',
    alpha: 0.3,
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=400&fit=crop',
  },
  {
    id: 4,
    kicker: '운동',
    title: '홈트레이닝으로 건강하게!',
    badge: '정보공유',
    variant: 'left',
    alpha: 0.3,
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
  },
];

const RIGHT_BANNER_ITEMS: BannerItem[] = [
  {
    id: 1,
    kicker: '젊음의 바다',
    title: '취미 서핑하러 양양 가기!',
    badge: '정보공유',
    variant: 'right',
    alpha: 0.2,
    imageUrl: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&h=400&fit=crop',
  },
  {
    id: 2,
    kicker: '여행',
    title: '제주도 한 달 살기 도전',
    badge: '리뷰',
    variant: 'right',
    alpha: 0.2,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=400&fit=crop',
  },
  {
    id: 3,
    kicker: '사진',
    title: '인스타 감성 사진 찍기',
    badge: '팁',
    variant: 'right',
    alpha: 0.2,
    imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=400&fit=crop',
  },
  {
    id: 4,
    kicker: '게임',
    title: '친구들과 온라인 게임',
    badge: '정보공유',
    variant: 'right',
    alpha: 0.2,
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop',
  },
];

const LEFT_TOTAL_ITEMS = LEFT_BANNER_ITEMS.length;
const RIGHT_TOTAL_ITEMS = RIGHT_BANNER_ITEMS.length;

const Banner = () => {
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(1);

  const handleLeftPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLeftIndex((prev) => Math.max(0, prev - 1));
  };

  const handleLeftNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLeftIndex((prev) => Math.min(LEFT_TOTAL_ITEMS - 1, prev + 1));
  };

  const handleRightPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRightIndex((prev) => Math.max(0, prev - 1));
  };

  const handleRightNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRightIndex((prev) => Math.min(RIGHT_TOTAL_ITEMS - 1, prev + 1));
  };

  const handleLeftCardClick = () => {
    // TODO: 팀에서 카테고리 분류 방식 확인 후 URL 설정
    console.log('Left card clicked:', leftItem);
  };

  const handleRightCardClick = () => {
    // TODO: 팀에서 카테고리 분류 방식 확인 후 URL 설정
    console.log('Right card clicked:', rightItem);
  };

  const leftItem = LEFT_BANNER_ITEMS[leftIndex];
  const rightItem = RIGHT_BANNER_ITEMS[rightIndex];

  return (
    <CarouselContainer>
      <CarouselWrapper>
        <Card
          key={`left-${leftItem.id}`}
          $variant={leftItem.variant}
          $imageUrl={leftItem.imageUrl}
          onClick={handleLeftCardClick}
          style={{ cursor: 'pointer' }}
        >
          {leftIndex > 0 && (
            <NavigationButton
              onClick={handleLeftPrev}
              $position="left"
              aria-label="왼쪽 카드 이전 슬라이드"
            >
              <ChevronLeft size={20} />
            </NavigationButton>
          )}
          {leftIndex < LEFT_TOTAL_ITEMS - 1 && (
            <NavigationButton
              onClick={handleLeftNext}
              $position="right"
              aria-label="왼쪽 카드 다음 슬라이드"
            >
              <ChevronRight size={20} />
            </NavigationButton>
          )}
          <Overlay $alpha={leftItem.alpha} />
          <BottomLeft>
            <Kicker>{leftItem.kicker}</Kicker>
            <Title>{leftItem.title}</Title>
          </BottomLeft>
          <TopRight>
            <BannerBadge>{leftItem.badge}</BannerBadge>
          </TopRight>
          <Indicator>
            {leftIndex + 1}/{LEFT_TOTAL_ITEMS}
          </Indicator>
        </Card>

        <Card
          key={`right-${rightItem.id}`}
          $variant={rightItem.variant}
          $imageUrl={rightItem.imageUrl}
          onClick={handleRightCardClick}
          style={{ cursor: 'pointer' }}
        >
          {rightIndex > 0 && (
            <NavigationButton
              onClick={handleRightPrev}
              $position="left"
              aria-label="오른쪽 카드 이전 슬라이드"
            >
              <ChevronLeft size={20} />
            </NavigationButton>
          )}
          {rightIndex < RIGHT_TOTAL_ITEMS - 1 && (
            <NavigationButton
              onClick={handleRightNext}
              $position="right"
              aria-label="오른쪽 카드 다음 슬라이드"
            >
              <ChevronRight size={20} />
            </NavigationButton>
          )}
          <Overlay $alpha={rightItem.alpha} />
          <BottomLeft>
            <Kicker>{rightItem.kicker}</Kicker>
            <Title>{rightItem.title}</Title>
          </BottomLeft>
          <TopRight>
            <BannerBadge>{rightItem.badge}</BannerBadge>
          </TopRight>
          <Indicator>
            {rightIndex + 1}/{RIGHT_TOTAL_ITEMS}
          </Indicator>
        </Card>
      </CarouselWrapper>
    </CarouselContainer>
  );
};

export default Banner;
