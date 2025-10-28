import axiosInstance from './axiosInstance';
import type {
  StarterPack,
  StarterPackResponse,
  StarterPackRequest,
  LikeStarterPackResponse,
  BookmarkStarterPackResponse,
} from '@/types/StarterPack';

// 모든 스타터팩 목록 조회
export const fetchStarterPack = async (): Promise<StarterPackResponse> => {
  try {
    const response = await axiosInstance.get<StarterPackResponse>('/api/starterPack/packs');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch starter packs:', error);
    throw error;
  }
};

// 특정 스타터팩 조회
export const fetchStarterPackById = async (id: number): Promise<StarterPack> => {
  try {
    const response = await axiosInstance.get<StarterPack>(`/api/starterPack/packs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch starter pack ${id}:`, error);
    throw error;
  }
};

// 스타터팩 생성
export const createStarterPack = async (data: StarterPackRequest): Promise<StarterPack> => {
  try {
    const response = await axiosInstance.post<StarterPack>('/api/starterPack/packs', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
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
    const response = await axiosInstance.patch<StarterPack>(`/api/starterPack/packs/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to update starter pack ${id}:`, error);
    throw error;
  }
};

// 스타터팩 삭제
export const deleteStarterPack = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/starterPack/packs/${id}`);
  } catch (error) {
    console.error(`Failed to delete starter pack ${id}:`, error);
    throw error;
  }
};

// 스타터팩 좋아요 토글
export const toggleStarterPackLike = async (id: number): Promise<LikeStarterPackResponse> => {
  try {
    const response = await axiosInstance.post<LikeStarterPackResponse>(
      `/api/starterPack/packs/${id}/like`
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to toggle like for starter pack ${id}:`, error);
    throw error;
  }
};

// 스타터팩 북마크 토글
export const toggleStarterPackBookmark = async (
  id: number
): Promise<BookmarkStarterPackResponse> => {
  try {
    const response = await axiosInstance.post<BookmarkStarterPackResponse>(
      `/api/starterPack/packs/${id}/bookmark`
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to toggle bookmark for starter pack ${id}:`, error);
    throw new Error('북마크 처리에 실패했습니다.');
  }
};

// 팩 좋아요 목록 조회
export const fetchPackLikers = async (id: number): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/api/starterPack/packs/${id}/likes`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch pack likers for pack ${id}:`, error);
    throw error;
  }
};

// 카테고리별 스타터팩 조회
export const fetchStarterPackByCategory = async (
  categoryId: number
): Promise<StarterPackResponse> => {
  try {
    const response = await axiosInstance.get<StarterPackResponse>(
      `/api/starterPack/categories/${categoryId}/packs`
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch starter packs by category ${categoryId}:`, error);
    throw error;
  }
};

// ==================== 댓글 관련 API ====================

// 스타터팩 댓글 목록 조회
export const fetchPackComments = async (packId: number): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/api/starterPack/${packId}/comments`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch comments for pack ${packId}:`, error);
    throw error;
  }
};

// 스타터팩 댓글 작성
export const createPackComment = async (packId: number, content: string): Promise<any> => {
  try {
    const response = await axiosInstance.post(`/api/starterPack/${packId}/comments`, {
      content,
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to create comment for pack ${packId}:`, error);
    throw error;
  }
};

// 스타터팩 댓글 수정
export const updatePackComment = async (commentId: number, content: string): Promise<any> => {
  try {
    const response = await axiosInstance.put(`/api/starterPack/comments/${commentId}`, {
      content,
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to update comment ${commentId}:`, error);
    throw error;
  }
};

// 스타터팩 댓글 삭제
export const deletePackComment = async (commentId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/starterPack/comments/${commentId}`);
  } catch (error) {
    console.error(`Failed to delete comment ${commentId}:`, error);
    throw error;
  }
};
