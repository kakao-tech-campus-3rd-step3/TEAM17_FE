import axiosInstance from './axiosInstance';
import type {
  StarterPack,
  StarterPackResponse,
  StarterPackRequest,
  LikeStarterPackResponse,
} from '@/types/StarterPack';

// 모든 스타터팩 목록 조회
export const fetchStarterPack = async (): Promise<StarterPackResponse> => {
  try {
    const response = await axiosInstance.get<StarterPackResponse>('/api/packs');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch starter packs:', error);
    throw error;
  }
};

// 특정 스타터팩 조회
export const fetchStarterPackById = async (id: number): Promise<StarterPack> => {
  try {
    const response = await axiosInstance.get<StarterPack>(`/api/packs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch starter pack ${id}:`, error);
    throw error;
  }
};

// 스타터팩 생성
export const createStarterPack = async (data: StarterPackRequest): Promise<StarterPack> => {
  try {
    const response = await axiosInstance.post<StarterPack>('/api/packs', data);
    return response.data;
  } catch (error) {
    console.error('Failed to create starter pack:', error);
    throw error;
  }
};

// 스타터팩 수정
export const updateStarterPack = async (
  id: number,
  data: Partial<StarterPackRequest>
): Promise<StarterPack> => {
  try {
    const response = await axiosInstance.put<StarterPack>(`/api/packs/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Failed to update starter pack ${id}:`, error);
    throw error;
  }
};

// 스타터팩 삭제
export const deleteStarterPack = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/packs/${id}`);
  } catch (error) {
    console.error(`Failed to delete starter pack ${id}:`, error);
    throw error;
  }
};

// 스타터팩 좋아요 토글
export const toggleStarterPackLike = async (id: number): Promise<LikeStarterPackResponse> => {
  try {
    const response = await axiosInstance.post<LikeStarterPackResponse>(`/api/packs/${id}/like`);
    return response.data;
  } catch (error) {
    console.error(`Failed to toggle like for starter pack ${id}:`, error);
    throw error;
  }
};
