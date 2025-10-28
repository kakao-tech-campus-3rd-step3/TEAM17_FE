import {
  TotalContainer,
  LayoutLine,
  TagWrapper,
} from '@/components/pack_feed_writing/Layout.style';
import ThumbnailImage from '@/components/pack_feed_writing/ThumbnailImage';
import ContentWriting from '@/components/pack_feed_writing/feedContentWriting';
import HobbyTag from '@/components/pack_feed_writing/HobbyTag';
import HashTag from '@/components/pack_feed_writing/HashTag';
const FeedWriting = () => {
  return (
    <>
      <TotalContainer>
        <LayoutLine>
          <ThumbnailImage />
          <ContentWriting />
          <TagWrapper>
            <HobbyTag />
            <HashTag />
          </TagWrapper>
        </LayoutLine>
      </TotalContainer>
    </>
  );
};

export default FeedWriting;
