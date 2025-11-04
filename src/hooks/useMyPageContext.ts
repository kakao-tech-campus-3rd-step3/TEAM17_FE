import { useContext } from 'react';
import { MyPageContext } from '@/contexts/MyPageContext';

export const useMyPage = () => {
  const context = useContext(MyPageContext);
  if (!context) throw new Error('useMyPage must be used within a MyPageProvider');
  return context;
};
