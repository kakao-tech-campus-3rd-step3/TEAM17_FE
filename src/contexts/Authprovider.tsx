import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import type { ReactNode } from 'react';
import { getUser, logout } from '@/api/auth';
import { useNavigate } from 'react-router-dom';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        await getUser(); 
        setIsLogin(true);
      } catch {
        setIsLogin(false);
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
