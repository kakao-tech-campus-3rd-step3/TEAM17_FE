import axiosInstance from '@/api/axiosInstance';
import { ensureCsrfToken } from '@/utils/csrf';
import type { FeedUploadData } from '@/types/FeedUpload';

export const uploadFeed = async (feedData: FeedUploadData) => {
  await ensureCsrfToken();
  const { data } = await axiosInstance.post('/api/feeds', feedData);
  return data;
};
