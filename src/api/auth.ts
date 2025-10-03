import axiosInstance from './axiosInstance';
import type { LoginValues } from '@/types/LoginZodSchema'
import type { SignupRequest } from '@/types/AuthTypes'


export const signup = async (data: SignupRequest) => {
  const res = await axiosInstance.post('/api/auth/signup', data)
  return res.data
}

export const login = async (data: LoginValues) => {
  const res = await axiosInstance.post('/api/auth/login', data)
  return res.data
}