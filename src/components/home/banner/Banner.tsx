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
  Badge,
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
};

const BANNER_ITEMS: BannerItem[] = [
  {
    id: 1,
    kicker: '캠핑장',
    title: '나의 감성 듬뿍 담은, 텐트 꾸미기!',
    badge: '리뷰',
    variant: 'left',
    alpha: 0.3,
  },
  {
    id: 2,
    kicker: '젊음의 바다',
    title: '취미 서핑하러 양양 가기!',
    badge: '정보공유',
    variant: 'right',
    alpha: 0.2,
  },
  {
    id: 3,
    kicker: '테스트1',
    title: '테스트 타이틀 1',
    badge: '리뷰',
    variant: 'left',
    alpha: 0.3,
  },
  {
    id: 4,
    kicker: '테스트2',
    title: '테스트 타이틀 2',
    badge: '정보공유',
    variant: 'right',
    alpha: 0.2,
  },
];

const TOTAL_ITEMS = BANNER_ITEMS.length;

const Banner = () => {
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(1);

  const handleLeftPrev = () => {
    setLeftIndex((prev) => Math.max(0, prev - 1));
  };

  const handleLeftNext = () => {
    setLeftIndex((prev) => Math.min(TOTAL_ITEMS - 1, prev + 1));
  };

  const handleRightPrev = () => {
    setRightIndex((prev) => Math.max(0, prev - 1));
  };

  const handleRightNext = () => {
    setRightIndex((prev) => Math.min(TOTAL_ITEMS - 1, prev + 1));
  };

  const leftItem = BANNER_ITEMS[leftIndex];
  const rightItem = BANNER_ITEMS[rightIndex];

  return (
    <CarouselContainer>
      <CarouselWrapper>
        <Card key={`left-${leftItem.id}`} $variant={leftItem.variant}>
          {leftIndex > 0 && (
            <NavigationButton
              onClick={handleLeftPrev}
              $position="left"
              aria-label="왼쪽 카드 이전 슬라이드"
            >
              <ChevronLeft size={20} />
            </NavigationButton>
          )}
          {leftIndex < TOTAL_ITEMS - 1 && (
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
            <Badge>{leftItem.badge}</Badge>
          </TopRight>
          <Indicator>
            {leftIndex + 1}/{TOTAL_ITEMS}
          </Indicator>
        </Card>

        <Card key={`right-${rightItem.id}`} $variant={rightItem.variant}>
          {rightIndex > 0 && (
            <NavigationButton
              onClick={handleRightPrev}
              $position="left"
              aria-label="오른쪽 카드 이전 슬라이드"
            >
              <ChevronLeft size={20} />
            </NavigationButton>
          )}
          {rightIndex < TOTAL_ITEMS - 1 && (
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
            <Badge>{rightItem.badge}</Badge>
          </TopRight>
          <Indicator>
            {rightIndex + 1}/{TOTAL_ITEMS}
          </Indicator>
        </Card>
      </CarouselWrapper>
    </CarouselContainer>
  );
};

export default Banner;
