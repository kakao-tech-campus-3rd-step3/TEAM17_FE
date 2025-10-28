import axiosInstance from '@/api/axiosInstance';

const ensureCsrfToken = async () => {
  if (!axiosInstance.defaults.headers.common['X-XSRF-TOKEN']) {
    const res = await axiosInstance.get('/api/auth/csrf-token');
    const token = res.headers['x-xsrf-token'];
    if (token) {
      axiosInstance.defaults.headers.common['X-XSRF-TOKEN'] = token;
    }
  }
};

export const uploadFeed = async (feedData: {
  description: string;
  imageUrl: string;
  categoryId: number;
  hashtagNames: string[];
}) => {
  await ensureCsrfToken(); 
  const response = await axiosInstance.post('/api/feeds', feedData);
  return response.data;
};
