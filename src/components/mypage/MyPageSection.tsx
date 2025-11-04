import { useNavigate } from 'react-router-dom';
import { SectionWrapper, Header, Grid, PreviewImage } from '@/components/mypage/MyPageSection.styles';
import { useMyPage } from '@/hooks/useMypage';

type FeedItem = { feedId: number; imageUrl: string; description: string };
type PackItem = { packId: number; mainImageUrl: string; name: string };

type Props = {
  title: string;
  items: FeedItem[] | PackItem[];
  type: 'feed' | 'pack';
};

const MyPageSection = ({ title, items, type }: Props) => {
  const navigate = useNavigate();
  const { activeTab, setActiveTab, profile } = useMyPage();

  if (!items?.length) return null;

  const handleViewAll = () => {
    if (type === 'feed') setActiveTab('feeds');
    else if (type === 'pack') setActiveTab('packs');
  };

  const visibleItems = activeTab === 'all' ? items.slice(0, 6) : items;
  const totalCount =
    type === 'feed' ? profile?.feeds?.length ?? 0 : profile?.packs?.length ?? 0;

  return (
    <SectionWrapper>
      <Header>
        <h3>
          {title} {totalCount}
        </h3>
        {activeTab === 'all' && <button onClick={handleViewAll}>전체보기</button>}
      </Header>

      <Grid>
        {visibleItems.map((item, index) => (
          <PreviewImage
            key={index}
            src={type === 'feed' ? (item as FeedItem).imageUrl : (item as PackItem).mainImageUrl}
            alt={title}
            onClick={() => {
              if (type === 'feed' && 'feedId' in item) {
                navigate(`/feed/${item.feedId}`); 
              } else if (type === 'pack' && 'packId' in item) {
                navigate(`/starterpack/${item.packId}`); 
              }
            }}
          />
        ))}
      </Grid>
    </SectionWrapper>
  );
};

export default MyPageSection;
