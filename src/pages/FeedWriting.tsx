import {
  TotalContainer,
  LayoutLine,
  ContentLinkWrapper,
} from '@/components/feedwriting/Layout.style';
import ThumbnailImage from '@/components/feedwriting/ThumbnailImage';
import ContentWriting from '@/components/feedwriting/ContentWriting';
import LinkWriting from '@/components/feedwriting/LinkWriting';
const FeedWriting = () => {
  return (
    <>
      <TotalContainer>
        <LayoutLine>
          <ThumbnailImage />
          <ContentLinkWrapper>
            <ContentWriting />
            <LinkWriting />
          </ContentLinkWrapper>
        </LayoutLine>
      </TotalContainer>
    </>
  );
};

export default FeedWriting;
