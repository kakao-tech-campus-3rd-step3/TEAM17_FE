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
  size: number = FEED_API_CONSTANTS.DEFAULT_PAGE_SIZE
): Promise<FeedResponse> => {
  try {
    const response = await axiosInstance.get<FeedResponse>('/api/feeds', {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch feeds:', error);
    throw new Error('피드 목록을 불러오는데 실패했습니다.');
  }
};

// 특정 피드 상세 조회
export const fetchFeedById = async (id: number): Promise<FeedDetail> => {
  try {
    const response = await axiosInstance.get<FeedDetail>(`/api/feeds/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch feed ${id}:`, error);
    throw new Error('피드 정보를 불러오는데 실패했습니다.');
  }
};

// 피드 생성
export const createFeed = async (data: CreatePostRequest): Promise<FeedPost> => {
  try {
    const response = await axiosInstance.post<FeedPost>('/api/feeds', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create feed:', error);
    throw new Error('피드 생성에 실패했습니다.');
  }
};

// 피드 수정
export const updateFeed = async (
  id: number,
  data: Partial<CreatePostRequest>
): Promise<FeedPost> => {
  try {
    const response = await axiosInstance.put<FeedPost>(`/api/feeds/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Failed to update feed ${id}:`, error);
    throw new Error('피드 수정에 실패했습니다.');
  }
};

// 피드 삭제
export const deleteFeed = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/feeds/${id}`);
  } catch (error) {
    console.error(`Failed to delete feed ${id}:`, error);
    throw new Error('피드 삭제에 실패했습니다.');
  }
};

// 피드 좋아요 토글
export const toggleFeedLike = async (id: number): Promise<LikePostResponse> => {
  try {
    const response = await axiosInstance.post<LikePostResponse>(`/api/feeds/${id}/like`);
    return response.data;
  } catch (error) {
    console.error(`Failed to toggle like for feed ${id}:`, error);
    throw new Error('좋아요 처리에 실패했습니다.');
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
    throw new Error('북마크 처리에 실패했습니다.');
  }
};

// ==================== 댓글 관련 API ====================

// 피드의 댓글 목록 조회 (페이지네이션)
export const fetchComments = async (
  feedId: number,
  page: number = 0,
  size: number = 20
): Promise<CommentResponse> => {
  try {
    const response = await axiosInstance.get<CommentResponse>(`/api/feeds/${feedId}/comments`, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch comments for feed ${feedId}:`, error);
    throw new Error('댓글을 불러오는데 실패했습니다.');
  }
};

// 댓글/대댓글 생성 (parentId로 구분)
export const createComment = async (data: CreateCommentRequest): Promise<Comment> => {
  try {
    const requestBody: { content: string; parentId?: number | null } = {
      content: data.content,
    };

    if (data.parentId) {
      requestBody.parentId = data.parentId;
    }

    const response = await axiosInstance.post<Comment>(
      `/api/feeds/${data.feedId}/comments`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to create comment:', error);
    throw new Error('댓글 작성에 실패했습니다.');
  }
};

// 댓글 수정
export const updateComment = async (commentId: number, content: string): Promise<Comment> => {
  try {
    const response = await axiosInstance.put<Comment>(
      `/api/feeds/comments/${commentId}`,
      { content },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to update comment ${commentId}:`, error);
    throw new Error('댓글 수정에 실패했습니다.');
  }
};

// 댓글 삭제
export const deleteComment = async (commentId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/feeds/comments/${commentId}`);
  } catch (error) {
    console.error(`Failed to delete comment ${commentId}:`, error);
    throw new Error('댓글 삭제에 실패했습니다.');
  }
};

// ==================== 답글 관련 API ====================

// 답글 생성
export const createReply = async (data: CreateReplyRequest): Promise<Reply> => {
  try {
    const comment = await createComment({
      feedId: data.feedId,
      content: data.content,
      parentId: data.commentId,
    });

    return {
      ...comment,
      replyId: comment.commentId,
    };
  } catch (error) {
    console.error('Failed to create reply:', error);
    throw new Error('답글 작성에 실패했습니다.');
  }
};

// 답글 삭제
export const deleteReply = async (_commentId: number, replyId: number): Promise<void> => {
  try {
    await deleteComment(replyId);
  } catch (error) {
    console.error(`Failed to delete reply ${replyId}:`, error);
    throw new Error('답글 삭제에 실패했습니다.');
  }
};

// 답글 좋아요 토글
export const toggleReplyLike = async (
  // @ts-ignore - 미구현 API
  commentId: number,
  // @ts-ignore - 미구현 API
  replyId: number
): Promise<{ likeCount: number; isLiked: boolean }> => {
  console.warn('toggleReplyLike: 백엔드 API 스펙 확인 필요');
  throw new Error('답글 좋아요 API 미구현');
};
