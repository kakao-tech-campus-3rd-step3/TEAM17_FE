import React, { useMemo, useState } from 'react';
import StarterpackCard from '@/components/card/StarterPackCard';
import StarterpackModal from '@/components/StarterPackList/StarterPackDetail';
import { useLikedPacks } from '@/hooks/useLikedPacks';
import { useStarterPackModal } from '@/hooks/useStarterPackModal';
import { mockStartPacks } from '@/mocks/mock';
import {
  PageWrap,
  Header,
  HeaderInner,
  HeaderRow,
  HeaderTitle,
  TitleIcon,
  Meta,
  Main,
  Grid,
  CategoryTabs,
  CategoryBtn,
} from './StarterListPage.styles';

// 카테고리
type CategoryKey = '전체' | '베이킹' | '캠핑' | '독서' | '헬스' | '요리' | '러닝';
const CATEGORIES: CategoryKey[] = ['전체', '베이킹', '캠핑', '독서', '헬스', '요리', '러닝'];

const matchCategory = (pack: any, active: CategoryKey) => {
  if (active === '전체') return true;
  const cat: string = pack.category ?? '';
  const tags: string[] = pack.tags ?? [];
  return cat === active || tags.includes(active);
};

const StarterListPage: React.FC = () => {
  const { isLiked, toggleLike } = useLikedPacks();
  const { selectedPack, open, close } = useStarterPackModal();

  // 현재 선택된 카테고리
  const [active, setActive] = useState<CategoryKey>('전체');

  // 선택된 카테고리에 따른 필터링
  const filtered = useMemo(() => mockStartPacks.filter((p) => matchCategory(p, active)), [active]);

  const metaText =
    active === '전체'
      ? `총 ${filtered.length}개의 스타터팩`
      : `${active} 카테고리 ${filtered.length}개`;

  return (
    <PageWrap>
      <Header>
        <HeaderInner>
          <HeaderRow>
            <HeaderTitle>
              <TitleIcon />
              <CategoryTabs role="tablist" aria-label="스타터팩 카테고리">
                {CATEGORIES.map((c) => (
                  <CategoryBtn
                    key={c}
                    role="tab"
                    aria-selected={active === c}
                    active={active === c}
                    onClick={() => setActive(c)}
                  >
                    {c}
                  </CategoryBtn>
                ))}
              </CategoryTabs>
            </HeaderTitle>

            <Meta>{metaText}</Meta>
          </HeaderRow>
        </HeaderInner>
      </Header>

      <Main>
        <Grid>
          {filtered.map((pack) => (
            <StarterpackCard
              key={pack.id}
              pack={pack}
              isLiked={isLiked(pack.id)}
              onToggleLike={toggleLike}
              onOpen={open}
            />
          ))}
        </Grid>
      </Main>

      {selectedPack && <StarterpackModal pack={selectedPack} onClose={close} />}
    </PageWrap>
  );
};

export default StarterListPage;
