import { useMyPage } from '@/hooks/useMyPageContext';
import MyPageSection from '@/components/mypage/MyPageSection';

const MyPageContent = () => {
  const { activeTab, profile, isOwner, isLoading, isError } = useMyPage();

  if (isLoading) return <p>로딩 중...</p>;
  if (isError || !profile) return <p>프로필을 불러올 수 없습니다.</p>;

  return (
    <>
      {activeTab === 'all' && (
        <>
          <MyPageSection title="Feed" items={profile.feeds?.slice(0, 6) ?? []} type="feed" />
          <MyPageSection title="Pack" items={profile.packs?.slice(0, 6) ?? []} type="pack" />
        </>
      )}

      {activeTab === 'feeds' && (
        <MyPageSection title="피드" items={profile.feeds ?? []} type="feed" />
      )}

      {activeTab === 'packs' && (
        <MyPageSection title="팩" items={profile.packs ?? []} type="pack" />
      )}

      {activeTab === 'scrap' && isOwner && (
        <MyPageSection title="스크랩북" items={profile.bookmarkedFeeds ?? []} type="feed" />
      )}
    </>
  );
};

export default MyPageContent;
