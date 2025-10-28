import axiosInstance from '@/api/axiosInstance';

export const uploadFeed = async (feedData: {
  description: string;
  imageUrl: string;
  categoryId: number;
  hashtagNames: string[];
}) => {
  const response = await axiosInstance.post('/api/feeds', feedData);
  return response.data;
};
