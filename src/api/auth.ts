import axiosInstance from './axiosInstance';
import type { LoginValues } from '@/types/LoginZodSchema'
import type { Step2Values } from '@/types/SignupZodSchema'

export const signup = async (data: Step2Values) => {
  const res = await axiosInstance.post('/api/auth/signup', data)
  return res.data
}

export const login = async (data: LoginValues) => {
  const res = await axiosInstance.post('/api/auth/login', data)
  return res.data
}