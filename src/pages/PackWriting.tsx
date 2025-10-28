import {
  TotalContainer,
  LayoutLine,
  ContentLinkWrapper,
  TagWrapper,
} from '@/components/packwriting/Layout.style';
import ThumbnailImage from '@/components/packwriting/ThumbnailImage';
import ContentWriting from '@/components/packwriting/ContentWriting';
import LinkWriting from '@/components/packwriting/LinkWriting';
import HobbyTag from '@/components/packwriting/HobbyTag';
import HashTag from '@/components/packwriting/HashTag';
import Price from '@/components/packwriting/Price';
const PackWriting = () => {
  return (
    <>
      <TotalContainer>
        <LayoutLine>
          <ThumbnailImage />
          <ContentLinkWrapper>
            <ContentWriting />
            <LinkWriting />
          </ContentLinkWrapper>
          <TagWrapper>
            <HobbyTag />
            <HashTag />
            <Price />
          </TagWrapper>
        </LayoutLine>
      </TotalContainer>
    </>
  );
};

export default PackWriting;
