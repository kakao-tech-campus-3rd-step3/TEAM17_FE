import axiosInstance from './axiosInstance';

export const signup = async (data: { email: string; password: string; name: string }) => {
  const res = await axiosInstance.post('/api/auth/signup', data);
  return res.data;
};

export const login = async (data: { email: string; password: string }) => {
  const res = await axiosInstance.post('/api/auth/login', data);

  if (res.data?.accessToken) {
    localStorage.setItem('accessToken', res.data.accessToken);
  }

  return res.data;
};
