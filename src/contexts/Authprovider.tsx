import axios from 'axios';

import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import type { ReactNode } from 'react';
import { getUser, logout } from '@/api/auth';
import { useNavigate } from 'react-router-dom';

/**
 * Provides authentication state and actions to descendant components via AuthContext.
 *
 * The provider supplies the current login status and control functions so child components
 * can read `isLogin`, call `login()` to mark the user as logged in, call `logout()` to sign out
 * and navigate to the login page, and observe `loading` while the initial session check runs.
 *
 * @param children - React children that will receive the AuthContext
 * @returns The AuthContext provider wrapping `children`
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        await getUser(); 
        setIsLogin(true);
      } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setIsLogin(false);
          return;
        }
      }
    } finally {
      setLoading(false);
    }
  };

    checkSession();
  }, []);

  const handleLogin = () => {
    setIsLogin(true);
  };

  const handleLogout = async () => {
    await logout();
    setIsLogin(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isLogin, login: handleLogin, logout: handleLogout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}