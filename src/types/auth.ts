import type { User } from '@/types/User';

/**
 * 로그인한 사용자의 최소 정보 (전역 상태에서 관리)
 */
export type AuthUser = Pick<User, 'userId' | 'email' | 'nickname' | 'profileImageUrl'>;

/**
 * AuthContext 전역 상태 타입
 */
export type AuthContextType = {
  user: AuthUser | null;                      
  isLogin: boolean;                          
  login: (userData: AuthUser) => void;          
  logout: () => void;                          
  loading: boolean;                           
};
