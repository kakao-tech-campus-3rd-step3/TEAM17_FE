import axiosInstance from './axiosInstance';
import { ensureCsrfToken } from '@/utils/csrf';
import { FEED_API_CONSTANTS } from '@/constants/feed';
import type {
  FeedPost,
  FeedDetail,
  FeedResponse,
  CreatePostRequest,
  LikePostResponse,
  Comment,
  CommentResponse,
  CreateCommentRequest,
  PageFeedLikerResponse,
} from '@/types/Feed';

// ==================== Feed 관련 API ====================

// 피드 목록 조회 (페이지네이션)
export const fetchFeeds = async (
  page: number = FEED_API_CONSTANTS.DEFAULT_PAGE,
  size: number = FEED_API_CONSTANTS.DEFAULT_PAGE_SIZE,
  options?: { sort?: string }
): Promise<FeedResponse> => {
  try {
    const params: Record<string, string | number> = {
      page,
      size,
    };

    if (options?.sort) {
      params.sort = options.sort;
    }

    const response = await axiosInstance.get<
      FeedResponse & {
        content: Array<
          FeedPost & {
            stats?: { likeCount?: number; bookmarkCount?: number };
            interactionStatus?: { isLiked?: boolean; isBookmarked?: boolean };
          }
        >;
      }
    >('/api/feeds', { params });

    const feedList = response.data.content as Array<
      FeedPost & {
        stats?: { likeCount?: number; bookmarkCount?: number };
        interactionStatus?: { isLiked?: boolean; isBookmarked?: boolean };
      }
    >;

    const normalizedContent = feedList.map(({ stats, interactionStatus, ...feed }) => {
      const likeCount =
        typeof feed.likeCount === 'number' ? feed.likeCount : (stats?.likeCount ?? 0);
      const bookmarkCount =
        typeof feed.bookmarkCount === 'number' ? feed.bookmarkCount : (stats?.bookmarkCount ?? 0);
      const isLiked =
        typeof feed.isLiked === 'boolean' ? feed.isLiked : (interactionStatus?.isLiked ?? false);
      const isBookmarked =
        typeof feed.isBookmarked === 'boolean'
          ? feed.isBookmarked
          : (interactionStatus?.isBookmarked ?? false);

      return {
        ...feed,
        likeCount,
        bookmarkCount,
        isLiked,
        isBookmarked,
      };
    });

    return {
      ...response.data,
      content: normalizedContent,
    };
  } catch (error) {
    console.error('Failed to fetch feeds:', error);
    throw error;
  }
};

// 특정 피드 상세 조회
export const fetchFeedById = async (id: number): Promise<FeedDetail> => {
  try {
    const response = await axiosInstance.get<
      FeedDetail & {
        stats?: { likeCount?: number; commentCount?: number; bookmarkCount?: number };
        interactionStatus?: { isLiked?: boolean; isBookmarked?: boolean };
      }
    >(`/api/feeds/${id}`);
    const data = response.data;

    const likeCount =
      typeof data.likeCount === 'number' ? data.likeCount : (data.stats?.likeCount ?? 0);
    const commentCount =
      typeof data.commentCount === 'number' ? data.commentCount : (data.stats?.commentCount ?? 0);
    const bookmarkCount =
      typeof data.bookmarkCount === 'number'
        ? data.bookmarkCount
        : (data.stats?.bookmarkCount ?? 0);
    const isLiked =
      typeof data.isLiked === 'boolean' ? data.isLiked : (data.interactionStatus?.isLiked ?? false);
    const isBookmarked =
      typeof data.isBookmarked === 'boolean'
        ? data.isBookmarked
        : (data.interactionStatus?.isBookmarked ?? false);

    return {
      ...data,
      likeCount,
      commentCount,
      bookmarkCount,
      isLiked,
      isBookmarked,
    };
  } catch (error) {
    console.error(`Failed to fetch feed ${id}:`, error);
    throw error;
  }
};

// 피드 생성
export const createFeed = async (data: CreatePostRequest): Promise<FeedPost> => {
  try {
    const response = await axiosInstance.post<FeedPost>('/api/feeds', data);
    return response.data;
  } catch (error) {
    console.error('Failed to create feed:', error);
    throw error;
  }
};

// 피드 수정
export const updateFeed = async (
  id: number,
  data: Partial<CreatePostRequest>
): Promise<FeedPost> => {
  try {
    const response = await axiosInstance.patch<FeedPost>(`/api/feeds/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Failed to update feed ${id}:`, error);
    throw error;
  }
};

// 피드 삭제
export const deleteFeed = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/feeds/${id}`);
  } catch (error) {
    console.error(`Failed to delete feed ${id}:`, error);
    throw error;
  }
};

// 피드 좋아요 토글
export const toggleFeedLike = async (id: number): Promise<LikePostResponse> => {
  try {
    await ensureCsrfToken();
    const response = await axiosInstance.post<LikePostResponse>(`/api/feeds/${id}/like`);
    return response.data;
  } catch (error) {
    console.error(`Failed to toggle like for feed ${id}:`, error);
    throw error;
  }
};

// 피드 북마크 토글
export const toggleFeedBookmark = async (
  id: number
): Promise<{ isBookmarked: boolean; bookmarkCount: number }> => {
  try {
    await ensureCsrfToken();
    const response = await axiosInstance.post<{ isBookmarked: boolean; bookmarkCount: number }>(
      `/api/feeds/${id}/bookmark`
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to toggle bookmark for feed ${id}:`, error);
    throw error;
  }
};

// 피드 좋아요 목록 조회 (페이지네이션)
export const fetchFeedLikers = async (
  feedId: number,
  page: number = FEED_API_CONSTANTS.DEFAULT_PAGE,
  size: number = FEED_API_CONSTANTS.DEFAULT_PAGE_SIZE,
  options?: { sort?: string[] }
): Promise<PageFeedLikerResponse> => {
  try {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('size', size.toString());

    options?.sort?.forEach((sortValue) => {
      params.append('sort', sortValue);
    });

    const response = await axiosInstance.get<PageFeedLikerResponse>(`/api/feeds/${feedId}/likes`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch feed likers for feed ${feedId}:`, error);
    throw error;
  }
};

// ==================== 댓글 관련 API ====================

// 피드의 댓글 목록 조회 (페이지네이션)
export const fetchComments = async (
  feedId: number,
  page: number = FEED_API_CONSTANTS.DEFAULT_PAGE,
  size: number = FEED_API_CONSTANTS.DEFAULT_PAGE_SIZE,
  options?: { sort?: string }
): Promise<CommentResponse> => {
  try {
    const params: Record<string, string | number> = {
      page,
      size,
    };

    if (options?.sort) {
      params.sort = options.sort;
    }

    const response = await axiosInstance.get<CommentResponse>(`/api/feeds/${feedId}/comments`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch comments for feed ${feedId}:`, error);
    throw error;
  }
};

// 댓글 생성 (댓글/대댓글 작성)
// parentId가 있으면 대댓글, 없으면 일반 댓글
export const createComment = async (data: CreateCommentRequest): Promise<Comment> => {
  try {
    await ensureCsrfToken();
    const requestBody: { content: string; parentId?: number | null } = {
      content: data.content,
    };

    if (data.parentId !== null) {
      requestBody.parentId = data.parentId;
    }

    const response = await axiosInstance.post<Comment>(
      `/api/feeds/${data.feedId}/comments`,
      requestBody
    );
    return response.data;
  } catch (error) {
    console.error('Failed to create comment:', error);
    throw error;
  }
};

// 댓글 수정
export const updateComment = async (
  commentId: number,
  data: { content: string }
): Promise<Comment> => {
  try {
    await ensureCsrfToken();
    const response = await axiosInstance.put<Comment>(`/api/feeds/comments/${commentId}`, data);
    return response.data;
  } catch (error) {
    console.error(`Failed to update comment ${commentId}:`, error);
    throw error;
  }
};

// 댓글 삭제
export const deleteComment = async (commentId: number): Promise<void> => {
  try {
    await ensureCsrfToken();
    await axiosInstance.delete(`/api/feeds/comments/${commentId}`);
  } catch (error) {
    console.error(`Failed to delete comment ${commentId}:`, error);
    throw error;
  }
};
