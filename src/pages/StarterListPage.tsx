import { useState, useMemo } from 'react';
import StarterPackCard from '@/components/card/StarterPackCard';
import StarterPackModal from '@/components/home/StarterPackList/StarterPackDetail';
import { useStarterPackModal } from '@/hooks/useStarterPackModal';
import { useStarterPack, useStarterPackLike, useStarterPackById } from '@/hooks/useStarterPacks';
import type { StarterPack } from '@/types/StarterPack';
import {
  StarterPackContainer,
  StarterPackHeader,
  StarterPackTitle,
  CategoryTabs,
  CategoryBtn,
  StarterPackGrid,
  LoadingContainer,
  LoadingSpinner,
  ErrorContainer,
  ErrorMessage,
  EmptyState,
} from './StarterListPage.styles';

// 카테고리
type CategoryKey = '전체' | '베이킹' | '캠핑' | '독서' | '헬스' | '요리' | '러닝';
const CATEGORIES: CategoryKey[] = ['전체', '베이킹', '캠핑', '독서', '헬스', '요리', '러닝'];

const matchCategory = (pack: StarterPack, active: CategoryKey) => {
  if (active === '전체') return true;
  const cat: string = pack.category ?? '';
  return cat === active;
};

const StarterPackCardWrapper = ({
  pack,
  onOpen,
}: {
  pack: StarterPack;
  onOpen: (pack: StarterPack) => void;
}) => {
  const { starterPack } = useStarterPackById(pack.id);
  const { toggleLike } = useStarterPackLike(pack.id);

  // 현재 좋아요 상태와 카운트를 가져옴
  const packWithLike = starterPack as StarterPack & { isLiked?: boolean };
  const isLiked = packWithLike?.isLiked ?? false;

  return (
    <StarterPackCard
      pack={pack}
      isLiked={isLiked}
      onToggleLike={() => toggleLike()}
      onOpen={onOpen}
    />
  );
};

const StarterListPage = () => {
  const { selectedPack, open, close } = useStarterPackModal();
  const [active, setActive] = useState<CategoryKey>('전체');

  const { starterPack, loading, error } = useStarterPack();

  const allStarterPacks = useMemo(() => {
    if (!starterPack) return [];
    return Object.values(starterPack).flat();
  }, [starterPack]);

  // 카테고리별 필터링
  const filtered = useMemo(() => {
    return allStarterPacks.filter((pack: StarterPack) => matchCategory(pack, active));
  }, [allStarterPacks, active]);

  // 로딩 상태 처리
  if (loading) {
    return (
      <StarterPackContainer>
        <StarterPackHeader>
          <StarterPackTitle>취미팩</StarterPackTitle>
        </StarterPackHeader>
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      </StarterPackContainer>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <StarterPackContainer>
        <StarterPackHeader>
          <StarterPackTitle>취미팩</StarterPackTitle>
        </StarterPackHeader>
        <ErrorContainer>
          <ErrorMessage>{error}</ErrorMessage>
        </ErrorContainer>
      </StarterPackContainer>
    );
  }

  // 빈 상태 처리
  if (filtered.length === 0) {
    return (
      <StarterPackContainer>
        <StarterPackHeader>
          <StarterPackTitle>취미팩</StarterPackTitle>
          <CategoryTabs role="tablist" aria-label="스타터팩 카테고리">
            {CATEGORIES.map((category) => (
              <CategoryBtn
                key={category}
                role="tab"
                aria-selected={active === category}
                active={active === category}
                onClick={() => setActive(category)}
              >
                {category}
              </CategoryBtn>
            ))}
          </CategoryTabs>
        </StarterPackHeader>
        <EmptyState>
          <p>아직 {active === '전체' ? '스타터팩' : `${active} 카테고리 스타터팩`}이 없습니다.</p>
        </EmptyState>
      </StarterPackContainer>
    );
  }

  return (
    <StarterPackContainer>
      <StarterPackHeader>
        <StarterPackTitle>취미팩</StarterPackTitle>
        <CategoryTabs role="tablist" aria-label="스타터팩 카테고리">
          {CATEGORIES.map((category) => (
            <CategoryBtn
              key={category}
              role="tab"
              aria-selected={active === category}
              active={active === category}
              onClick={() => setActive(category)}
            >
              {category}
            </CategoryBtn>
          ))}
        </CategoryTabs>
      </StarterPackHeader>

      <StarterPackGrid>
        {filtered.map((pack: StarterPack) => (
          <StarterPackCardWrapper key={pack.id} pack={pack} onOpen={open} />
        ))}
      </StarterPackGrid>

      {selectedPack && <StarterPackModal pack={selectedPack} onClose={close} />}
    </StarterPackContainer>
  );
};

export default StarterListPage;
