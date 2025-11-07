import { useMyPage } from '@/hooks/useMyPageContext';
import MyPageSection from '@/components/mypage/MyPageSection';
import { MY_PAGE_PREVIEW_LIMIT } from '@/constants/myPage';

const MyPageContent = () => {
  const { activeTab, profile, isOwner, isLoading, isError } = useMyPage();

  if (isLoading) return <p>로딩 중...</p>;
  if (isError || !profile) return <p>프로필을 불러올 수 없습니다.</p>;

  return (
    <>
      {activeTab === 'all' && (
        <>
          <MyPageSection
            title="Feed"
            items={profile.feeds?.slice(0, MY_PAGE_PREVIEW_LIMIT) ?? []}
            type="feed"
          />
          <MyPageSection
            title="Pack"
            items={profile.packs?.slice(0, MY_PAGE_PREVIEW_LIMIT) ?? []}
            type="pack"
          />{' '}
        </>
      )}

      {activeTab === 'feeds' && (
        <MyPageSection title="피드" items={profile.feeds ?? []} type="feed" />
      )}

      {activeTab === 'packs' && (
        <MyPageSection title="팩" items={profile.packs ?? []} type="pack" />
      )}

      {activeTab === 'scrap' && isOwner && (
        <>
          {profile.bookmarkedFeeds && profile.bookmarkedFeeds.length > 0 && (
            <MyPageSection title="북마크한 피드" items={profile.bookmarkedFeeds} type="feed" />
          )}
          {profile.bookmarkedPacks && profile.bookmarkedPacks.length > 0 && (
            <MyPageSection title="북마크한 팩" items={profile.bookmarkedPacks} type="pack" />
          )}
          {(!profile.bookmarkedFeeds || profile.bookmarkedFeeds.length === 0) &&
            (!profile.bookmarkedPacks || profile.bookmarkedPacks.length === 0) && (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                북마크한 게시글이 없습니다.
              </div>
            )}
        </>
      )}
    </>
  );
};

export default MyPageContent;
