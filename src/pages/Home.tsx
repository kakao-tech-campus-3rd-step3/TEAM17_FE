import styled from 'styled-components';
import Banner from '@/pages/banner/Banner';
import Category from '@/pages/category/Category';
import StarterPreview from '@/components/home/starterpreview/StarterPreview';
import StyleFeedPreview from '@/components/home/feedpreview/StyleFeedPreview';

const HomePage = () => {
  return (
    <PageWrapper>
      <Main>
        <Banner />
        <Category />
        <StarterPreview />
        <StyleFeedPreview />
      </Main>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
`;

const Main = styled.main`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export default HomePage;
