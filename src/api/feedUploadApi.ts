import axiosInstance from '@/api/axiosInstance';
import type { FeedUploadData } from '@/types/FeedUpload';

let csrfTokenPromise: Promise<void> | null = null;

const ensureCsrfToken = async () => {
  if (axiosInstance.defaults.headers.common['X-XSRF-TOKEN']) return;

  if (!csrfTokenPromise) {
    csrfTokenPromise = (async () => {
      try {
        const res = await axiosInstance.get('/api/auth/csrf-token');
        const token = res.headers['x-xsrf-token'];

        if (!token) {
          throw new Error('CSRF token not found in response headers');
        }

        axiosInstance.defaults.headers.common['X-XSRF-TOKEN'] = token;
      } catch (error) {
        console.error('❌ Failed to fetch CSRF token:', error);
        csrfTokenPromise = null;
        throw new Error('CSRF 토큰을 가져오지 못했습니다. 잠시 후 다시 시도해주세요.');
      }
    })();
  }

  await csrfTokenPromise;
};

export const uploadFeed = async (feedData: FeedUploadData) => {
  try {
    await ensureCsrfToken();
    const response = await axiosInstance.post('/api/feeds', feedData);
    return response.data;
  } catch (error) {
    console.error('❌ Feed upload failed:', error);
    throw new Error('피드 업로드에 실패했습니다. 다시 시도해주세요.');
  }
};
