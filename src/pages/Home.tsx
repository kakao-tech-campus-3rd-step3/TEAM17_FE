import styled from 'styled-components';
import Banner from '@/components/home/banner/Banner';
import Category from '@/components/category/Category';
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
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export default HomePage;
