import axiosInstance from './axiosInstance';
import { ensureCsrfToken } from '@/utils/csrf';
import type {
  StarterPack,
  StarterPackResponse,
  StarterPackRequest,
  LikeStarterPackResponse,
  BookmarkStarterPackResponse,
  PagePackLikerResponse,
  PagePackCommentResponse,
  PackCommentResponse,
} from '@/types/StarterPack';

export const fetchStarterPack = async (
  page: number = 0,
  size: number = 12,
  options?: { sort?: string; category?: string }
): Promise<StarterPackResponse> => {
  try {
    const params: Record<string, string | number> = {
      page,
      size,
    };

    if (options?.sort) {
      params.sort = options.sort;
    }

    if (options?.category) {
      params.category = options.category;
    }

    const response = await axiosInstance.get<
      StarterPackResponse & {
        [key: string]: Array<
          StarterPack & {
            stats?: { likeCount?: number; bookmarkCount?: number; commentCount?: number };
            interactionStatus?: { isLiked?: boolean; isBookmarked?: boolean };
          }
        >;
      }
    >('/api/starterPack/packs', {
      params,
    });

    const normalized: StarterPackResponse = {};

    Object.keys(response.data).forEach((key) => {
      const packs = response.data[key] as Array<
        StarterPack & {
          stats?: { likeCount?: number; bookmarkCount?: number; commentCount?: number };
          interactionStatus?: { isLiked?: boolean; isBookmarked?: boolean };
        }
      >;

      normalized[key] = packs.map(({ stats, interactionStatus, ...rest }) => {
        const likeCount =
          typeof rest.likeCount === 'number' ? rest.likeCount : (stats?.likeCount ?? 0);
        const bookmarkCount =
          typeof rest.bookmarkCount === 'number' ? rest.bookmarkCount : (stats?.bookmarkCount ?? 0);
        const commentCount =
          typeof rest.commentCount === 'number' ? rest.commentCount : (stats?.commentCount ?? 0);
        const isLiked =
          typeof rest.isLiked === 'boolean' ? rest.isLiked : (interactionStatus?.isLiked ?? false);
        const isBookmarked =
          typeof rest.isBookmarked === 'boolean'
            ? rest.isBookmarked
            : (interactionStatus?.isBookmarked ?? false);

        return {
          ...rest,
          likeCount,
          bookmarkCount,
          commentCount,
          isLiked,
          isBookmarked,
        };
      });
    });

    return normalized;
  } catch (error) {
    console.error('Failed to fetch starter packs:', error);
    throw error;
  }
};

// 특정 스타터팩 조회
export const fetchStarterPackById = async (id: number): Promise<StarterPack> => {
  try {
    const response = await axiosInstance.get<
      StarterPack & {
        stats?: { likeCount?: number; bookmarkCount?: number; commentCount?: number };
        interactionStatus?: { isLiked?: boolean; isBookmarked?: boolean };
      }
    >(`/api/starterPack/packs/${id}`);

    const data = response.data as StarterPack & {
      stats?: { likeCount?: number; bookmarkCount?: number; commentCount?: number };
      interactionStatus?: { isLiked?: boolean; isBookmarked?: boolean };
    };

    const { stats, interactionStatus, ...rest } = data;

    const likeCount = typeof rest.likeCount === 'number' ? rest.likeCount : (stats?.likeCount ?? 0);
    const bookmarkCount =
      typeof rest.bookmarkCount === 'number' ? rest.bookmarkCount : (stats?.bookmarkCount ?? 0);
    const commentCount =
      typeof rest.commentCount === 'number' ? rest.commentCount : (stats?.commentCount ?? 0);
    const isLiked =
      typeof rest.isLiked === 'boolean' ? rest.isLiked : (interactionStatus?.isLiked ?? false);
    const isBookmarked =
      typeof rest.isBookmarked === 'boolean'
        ? rest.isBookmarked
        : (interactionStatus?.isBookmarked ?? false);

    return {
      ...rest,
      likeCount,
      bookmarkCount,
      commentCount,
      isLiked,
      isBookmarked,
    };
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
    await ensureCsrfToken();
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
    await ensureCsrfToken();
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
export const fetchPackLikers = async (id: number): Promise<PagePackLikerResponse> => {
  try {
    const response = await axiosInstance.get<PagePackLikerResponse>(
      `/api/starterPack/packs/${id}/likes`
    );
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
    const response = await axiosInstance.get<
      StarterPackResponse & {
        [key: string]: Array<
          StarterPack & {
            stats?: { likeCount?: number; bookmarkCount?: number; commentCount?: number };
            interactionStatus?: { isLiked?: boolean; isBookmarked?: boolean };
          }
        >;
      }
    >(`/api/starterPack/categories/${categoryId}/packs`);

    const normalized: StarterPackResponse = {};

    Object.keys(response.data).forEach((key) => {
      const packs = response.data[key] as Array<
        StarterPack & {
          stats?: { likeCount?: number; bookmarkCount?: number; commentCount?: number };
          interactionStatus?: { isLiked?: boolean; isBookmarked?: boolean };
        }
      >;

      normalized[key] = packs.map(({ stats, interactionStatus, ...rest }) => {
        const likeCount =
          typeof rest.likeCount === 'number' ? rest.likeCount : (stats?.likeCount ?? 0);
        const bookmarkCount =
          typeof rest.bookmarkCount === 'number' ? rest.bookmarkCount : (stats?.bookmarkCount ?? 0);
        const commentCount =
          typeof rest.commentCount === 'number' ? rest.commentCount : (stats?.commentCount ?? 0);
        const isLiked =
          typeof rest.isLiked === 'boolean' ? rest.isLiked : (interactionStatus?.isLiked ?? false);
        const isBookmarked =
          typeof rest.isBookmarked === 'boolean'
            ? rest.isBookmarked
            : (interactionStatus?.isBookmarked ?? false);

        return {
          ...rest,
          likeCount,
          bookmarkCount,
          commentCount,
          isLiked,
          isBookmarked,
        };
      });
    });

    return normalized;
  } catch (error) {
    console.error(`Failed to fetch starter packs by category ${categoryId}:`, error);
    throw error;
  }
};

// ==================== 댓글 관련 API ====================

// 스타터팩 댓글 목록 조회 (페이지네이션)
export const fetchPackComments = async (
  packId: number,
  page: number = 0,
  size: number = 10,
  options?: { sort?: string }
): Promise<PagePackCommentResponse> => {
  try {
    const params: Record<string, string | number> = {
      page,
      size,
    };

    if (options?.sort) {
      params.sort = options.sort;
    }

    const response = await axiosInstance.get<PagePackCommentResponse>(
      `/api/starterPack/${packId}/comments`,
      { params }
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch comments for pack ${packId}:`, error);
    throw error;
  }
};

// 스타터팩 댓글 작성 (댓글/대댓글 작성)
// parentId가 있으면 대댓글, 없으면 일반 댓글
export const createPackComment = async (
  packId: number,
  content: string,
  parentId?: number | null
): Promise<PackCommentResponse> => {
  try {
    await ensureCsrfToken();
    const requestBody: { content: string; parentId?: number | null } = {
      content,
    };

    if (parentId !== null && parentId !== undefined) {
      requestBody.parentId = parentId;
    }

    const response = await axiosInstance.post<PackCommentResponse>(
      `/api/starterPack/${packId}/comments`,
      requestBody
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to create comment for pack ${packId}:`, error);
    throw error;
  }
};

// 스타터팩 댓글 수정
export const updatePackComment = async (
  commentId: number,
  content: string
): Promise<PackCommentResponse> => {
  try {
    await ensureCsrfToken();
    const response = await axiosInstance.put<PackCommentResponse>(
      `/api/starterPack/comments/${commentId}`,
      {
        content,
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to update comment ${commentId}:`, error);
    throw error;
  }
};

// 스타터팩 댓글 삭제
export const deletePackComment = async (commentId: number): Promise<void> => {
  try {
    await ensureCsrfToken();
    await axiosInstance.delete(`/api/starterPack/comments/${commentId}`);
  } catch (error) {
    console.error(`Failed to delete comment ${commentId}:`, error);
    throw error;
  }
};

// 스타터팩 댓글 좋아요 토글
export const togglePackCommentLike = async (
  commentId: number
): Promise<{ likeCount: number; isLiked: boolean }> => {
  try {
    await ensureCsrfToken();
    const response = await axiosInstance.post<{ likeCount: number; isLiked: boolean }>(
      `/api/starterPack/comments/${commentId}/like`
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to toggle like for pack comment ${commentId}:`, error);
    throw error;
  }
};
