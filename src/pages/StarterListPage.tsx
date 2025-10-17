import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import StarterPackCard from '@/components/card/StarterPackCard';
import { useStarterPack, useStarterPackLike, useStarterPackById } from '@/hooks/useStarterPacks';
import type { StarterPack } from '@/types/StarterPack';
import { STARTER_PACK_CONSTANTS, type CategoryKey } from '@/constants/starterPack';
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
  DemoButton,
} from '@/pages/StarterListPage.styles';

const matchCategory = (pack: StarterPack, active: CategoryKey) => {
  if (active === '전체') return true;
  const cat: string = pack.categoryName ?? '';
  return cat === active;
};

const StarterPackCardWrapper = ({ pack }: { pack: StarterPack }) => {
  const navigate = useNavigate();
  const { starterPack } = useStarterPackById(pack.packId);
  const { toggleLike } = useStarterPackLike(pack.packId);

  const packWithLike = starterPack as StarterPack & { isLiked?: boolean };
  const isLiked = packWithLike?.isLiked ?? false;

  const handleOpenDetail = () => {
    navigate(`/starterpack/${pack.packId}`);
  };

  return (
    <StarterPackCard
      pack={pack}
      isLiked={isLiked}
      onToggleLike={() => toggleLike()}
      onOpen={handleOpenDetail}
    />
  );
};

const StarterListPage = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState<CategoryKey>(STARTER_PACK_CONSTANTS.DEFAULT_CATEGORY);

  const { starterPack, loading, error } = useStarterPack();

  const allStarterPacks = useMemo(() => {
    if (!starterPack) return [];
    return Object.values(starterPack).flat();
  }, [starterPack]);

  const availableCategories = useMemo(() => {
    const categories = new Set<string>();
    allStarterPacks.forEach((pack) => {
      if (pack.categoryName) {
        categories.add(pack.categoryName);
      }
    });

    const sortedCategories = Array.from(categories).sort();
    return ['전체', ...sortedCategories] as CategoryKey[];
  }, [allStarterPacks]);

  const getCategoryCount = (category: CategoryKey) => {
    if (category === '전체') return allStarterPacks.length;
    return allStarterPacks.filter((pack) => pack.categoryName === category).length;
  };

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
          <DemoButton onClick={() => navigate('/starterpack/1?demo=true')}>
            🎯 데모 페이지 보기
          </DemoButton>
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
            {availableCategories.map((category) => (
              <CategoryBtn
                key={category}
                role="tab"
                aria-selected={active === category}
                active={active === category}
                onClick={() => setActive(category)}
              >
                {category} ({getCategoryCount(category)})
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
          {availableCategories.map((category) => (
            <CategoryBtn
              key={category}
              role="tab"
              aria-selected={active === category}
              active={active === category}
              onClick={() => setActive(category)}
            >
              {category} ({getCategoryCount(category)})
            </CategoryBtn>
          ))}
        </CategoryTabs>
      </StarterPackHeader>

      <StarterPackGrid>
        {filtered.map((pack: StarterPack) => (
          <StarterPackCardWrapper key={pack.packId} pack={pack} />
        ))}
      </StarterPackGrid>
    </StarterPackContainer>
  );
};

export default StarterListPage;
