import {
  SectionWrapper,
  Header,
  Grid,
  PreviewImage,
  TotalButton,
} from '@/components/mypage/MyPageSection.styles';
import { useMyPage } from '@/hooks/useMypage';

type FeedItem = { feedId: number; imageUrl: string; description: string };
type PackItem = { packId: number; mainImageUrl: string; name: string };

type Props = {
  title: string;
  items: FeedItem[] | PackItem[];
  type: 'feed' | 'pack';
};

const MyPageSection = ({ title, items, type }: Props) => {
  const { activeTab, setActiveTab, profile } = useMyPage();

  if (!items?.length) return null;

  const handleViewAll = () => {
    if (type === 'feed') setActiveTab('feeds');
    else if (type === 'pack') setActiveTab('packs');
  };

  const visibleItems = activeTab === 'all' ? items.slice(0, 6) : items;

  const totalCount =
    type === 'feed' ? (profile?.feeds?.length ?? 0) : (profile?.packs?.length ?? 0);

  return (
    <SectionWrapper>
      <Header>
        <h3>
          {title} {totalCount}
        </h3>

        {activeTab === 'all' && <TotalButton onClick={handleViewAll}>전체보기</TotalButton>}
      </Header>

      <Grid>
        {visibleItems.map((item, index) => (
          <PreviewImage
            key={index}
            src={type === 'feed' ? (item as FeedItem).imageUrl : (item as PackItem).mainImageUrl}
            alt={title}
          />
        ))}
      </Grid>
    </SectionWrapper>
  );
};

export default MyPageSection;
