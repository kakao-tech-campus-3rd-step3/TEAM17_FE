import { Suspense, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import StarterPackCard from '@/components/card/StarterPackCard';
import { useSuspenseQuery } from '@/hooks/useSuspenseQuery';
import { fetchStarterPack } from '@/api/starterPackApi';
import type { StarterPack } from '@/types/StarterPack';
import { STARTER_PACK_CATEGORIES, type CategoryKey } from '@/constants/starterPack';
import SuspenseFallback from '@/components/common/SuspenseFallback';
import ErrorBoundaryWithRecovery from '@/components/common/ErrorBoundaryWithRecovery';
import {
  StarterPackContainer,
  StarterPackHeader,
  StarterPackTitle,
  CategoryTabs,
  CategoryBtn,
  StarterPackGrid,
  EmptyState,
  DemoButton,
} from '../StarterListPage.styles';

const matchCategory = (pack: StarterPack, active: CategoryKey) => {
  if (active === '전체') return true;
  const cat: string = pack.categoryName ?? '';
  return cat === active;
};

const StarterPackCardWrapper = ({ pack }: { pack: StarterPack }) => {
  const navigate = useNavigate();

  const handleOpenDetail = () => {
    navigate(`/starterpack/${pack.packId}`);
  };

  return (
    <StarterPackCard
      pack={pack}
      isLiked={false}
      onToggleLike={() => {}}
      onOpen={handleOpenDetail}
    />
  );
};

const StarterPackData = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState<CategoryKey>('전체');

  const { data: starterPackResponse } = useSuspenseQuery(
    ['starterPacks'],
    () => fetchStarterPack(),
    {
      staleTime: 5 * 60 * 1000,
    }
  ) as { data: { content: StarterPack[] } };

  const filteredPacks = useMemo(() => {
    return starterPackResponse.content.filter((pack: StarterPack) => matchCategory(pack, active));
  }, [starterPackResponse.content, active]);

  const handleDemoClick = () => {
    navigate('/starterpack/demo');
  };

  if (filteredPacks.length === 0) {
    return (
      <StarterPackContainer>
        <StarterPackHeader>
          <StarterPackTitle>스타터팩</StarterPackTitle>
          <DemoButton onClick={handleDemoClick}>데모</DemoButton>
        </StarterPackHeader>
        <EmptyState>
          <p>아직 스타터팩이 없습니다.</p>
        </EmptyState>
      </StarterPackContainer>
    );
  }

  return (
    <StarterPackContainer>
      <StarterPackHeader>
        <StarterPackTitle>스타터팩</StarterPackTitle>
        <DemoButton onClick={handleDemoClick}>데모</DemoButton>
      </StarterPackHeader>

      <CategoryTabs>
        {STARTER_PACK_CATEGORIES.map((category) => (
          <CategoryBtn
            key={category}
            $active={active === category}
            onClick={() => setActive(category)}
          >
            {category}
          </CategoryBtn>
        ))}
      </CategoryTabs>

      <StarterPackGrid>
        {filteredPacks.map((pack: StarterPack) => (
          <StarterPackCardWrapper key={pack.packId} pack={pack} />
        ))}
      </StarterPackGrid>
    </StarterPackContainer>
  );
};

const StarterListPageSuspense = () => {
  return (
    <ErrorBoundaryWithRecovery>
      <Suspense fallback={<SuspenseFallback message="스타터팩을 불러오는 중..." />}>
        <StarterPackData />
      </Suspense>
    </ErrorBoundaryWithRecovery>
  );
};

export default StarterListPageSuspense;
