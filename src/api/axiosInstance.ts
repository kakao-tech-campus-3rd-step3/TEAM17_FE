import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

function getCookieValue(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

axiosInstance.interceptors.request.use(
  (config) => {
    const xsrfToken = getCookieValue('XSRF-TOKEN');

    if (xsrfToken && ['post', 'put', 'delete'].includes(config.method || '')) {
      config.headers['X-XSRF-TOKEN'] = xsrfToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    const tokenFromHeader = response.headers['x-xsrf-token'];
    if (tokenFromHeader) {
      axiosInstance.defaults.headers.common['X-XSRF-TOKEN'] = tokenFromHeader;
    }
    return response;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const url = error.config?.url;

      if (status === 401 && url?.includes('/auth/me')) {
        return Promise.reject(null);
      }
    }

    if (import.meta.env.MODE === 'development') {
      console.error('API Error:', error);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
