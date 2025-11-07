/* eslint-disable react-refresh/only-export-components */
import { createContext, useState} from 'react';
import type { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useUserProfile } from '@/hooks/useUser';
import { useParams } from 'react-router-dom';
import type { UserProfile } from '@/types/User';

export type TabType = 'all' | 'feeds' | 'packs' | 'scrap';

export type MyPageContextType = {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  profile: UserProfile | undefined;
  isOwner: boolean;
  isLoading: boolean;
  isError: boolean;
};

export const MyPageContext = createContext<MyPageContextType | null>(null);

export const MyPageProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const { user } = useAuth();
  const { userId: paramId } = useParams<{ userId?: string }>();

  //userId가 있으면 다른 사람 페이지, 없으면 내 페이지
  const targetUserId = paramId ? Number(paramId) : user?.userId;

  //해당 userId의 프로필 불러오기
  const {
    data: profile,
    isLoading,
    isError,
  } = useUserProfile(targetUserId, {
    enabled: !!targetUserId,
  });

  const isOwner = !!user && (!paramId || Number(paramId) === user.userId);

  const value: MyPageContextType = {
    activeTab,
    setActiveTab,
    profile,
    isOwner,
    isLoading,
    isError,
  };

  return <MyPageContext.Provider value={value}>{children}</MyPageContext.Provider>;
};
