import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { getUser, logout } from '@/api/auth';
import type { ReactNode } from 'react';
import type { AuthUser } from '@/types/auth';
import axiosInstance from '@/api/axiosInstance';
/**
 * AuthProvider: 앱 전역에서 로그인 상태를 관리
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //  첫 마운트 시 세션 확인 (/api/auth/me)
  useEffect(() => {
    const checkSession = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
        setIsLogin(true);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          setUser(null);
          setIsLogin(false);
        }
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  // 로그인 시 Context 업데이트
  const handleLogin = (userData: AuthUser) => {
    setUser(userData);
    setIsLogin(true);
  };

  // 로그아웃 시 Context 및 세션 초기화
  const handleLogout = async () => {
    try {
      await logout();

      delete axiosInstance.defaults.headers.common['Authorization'];
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    } finally {
      setUser(null);
      setIsLogin(false);
      navigate('/login', { replace: true });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLogin,
        login: handleLogin,
        logout: handleLogout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
