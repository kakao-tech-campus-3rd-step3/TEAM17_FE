import { useMyPage } from '@/hooks/useMypage';
import { TabContainer,TabButton } from '@/components/mypage/MyPageTabs.styles';
import { TABS as tabs } from '@/constants/myPageTabs';

const MyPageTabs = () => {
  const { activeTab, setActiveTab, isOwner } = useMyPage();

  return (
    <TabContainer>
      {tabs.map((tab) => {
        if (tab.id === 'scrap' && !isOwner) return null;

        return (
          <TabButton
            key={tab.id}
            $active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </TabButton>
        );
      })}
    </TabContainer>
  );
};

export default MyPageTabs;
