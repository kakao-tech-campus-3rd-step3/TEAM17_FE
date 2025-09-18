import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const signup = async (data: { email: string; password: string; name: string }) => {
  const res = await api.post('/api/auth/signup', data);
  return res.data;
};

export const login = async (data: { email: string; password: string }) => {
  const res = await api.post('/api/auth/login', data);
  return res.data;
};
