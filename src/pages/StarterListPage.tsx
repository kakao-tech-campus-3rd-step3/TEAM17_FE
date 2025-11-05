import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import StarterPackCard from '@/components/card/StarterPackCard';
import { useAuth } from '@/hooks/useAuth';
import { useStarterPack, useStarterPackLike, useStarterPackById } from '@/hooks/useStarterPacks';
import type { StarterPack } from '@/types/StarterPack';
import {
  STARTER_PACK_CONSTANTS,
  STARTER_PACK_CATEGORIES,
  type CategoryKey,
} from '@/constants/starterPack';
import {
  StarterPackContainer,
  StarterPackHeader,
  StarterPackTitle,
  HeaderWriteButton,
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

  // 매핑된 카테고리 확인
  const mappedCategory = categoryMapping[cat];
  if (mappedCategory && mappedCategory === activeCategory) return true;

  return false;
};

const StarterPackCardWrapper = ({ pack }: { pack: StarterPack }) => {
  const navigate = useNavigate();
  const { starterPack } = useStarterPackById(pack.id);
  const { toggleLike } = useStarterPackLike(pack.id);

  const packWithLike = starterPack as StarterPack & { isLiked?: boolean };
  const isLiked = packWithLike?.isLiked ?? false;

  const handleOpenDetail = () => {
    navigate(`/starterpack/${pack.id}`);
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
  const { isLogin } = useAuth();
  const [active, setActive] = useState<CategoryKey>(STARTER_PACK_CONSTANTS.DEFAULT_CATEGORY);

  const { starterPack, loading, error } = useStarterPack();

  const handleWriteClick = () => {
    if (!isLogin) {
      alert('로그인이 필요한 서비스입니다.\n로그인 페이지로 이동합니다.');
      navigate('/login');
      return;
    }
    navigate('/packwriting');
  };

  const allStarterPacks = useMemo(() => {
    if (!starterPack) return [];

    const packs: StarterPack[] = [];
    const categoryKeys = Object.keys(starterPack);

    categoryKeys.forEach((categoryKey) => {
      const categoryPacks = starterPack[categoryKey] || [];
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
  }, [starterPack]);

  const availableCategories = STARTER_PACK_CATEGORIES;

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
          <HeaderWriteButton onClick={handleWriteClick}>글쓰기</HeaderWriteButton>
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
          <HeaderWriteButton onClick={handleWriteClick}>글쓰기</HeaderWriteButton>
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
          <HeaderWriteButton onClick={handleWriteClick}>글쓰기</HeaderWriteButton>
          <CategoryTabs role="tablist" aria-label="스타터팩 카테고리">
            {availableCategories.map((category) => (
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
        <StarterPackTitle>취미팩</StarterPackTitle>
        <HeaderWriteButton onClick={handleWriteClick}>글쓰기</HeaderWriteButton>
        <CategoryTabs role="tablist" aria-label="스타터팩 카테고리">
          {availableCategories.map((category) => (
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
        {filtered.map((pack: StarterPack) => (
          <StarterPackCardWrapper key={pack.id} pack={pack} />
        ))}
      </StarterPackGrid>
    </StarterPackContainer>
  );
};

export default StarterListPage;
