import {
  TotalContainer,
  LayoutLine,
  ContentLinkWrapper,
  TagWrapper,
} from '@/components/feedwriting/Layout.style';
import ThumbnailImage from '@/components/feedwriting/ThumbnailImage';
import ContentWriting from '@/components/feedwriting/ContentWriting';
import LinkWriting from '@/components/feedwriting/LinkWriting';
import HobbyTag from '@/components/feedwriting/HobbyTag';
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
          <TagWrapper>
            <HobbyTag />
            <HobbyTag />
          </TagWrapper>
        </LayoutLine>
      </TotalContainer>
    </>
  );
};

export default FeedWriting;
