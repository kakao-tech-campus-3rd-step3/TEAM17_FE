import {
  TotalContainer,
  LayoutLine,
  ContentLinkWrapper,
  TagWrapper,
} from '@/components/pack_feed_writing/Layout.style';
import ThumbnailImage from '@/components/pack_feed_writing/ThumbnailImage';
import ContentWriting from '@/components/pack_feed_writing/ContentWriting';
import LinkWriting from '@/components/pack_feed_writing/LinkWriting';
import HobbyTag from '@/components/pack_feed_writing/HobbyTag';
import HashTag from '@/components/pack_feed_writing/HashTag';
import Price from '@/components/pack_feed_writing/Price';
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
