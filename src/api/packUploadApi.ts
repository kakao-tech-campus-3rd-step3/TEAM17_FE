import axiosInstance from '@/api/axiosInstance';

export const uploadPack = async (packData: {
  categoryId: number;
  name: string;
  price: number;
  mainImageUrl: string;
  description: string;
  items: {
    name: string;
    linkUrl: string;
    description: string;
    imageUrl: string;
  }[];
  hashtagNames: string[];
}) => {
  const response = await axiosInstance.post('/api/starterPack/packs', packData);
  return response.data;
};
