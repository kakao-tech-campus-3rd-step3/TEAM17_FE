import { useNavigate } from 'react-router-dom';
import {
  SectionWrapper,
  Header,
  Grid,
  PreviewImage,
} from '@/components/mypage/MyPageSection.styles';
import { useMyPage } from '@/hooks/useMyPageContext';
import { MY_PAGE_PREVIEW_LIMIT } from '@/constants/myPage';
import type { FeedItem, PackItem, BookmarkedFeedItem } from '@/types/User';

type Props = {
  title: string;
  items: FeedItem[] | PackItem[] | BookmarkedFeedItem[];
  type: 'feed' | 'pack';
};

const MyPageSection = ({ title, items, type }: Props) => {
  const navigate = useNavigate();
  const { activeTab, setActiveTab } = useMyPage();

  if (!items?.length) return null;

  const handleViewAll = () => {
    if (type === 'feed') setActiveTab('feeds');
    else if (type === 'pack') setActiveTab('packs');
  };

  const visibleItems = activeTab === 'all' ? items.slice(0, MY_PAGE_PREVIEW_LIMIT) : items;

  return (
    <SectionWrapper>
      <Header>
        <h3>{title}</h3>
        {activeTab === 'all' && <button onClick={handleViewAll}>전체보기</button>}
      </Header>

      <Grid>
        {visibleItems.map((item, index) => {
          const imageUrl =
            type === 'feed'
              ? 'imageUrl' in item
                ? item.imageUrl
                : (item as PackItem).mainImageUrl
              : (item as PackItem).mainImageUrl;

          const handleClick = () => {
            if (type === 'feed' && 'feedId' in item) {
              navigate(`/feed/${item.feedId}`);
            } else if (type === 'pack' && 'packId' in item) {
              navigate(`/starterpack/${item.packId}`);
            }
          };

          return <PreviewImage key={index} src={imageUrl} alt={title} onClick={handleClick} />;
        })}
      </Grid>
    </SectionWrapper>
  );
};

export default MyPageSection;
