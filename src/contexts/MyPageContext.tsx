/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useUserProfile } from '@/hooks/useUser';
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
  const userId = user?.userId;

  const {
    data: profile,
    isLoading,
    isError,
  } = useUserProfile(userId, {
    enabled: !!userId,
  });

  const isOwner = !!profile?.isMe;

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
