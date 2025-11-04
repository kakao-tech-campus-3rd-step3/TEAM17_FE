import axiosInstance from '@/api/axiosInstance';

let csrfTokenPromise: Promise<void> | null = null;

export const ensureCsrfToken = async () => {
  if (axiosInstance.defaults.headers.common['X-XSRF-TOKEN']) return;

  if (!csrfTokenPromise) {
    csrfTokenPromise = (async () => {
      try {
        const res = await axiosInstance.get('/api/auth/csrf-token');
        const token = res.headers['x-xsrf-token'];
        if (!token) throw new Error('CSRF token not found in response headers');
        axiosInstance.defaults.headers.common['X-XSRF-TOKEN'] = token;
      } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
        csrfTokenPromise = null;
        throw new Error('CSRF 토큰을 가져오지 못했습니다. 잠시 후 다시 시도해주세요.');
      }
    })();
  }
  await csrfTokenPromise;
};
