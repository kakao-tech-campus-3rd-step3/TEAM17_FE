import { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import StarterPackCard from '@/components/card/StarterPackCard';
import { useAuth } from '@/hooks/useAuth';
import {
  useStarterPack,
  useStarterPackLike,
  useStarterPackById,
  useStarterPackBookmark,
} from '@/hooks/useStarterPacks';
import type { StarterPack } from '@/types/StarterPack';
import {
  STARTER_PACK_CONSTANTS,
  STARTER_PACK_CATEGORIES,
  CATEGORY_MAPPING,
  type CategoryKey,
} from '@/constants/starterPack';
import {
  StarterPackContainer,
  StarterPackHeader,
  StarterPackHeaderTop,
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
  LoadMoreObserver,
} from '@/pages/StarterListPage.styles';

const matchCategory = (pack: StarterPack, active: CategoryKey) => {
  if (active === '전체') return true;
  const cat: string = pack.categoryName?.trim() ?? '';
  const activeCategory: string = active.trim();

  if (cat === activeCategory) return true;

  const mappedCategory = CATEGORY_MAPPING[cat];
  if (mappedCategory && mappedCategory === activeCategory) return true;

  return false;
};

const StarterPackCardWrapper = ({ pack }: { pack: StarterPack }) => {
  const navigate = useNavigate();
  const { starterPack } = useStarterPackById(pack.id);
  const { toggleLike } = useStarterPackLike(pack.id);
  const { toggleBookmark } = useStarterPackBookmark(pack.id);

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
      onToggleBookmark={() => toggleBookmark()}
    />
  );
};

const DISPLAY_ITEMS_PER_PAGE = 12;

const StarterListPage = () => {
  const navigate = useNavigate();
  const { isLogin } = useAuth();
  const [active, setActive] = useState<CategoryKey>(STARTER_PACK_CONSTANTS.DEFAULT_CATEGORY);
  const [displayedCount, setDisplayedCount] = useState(DISPLAY_ITEMS_PER_PAGE);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { starterPack, loading, error } = useStarterPack();

  const handleWriteClick = () => {
    if (!isLogin) {
      alert('로그인이 필요한 서비스입니다.\n로그인 페이지로 이동합니다.');
      navigate('/login');
      return;
    }
    navigate('/pack-writing');
  };

  const allStarterPacks = useMemo(() => {
    if (!starterPack || Object.keys(starterPack).length === 0) return [];

    const packs: StarterPack[] = [];
    const categoryKeys = Object.keys(starterPack);

    categoryKeys.forEach((categoryKey) => {
      const categoryPacks = (starterPack as Record<string, StarterPack[]>)[categoryKey] || [];
      if (!Array.isArray(categoryPacks)) return;
      categoryPacks.forEach((pack: StarterPack) => {
        const mappedCategoryName = CATEGORY_MAPPING[categoryKey] || categoryKey;
        packs.push({
          ...pack,
          categoryName: pack.categoryName || mappedCategoryName,
        });
      });
    });
    return packs;
  }, [starterPack]);

  const availableCategories = STARTER_PACK_CATEGORIES;

  const filtered = useMemo(() => {
    return allStarterPacks.filter((pack: StarterPack) => matchCategory(pack, active));
  }, [allStarterPacks, active]);

  // 카테고리 변경 시 표시 개수 초기화
  useEffect(() => {
    setDisplayedCount(DISPLAY_ITEMS_PER_PAGE);
  }, [active]);

  // 표시할 아이템들
  const displayedPacks = useMemo(() => {
    return filtered.slice(0, displayedCount);
  }, [filtered, displayedCount]);

  const hasMore = filtered.length > displayedCount;

  // 무한 스크롤을 위한 Intersection Observer 설정
  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setDisplayedCount((prev) => prev + DISPLAY_ITEMS_PER_PAGE);
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current = observer;

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (observer && currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasMore, loading]);

  const showCategories = !loading && !error;

  return (
    <StarterPackContainer>
      <StarterPackHeader>
        <StarterPackHeaderTop>
          <StarterPackTitle>취미팩</StarterPackTitle>
          <HeaderWriteButton onClick={handleWriteClick}>글쓰기</HeaderWriteButton>
        </StarterPackHeaderTop>
        {showCategories && (
          <CategoryTabs role="tablist" aria-label="스타터팩 카테고리">
            {availableCategories.map((category) => (
              <CategoryBtn
                key={category}
                role="tab"
                aria-selected={active === category}
                $active={active === category}
                onClick={() => setActive(category)}
              >
                {category}
              </CategoryBtn>
            ))}
          </CategoryTabs>
        )}
      </StarterPackHeader>

      {loading && (
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      )}

      {error && (
        <ErrorContainer>
          <ErrorMessage>{error}</ErrorMessage>
        </ErrorContainer>
      )}

      {!loading && !error && filtered.length === 0 && (
        <EmptyState>
          <p>아직 {active === '전체' ? '스타터팩' : `${active} 카테고리 스타터팩`}이 없습니다.</p>
        </EmptyState>
      )}

      {!loading && !error && filtered.length > 0 && (
        <>
          <StarterPackGrid>
            {displayedPacks.map((pack: StarterPack) => (
              <StarterPackCardWrapper key={pack.id} pack={pack} />
            ))}
          </StarterPackGrid>
          {hasMore && <LoadMoreObserver ref={loadMoreRef} />}
        </>
      )}
    </StarterPackContainer>
  );
};

export default StarterListPage;
