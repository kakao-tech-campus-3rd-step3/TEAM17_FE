import { Navigate, useLocation } from 'react-router-dom';
import type { ReactElement } from 'react';
import { useAuth } from '@/hooks/useAuth';

type ProtectedRouteProps = {
  children: ReactElement;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLogin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return null;
  }

  if (!isLogin) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
