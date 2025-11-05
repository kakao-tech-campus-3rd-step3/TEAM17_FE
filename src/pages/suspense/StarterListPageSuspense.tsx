import { Suspense, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import StarterPackCard from '@/components/card/StarterPackCard';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchStarterPack } from '@/api/starterPackApi';
import type { StarterPack } from '@/types/StarterPack';
import { STARTER_PACK_CATEGORIES, type CategoryKey } from '@/constants/starterPack';
import { useAuth } from '@/hooks/useAuth';
import SuspenseFallback from '@/components/common/SuspenseFallback';
import ErrorBoundaryWithRecovery from '@/components/common/ErrorBoundaryWithRecovery';
import {
  StarterPackContainer,
  StarterPackHeader,
  StarterPackHeaderTop,
  StarterPackTitle,
  HeaderWriteButton,
  CategoryTabs,
  CategoryBtn,
  StarterPackGrid,
  EmptyState,
} from '../StarterListPage.styles';

const matchCategory = (pack: StarterPack, active: CategoryKey) => {
  if (active === '전체') return true;
  const cat: string = pack.categoryName?.trim() ?? '';
  const activeCategory: string = active.trim();

  if (cat === activeCategory) return true;

  const categoryMapping: Record<string, CategoryKey> = {
    헬스: '헬스',
    요리: '요리',
    쿠킹: '요리',
    러닝: '러닝',
    베이킹: '베이킹',
    캠핑: '캠핑',
    독서: '독서',
  };

  const mappedCategory = categoryMapping[cat];
  if (mappedCategory && mappedCategory === activeCategory) return true;

  return false;
};

const StarterPackCardWrapper = ({ pack }: { pack: StarterPack }) => {
  const navigate = useNavigate();

  const handleOpenDetail = () => {
    navigate(`/starterpack/${pack.id}`);
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
  const { isLogin } = useAuth();
  const [active, setActive] = useState<CategoryKey>('전체');

  const { data: starterPackResponse } = useSuspenseQuery({
    queryKey: ['starterPacks'],
    queryFn: () => fetchStarterPack(),
    staleTime: 5 * 60 * 1000,
  });

  const handleWriteClick = () => {
    if (!isLogin) {
      alert('로그인이 필요한 서비스입니다.\n로그인 페이지로 이동합니다.');
      navigate('/login');
      return;
    }
    navigate('/packwriting');
  };

  const allStarterPacks = useMemo(() => {
    if (!starterPackResponse || Object.keys(starterPackResponse).length === 0) return [];

    const packs: StarterPack[] = [];
    const categoryKeys = Object.keys(starterPackResponse);

    categoryKeys.forEach((categoryKey) => {
      const categoryPacks = starterPackResponse[categoryKey];
      // categoryPacks가 배열인지 확인
      if (!Array.isArray(categoryPacks)) return;

      categoryPacks.forEach((pack) => {
        const categoryMapping: Record<string, string> = {
          헬스: '헬스',
          요리: '요리',
          러닝: '러닝',
          베이킹: '베이킹',
          캠핑: '캠핑',
          독서: '독서',
        };

        const mappedCategoryName = categoryMapping[categoryKey] || categoryKey;
        packs.push({
          ...pack,
          categoryName: pack.categoryName || mappedCategoryName,
        });
      });
    });
    return packs;
  }, [starterPackResponse]);

  const filteredPacks = useMemo(() => {
    return allStarterPacks.filter((pack: StarterPack) => matchCategory(pack, active));
  }, [allStarterPacks, active]);

  const getCategoryCount = (category: CategoryKey) => {
    if (category === '전체') return allStarterPacks.length;
    return allStarterPacks.filter((pack) => pack.categoryName === category).length;
  };

  if (filteredPacks.length === 0) {
    return (
      <StarterPackContainer>
        <StarterPackHeader>
          <StarterPackHeaderTop>
            <StarterPackTitle>취미팩</StarterPackTitle>
            <HeaderWriteButton onClick={handleWriteClick}>글쓰기</HeaderWriteButton>
          </StarterPackHeaderTop>
          <CategoryTabs role="tablist" aria-label="스타터팩 카테고리">
            {STARTER_PACK_CATEGORIES.map((category) => (
              <CategoryBtn
                key={category}
                role="tab"
                aria-selected={active === category}
                $active={active === category}
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
        <StarterPackHeaderTop>
          <StarterPackTitle>취미팩</StarterPackTitle>
          <HeaderWriteButton onClick={handleWriteClick}>글쓰기</HeaderWriteButton>
        </StarterPackHeaderTop>
        <CategoryTabs role="tablist" aria-label="스타터팩 카테고리">
          {STARTER_PACK_CATEGORIES.map((category) => (
            <CategoryBtn
              key={category}
              role="tab"
              aria-selected={active === category}
              $active={active === category}
              onClick={() => setActive(category)}
            >
              {category} ({getCategoryCount(category)})
            </CategoryBtn>
          ))}
        </CategoryTabs>
      </StarterPackHeader>

      <StarterPackGrid>
        {filteredPacks.map((pack: StarterPack) => (
          <StarterPackCardWrapper key={pack.id} pack={pack} />
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
