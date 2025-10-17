import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { login, signup, logout, getUser } from '@/api/auth';
import { QUERY_KEYS } from '@/utils/queryKeys';

import type { LoginRequest, SignupRequest, User } from '@/types/AuthTypes';

export const useSignup = () => {
  return useMutation({
    mutationKey: QUERY_KEYS.auth.signup,
    mutationFn: (data: SignupRequest) => signup(data),
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: QUERY_KEYS.auth.login,
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.auth.user });
    },
  });
};

export const useUser = () => {
  const { isLogin } = useAuth();

  return useQuery<User>({
    queryKey: QUERY_KEYS.auth.user,
    queryFn: getUser,
    enabled: isLogin,
    retry: false,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: QUERY_KEYS.auth.logout,
    mutationFn: () => logout(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: QUERY_KEYS.auth.user });
    },
  });
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth는 AuthProvider 안에서만 사용해야 합니다');
  }
  return context;
}
