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
  max-width: 75rem;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 0.75rem;
    gap: 0.5rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    gap: 0.375rem;
  }
`;

export default HomePage;
