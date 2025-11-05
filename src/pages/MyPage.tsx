import { MyPageProvider } from '@/contexts/MyPageContext';
import Profile from '@/components/mypage/Profile';
import MyPageTabs from '@/components/mypage/MyPageTabs';
import MyPageContent from '@/components/mypage/MyPageContent';

const Mypage = () => {
  return (
    <MyPageProvider>
      <Profile />
      <MyPageTabs />
      <MyPageContent />
    </MyPageProvider>
  );
};

export default Mypage;
