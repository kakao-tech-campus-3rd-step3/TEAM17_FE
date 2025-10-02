import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

import { useMutation } from '@tanstack/react-query';
import { login, signup } from '@/api/auth';
import { QUERY_KEYS } from '@/utils/queryKeys';

import type { LoginValues } from '@/types/LoginZodSchema';
import type { SignupRequest } from '@/types/AuthTypes';
import type { Step2Values } from '@/types/SignupZodSchema';

export const useLogin = () => {
  return useMutation({
    mutationKey: QUERY_KEYS.login,
    mutationFn: (data: LoginValues) => login(data),
    onSuccess: (data) => {
      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
      }
    },
  });
};

export const useSignup = () => {
  return useMutation({
    mutationKey: QUERY_KEYS.signup,
    mutationFn: (data: Step2Values) => {
      const step1 = JSON.parse(sessionStorage.getItem('signupStep1') || '{}');

      const finalData: SignupRequest = {
        email: data.email,
        password: data.password,
        name: step1.name,
        birthDate: step1.birthDate,
        gender: step1.gender?.toUpperCase(),
        phoneNumber: step1.telephone,
      };

      return signup(finalData);
    },
    onSuccess: () => {
      console.log('✅ 회원가입 성공');
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
