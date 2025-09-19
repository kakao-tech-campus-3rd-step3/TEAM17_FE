import axios from 'axios';
import type { StarterPack, StarterPackResponse, StarterPackRequest } from '@/types/StarterPack';

// API 기본 설정
const api = axios.create({
  baseURL: 'https://team17be-production.up.railway.app',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    // 토큰이 있다면 헤더에 추가
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (에러 처리용)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// 모든 스타터팩 목록 조회
export const fetchStarterPacks = async (): Promise<StarterPackResponse> => {
  try {
    const response = await api.get<StarterPackResponse>('/api/packs');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch starter packs:', error);
    throw new Error('스타터팩 목록을 불러오는데 실패했습니다.');
  }
};

// 특정 스타터팩 조회
export const fetchStarterPackById = async (id: number): Promise<StarterPack> => {
  try {
    const response = await api.get<StarterPack>(`/api/packs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch starter pack ${id}:`, error);
    throw new Error('스타터팩 정보를 불러오는데 실패했습니다.');
  }
};

// 스타터팩 생성
export const createStarterPack = async (data: StarterPackRequest): Promise<StarterPack> => {
  try {
    const response = await api.post<StarterPack>('/api/packs', data);
    return response.data;
  } catch (error) {
    console.error('Failed to create starter pack:', error);
    throw new Error('스타터팩 생성에 실패했습니다.');
  }
};

// 스타터팩 수정
export const updateStarterPack = async (
  id: number,
  data: Partial<StarterPackRequest>
): Promise<StarterPack> => {
  try {
    const response = await api.put<StarterPack>(`/api/packs/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Failed to update starter pack ${id}:`, error);
    throw new Error('스타터팩 수정에 실패했습니다.');
  }
};

// 스타터팩 삭제
export const deleteStarterPack = async (id: number): Promise<void> => {
  try {
    await api.delete(`/api/packs/${id}`);
  } catch (error) {
    console.error(`Failed to delete starter pack ${id}:`, error);
    throw new Error('스타터팩 삭제에 실패했습니다.');
  }
};

// 스타터팩 좋아요 토글
export const toggleStarterPackLike = async (id: number): Promise<{ likes: number }> => {
  try {
    const response = await api.post<{ likes: number }>(`/api/packs/${id}/like`);
    return response.data;
  } catch (error) {
    console.error(`Failed to toggle like for starter pack ${id}:`, error);
    throw new Error('좋아요 처리에 실패했습니다.');
  }
};
