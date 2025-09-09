import React from 'react';
import StartpackCard from '@/components/Card/StartpackCard';
import StartpackModal from '@/components/Card/StartpackModal';
import { useLikedPacks } from '../hooks/useLikedPacks';
import { useStarterPackModal } from '../hooks/useStartpackModal';
import { mockStartPacks } from '../mock/mock';
import {
  PageWrap,
  Header,
  HeaderInner,
  HeaderRow,
  HeaderTitle,
  TitleIcon,
  TitleH1,
  Subtitle,
  Meta,
  Main,
  Grid,
} from './StartListPage.styles';

const StartListPage: React.FC = () => {
  const { isLiked, toggleLike } = useLikedPacks();
  const { selectedPack, open, close } = useStarterPackModal();

  return (
    <PageWrap>
      <Header>
        <HeaderInner>
          <HeaderRow>
            <HeaderTitle>
              <TitleIcon />
              <div>
                <TitleH1>스타터팩 마켓</TitleH1>
                <Subtitle>당신의 새로운 시작을 위한 완벽한 세트</Subtitle>
              </div>
            </HeaderTitle>
            <Meta>총 {mockStartPacks.length}개의 스타터팩</Meta>
          </HeaderRow>
        </HeaderInner>
      </Header>

      <Main>
        <Grid>
          {mockStartPacks.map((pack) => (
            <StartpackCard
              key={pack.id}
              pack={pack}
              isLiked={isLiked(pack.id)}
              onToggleLike={toggleLike}
              onOpen={open}
            />
          ))}
        </Grid>
      </Main>

      {selectedPack && <StartpackModal pack={selectedPack} onClose={close} />}
    </PageWrap>
  );
};

export default StartListPage;
