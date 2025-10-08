import { useState } from 'react';
import StarterPackCard from '@/components/card/StarterPackCard';
import StarterPackModal from '@/components/home/StarterPackList/StarterPackDetail';
import { useLikedPacks } from '@/hooks/useLikedPacks';
import { useStarterPackModal } from '@/hooks/useStarterPackModal';
import { mockStartPacks } from '@/mocks/mock';
import type { StarterPack } from '@/types/StarterPack';
import {
  StarterPackContainer,
  StarterPackHeader,
  StarterPackTitle,
  CategoryTabs,
  CategoryBtn,
  StarterPackGrid,
} from './StarterListPage.styles';

// 카테고리
type CategoryKey = '전체' | '베이킹' | '캠핑' | '독서' | '헬스' | '요리' | '러닝';
const CATEGORIES: CategoryKey[] = ['전체', '베이킹', '캠핑', '독서', '헬스', '요리', '러닝'];

const matchCategory = (pack: StarterPack, active: CategoryKey) => {
  if (active === '전체') return true;
  const cat: string = pack.category ?? '';
  return cat === active;
};

const StarterListPage = () => {
  const { isLiked, toggleLike } = useLikedPacks();
  const { selectedPack, open, close } = useStarterPackModal();
  const [active, setActive] = useState<CategoryKey>('전체');

  // 임시로 Mock 데이터 사용 (나중에 React Query로 교체)
  const filtered = mockStartPacks.filter((p) => matchCategory(p, active));

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
        {filtered.map((pack) => (
          <StarterPackCard
            key={pack.id}
            pack={pack}
            isLiked={isLiked(pack.id)}
            onToggleLike={toggleLike}
            onOpen={open}
          />
        ))}
      </StarterPackGrid>

      {selectedPack && <StarterPackModal pack={selectedPack} onClose={close} />}
    </StarterPackContainer>
  );
};

export default StarterListPage;
