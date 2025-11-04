import axiosInstance from './axiosInstance';
import type { LoginRequest, SignupRequest, User, RefreshResponse } from '@/types/AuthTypes';
import { ensureCsrfToken } from '@/utils/csrf';

export const signup = async (data: SignupRequest): Promise<User> => {
  await ensureCsrfToken();
  const res = await axiosInstance.post<User>('/api/auth/signup', data);
  return res.data;
};

export const login = async (data: LoginRequest): Promise<User> => {
  await ensureCsrfToken();
  await axiosInstance.post('/api/auth/login', data);
  
  const res = await axiosInstance.get<User>('/api/auth/me');
  return res.data;
};

export const logout = async (): Promise<void> => {
  await ensureCsrfToken();
  await axiosInstance.post('/api/auth/logout');
};

export const refresh = async (): Promise<RefreshResponse> => {
  await ensureCsrfToken();
  const res = await axiosInstance.post<RefreshResponse>('/api/auth/refresh');
  return res.data;
};

export const getUser = async (): Promise<User> => {
  const res = await axiosInstance.get<User>('/api/auth/me');
  return res.data;
};
