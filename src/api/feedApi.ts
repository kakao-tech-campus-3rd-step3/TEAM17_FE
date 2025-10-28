import axiosInstance from './axiosInstance';
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
  CreateReplyRequest,
  Reply,
} from '@/types/Feed';

// ==================== Feed 관련 API ====================

// 피드 목록 조회 (페이지네이션)
export const fetchFeeds = async (
  page: number = FEED_API_CONSTANTS.DEFAULT_PAGE,
  limit: number = FEED_API_CONSTANTS.DEFAULT_PAGE_SIZE
): Promise<FeedResponse> => {
  try {
    const response = await axiosInstance.get<FeedResponse>('/api/feeds', {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch feeds:', error);
    throw error;
  }
};

// 특정 피드 상세 조회
export const fetchFeedById = async (id: number): Promise<FeedDetail> => {
  try {
    const response = await axiosInstance.get<FeedDetail>(`/api/feeds/${id}`);
    return response.data;
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
    const response = await axiosInstance.post<{ isBookmarked: boolean; bookmarkCount: number }>(
      `/api/feeds/${id}/bookmark`
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to toggle bookmark for feed ${id}:`, error);
    throw error;
  }
};

// 피드 좋아요 목록 조회
export const fetchFeedLikers = async (feedId: number): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/api/feeds/${feedId}/likes`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch feed likers for feed ${feedId}:`, error);
    throw error;
  }
};

// ==================== 댓글 관련 API ====================

// 피드의 댓글 목록 조회
export const fetchComments = async (feedId: number): Promise<CommentResponse> => {
  try {
    const response = await axiosInstance.get<CommentResponse>(`/api/feeds/${feedId}/comments`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch comments for feed ${feedId}:`, error);
    throw error;
  }
};

// 댓글 생성
export const createComment = async (data: CreateCommentRequest): Promise<Comment> => {
  try {
    const response = await axiosInstance.post<Comment>(`/api/feeds/${data.feedId}/comments`, {
      content: data.content,
    });
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
    await axiosInstance.delete(`/api/feeds/comments/${commentId}`);
  } catch (error) {
    console.error(`Failed to delete comment ${commentId}:`, error);
    throw error;
  }
};

// 댓글 좋아요 토글
export const toggleCommentLike = async (
  feedId: number,
  commentId: number
): Promise<{ likeCount: number; isLiked: boolean }> => {
  try {
    const response = await axiosInstance.post<{ likeCount: number; isLiked: boolean }>(
      `/api/feeds/${feedId}/comments/${commentId}/like`
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to toggle like for comment ${commentId}:`, error);
    throw error;
  }
};

// ==================== 답글 관련 API ====================

// 답글 생성
export const createReply = async (data: CreateReplyRequest): Promise<Reply> => {
  try {
    const response = await axiosInstance.post<Reply>(`/api/comments/${data.commentId}/replies`, {
      content: data.content,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create reply:', error);
    throw error;
  }
};

// 답글 삭제
export const deleteReply = async (commentId: number, replyId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/comments/${commentId}/replies/${replyId}`);
  } catch (error) {
    console.error(`Failed to delete reply ${replyId}:`, error);
    throw error;
  }
};

// 답글 좋아요 토글
export const toggleReplyLike = async (
  commentId: number,
  replyId: number
): Promise<{ likeCount: number; isLiked: boolean }> => {
  try {
    const response = await axiosInstance.post<{ likeCount: number; isLiked: boolean }>(
      `/api/comments/${commentId}/replies/${replyId}/like`
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to toggle like for reply ${replyId}:`, error);
    throw error;
  }
};
