import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchFeeds,
  fetchFeedById,
  createFeed,
  updateFeed,
  deleteFeed,
  toggleFeedLike,
  toggleFeedBookmark,
  fetchComments,
  createComment,
  deleteComment,
  createReply,
  deleteReply,
  toggleReplyLike,
} from '@/api/feedApi';
import { QUERY_KEYS } from '@/utils/queryKeys';
import { parseAxiosError, createUserFriendlyMessage } from '@/utils/errorHandling';
import { FEED_API_CONSTANTS } from '@/constants/feed';
import type {
  FeedDetail,
  FeedResponse,
  CreatePostRequest,
  CreateCommentRequest,
  CreateReplyRequest,
  LikePostResponse,
} from '@/types/Feed';

// 상수 관리
const DECIMAL_RADIX = 10;
const MIN_VALID_ID = 1;

// ==================== Feed 목록 조회 ====================

// 피드 목록 조회 (페이지네이션)
export const useFeeds = (
  page: number = FEED_API_CONSTANTS.DEFAULT_PAGE,
  size: number = FEED_API_CONSTANTS.DEFAULT_PAGE_SIZE
) => {
  const {
    data: feedResponse,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: QUERY_KEYS.feeds.list(page, size),
    queryFn: () => fetchFeeds(page, size),
    throwOnError: false,
  });

  const queryClient = useQueryClient();

  const reset = () => {
    queryClient.removeQueries({ queryKey: QUERY_KEYS.feeds.all });
  };

  return {
    feeds: feedResponse?.content || [],
    totalCount: feedResponse?.totalElements || 0,
    currentPage: feedResponse?.number || page,
    totalPages: feedResponse?.totalPages || 0,
    hasNext: !feedResponse?.last,
    hasPrevious: !feedResponse?.first,
    loading,
    error: error
      ? createUserFriendlyMessage(parseAxiosError(error), '피드 목록을 불러오는데 실패했습니다.')
      : null,
    refresh: refetch,
    reset,
  };
};

// ==================== Feed 상세 조회 ====================

// 특정 피드 상세 조회
export const useFeedById = (id: number | string | undefined) => {
  const feedId = typeof id === 'string' ? parseInt(id, DECIMAL_RADIX) : id;
  const isValidId = !!feedId && !isNaN(feedId) && feedId >= MIN_VALID_ID;

  const {
    data: feed,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: isValidId ? QUERY_KEYS.feeds.detail(feedId) : ['feeds', 'detail', 'invalid'],
    queryFn: isValidId ? () => fetchFeedById(feedId) : undefined,
    enabled: isValidId,
    throwOnError: false,
  });

  const queryClient = useQueryClient();

  const reset = () => {
    if (isValidId) {
      queryClient.removeQueries({ queryKey: QUERY_KEYS.feeds.detail(feedId) });
    }
  };

  return {
    feed,
    loading,
    error: error
      ? createUserFriendlyMessage(parseAxiosError(error), '피드 정보를 불러오는데 실패했습니다.')
      : null,
    refresh: refetch,
    reset,
  };
};

// ==================== Feed CRUD 작업 ====================

// 피드 CRUD 작업 관리하는 훅
export const useFeedActions = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createFeed,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.feeds.lists });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreatePostRequest> }) =>
      updateFeed(id, data),
    onSuccess: (updatedFeed, { id }) => {
      queryClient.setQueryData(QUERY_KEYS.feeds.detail(id), updatedFeed);
      queryClient.setQueriesData(
        { queryKey: QUERY_KEYS.feeds.lists },
        (old: FeedResponse | undefined) => {
          if (!old?.content) return old;
          return {
            ...old,
            content: old.content.map((feed) => (feed.feedId === id ? updatedFeed : feed)),
          };
        }
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFeed,
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: QUERY_KEYS.feeds.detail(id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.feeds.lists });
    },
  });

  const create = async (data: CreatePostRequest) => {
    return createMutation.mutateAsync(data);
  };

  const update = async (id: number, data: Partial<CreatePostRequest>) => {
    return updateMutation.mutateAsync({ id, data });
  };

  const remove = async (id: number) => {
    return deleteMutation.mutateAsync(id);
  };

  const loading = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  const error = createMutation.error
    ? createUserFriendlyMessage(
        parseAxiosError(createMutation.error),
        '피드 작업 중 오류가 발생했습니다.'
      )
    : updateMutation.error
      ? createUserFriendlyMessage(
          parseAxiosError(updateMutation.error),
          '피드 수정 중 오류가 발생했습니다.'
        )
      : deleteMutation.error
        ? createUserFriendlyMessage(
            parseAxiosError(deleteMutation.error),
            '피드 삭제 중 오류가 발생했습니다.'
          )
        : null;

  const clearError = () => {
    createMutation.reset();
    updateMutation.reset();
    deleteMutation.reset();
  };

  return {
    create,
    update,
    remove,
    loading,
    error,
    clearError,
  };
};

// ==================== Feed 좋아요 관리 ====================

// 피드 좋아요 관리
export const useFeedLike = (id: number) => {
  const queryClient = useQueryClient();

  const toggleLikeMutation = useMutation({
    mutationFn: () => toggleFeedLike(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.feeds.detail(id) });

      const previousFeed = queryClient.getQueryData(QUERY_KEYS.feeds.detail(id));

      queryClient.setQueryData(QUERY_KEYS.feeds.detail(id), (old: FeedDetail | undefined) => {
        if (!old) return old;
        return {
          ...old,
          isLiked: !old.isLiked,
          likeCount: old.isLiked ? Math.max(0, old.likeCount - 1) : old.likeCount + 1,
        };
      });

      queryClient.setQueriesData(
        { queryKey: QUERY_KEYS.feeds.lists },
        (old: FeedResponse | undefined) => {
          if (!old?.content) return old;
          return {
            ...old,
            content: old.content.map((feed) =>
              feed.feedId === id
                ? {
                    ...feed,
                    isLiked: !feed.isLiked,
                    likeCount: feed.isLiked ? Math.max(0, feed.likeCount - 1) : feed.likeCount + 1,
                  }
                : feed
            ),
          };
        }
      );

      return { previousFeed };
    },
    onSuccess: (result: LikePostResponse) => {
      queryClient.setQueryData(QUERY_KEYS.feeds.detail(id), (old: FeedDetail | undefined) => {
        if (!old) return old;
        return {
          ...old,
          isLiked: result.isLiked,
          likeCount: result.likeCount,
        };
      });

      queryClient.setQueriesData(
        { queryKey: QUERY_KEYS.feeds.lists },
        (old: FeedResponse | undefined) => {
          if (!old?.content) return old;
          return {
            ...old,
            content: old.content.map((feed) =>
              feed.feedId === id
                ? { ...feed, isLiked: result.isLiked, likeCount: result.likeCount }
                : feed
            ),
          };
        }
      );
    },
    onError: (_, __, context) => {
      if (context?.previousFeed) {
        queryClient.setQueryData(QUERY_KEYS.feeds.detail(id), context.previousFeed);
      }
      // 목록은 무효화하여 서버 데이터로 복구
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.feeds.lists });
    },
  });

  const handleToggleLike = () => {
    if (toggleLikeMutation.isPending) return;
    toggleLikeMutation.mutate();
  };

  return {
    toggleLike: handleToggleLike,
    loading: toggleLikeMutation.isPending,
    error: toggleLikeMutation.error
      ? createUserFriendlyMessage(
          parseAxiosError(toggleLikeMutation.error),
          '좋아요 처리에 실패했습니다.'
        )
      : null,
  };
};

// ==================== Feed 북마크 관리 ====================

// 피드 북마크 관리
export const useFeedBookmark = (id: number) => {
  const queryClient = useQueryClient();

  const toggleBookmarkMutation = useMutation({
    mutationFn: () => toggleFeedBookmark(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.feeds.detail(id) });

      const previousFeed = queryClient.getQueryData(QUERY_KEYS.feeds.detail(id));

      queryClient.setQueryData(QUERY_KEYS.feeds.detail(id), (old: FeedDetail | undefined) => {
        if (!old) return old;
        return {
          ...old,
          isBookmarked: !old.isBookmarked,
          bookmarkCount: old.isBookmarked
            ? Math.max(0, old.bookmarkCount - 1)
            : old.bookmarkCount + 1,
        };
      });

      queryClient.setQueriesData(
        { queryKey: QUERY_KEYS.feeds.lists },
        (old: FeedResponse | undefined) => {
          if (!old?.content) return old;
          return {
            ...old,
            content: old.content.map((feed) => {
              if (feed.feedId !== id) return feed;
              // FeedDetail 타입인 경우에만 북마크 업데이트
              const feedWithBookmark = feed as unknown as FeedDetail;
              if (!('isBookmarked' in feedWithBookmark) || !('bookmarkCount' in feedWithBookmark))
                return feed;
              return {
                ...feedWithBookmark,
                isBookmarked: !feedWithBookmark.isBookmarked,
                bookmarkCount: feedWithBookmark.isBookmarked
                  ? Math.max(0, feedWithBookmark.bookmarkCount - 1)
                  : feedWithBookmark.bookmarkCount + 1,
              };
            }),
          };
        }
      );

      return { previousFeed };
    },
    onSuccess: (result) => {
      queryClient.setQueryData(QUERY_KEYS.feeds.detail(id), (old: FeedDetail | undefined) => {
        if (!old) return old;
        return {
          ...old,
          isBookmarked: result.isBookmarked,
          bookmarkCount: result.bookmarkCount,
        };
      });

      queryClient.setQueriesData(
        { queryKey: QUERY_KEYS.feeds.lists },
        (old: FeedResponse | undefined) => {
          if (!old?.content) return old;
          return {
            ...old,
            content: old.content.map((feed) => {
              if (feed.feedId !== id) return feed;
              // FeedDetail 타입인 경우에만 북마크 업데이트
              const feedWithBookmark = feed as unknown as FeedDetail;
              if (!('isBookmarked' in feedWithBookmark) || !('bookmarkCount' in feedWithBookmark))
                return feed;
              return {
                ...feedWithBookmark,
                isBookmarked: result.isBookmarked,
                bookmarkCount: result.bookmarkCount,
              };
            }),
          };
        }
      );
    },
    onError: (_, __, context) => {
      // 실패 시 상세 캐시 롤백
      if (context?.previousFeed) {
        queryClient.setQueryData(QUERY_KEYS.feeds.detail(id), context.previousFeed);
      }
      // 목록은 무효화하여 서버 데이터로 복구
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.feeds.lists });
    },
  });

  const handleToggleBookmark = () => {
    if (toggleBookmarkMutation.isPending) return;
    toggleBookmarkMutation.mutate();
  };

  return {
    toggleBookmark: handleToggleBookmark,
    loading: toggleBookmarkMutation.isPending,
    error: toggleBookmarkMutation.error
      ? createUserFriendlyMessage(
          parseAxiosError(toggleBookmarkMutation.error),
          '북마크 처리에 실패했습니다.'
        )
      : null,
  };
};

// ==================== 댓글 관련 ====================

// 피드의 댓글 목록 조회
export const useComments = (feedId: number) => {
  const {
    data: commentResponse,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: QUERY_KEYS.feeds.comments(feedId),
    queryFn: () => fetchComments(feedId),
    enabled: !!feedId,
    throwOnError: false,
  });

  const queryClient = useQueryClient();

  const reset = () => {
    queryClient.removeQueries({ queryKey: QUERY_KEYS.feeds.comments(feedId) });
  };

  return {
    comments: commentResponse?.content || [],
    totalCount: commentResponse?.totalElements || 0,
    loading,
    error: error
      ? createUserFriendlyMessage(parseAxiosError(error), '댓글을 불러오는데 실패했습니다.')
      : null,
    refresh: refetch,
    reset,
  };
};

// 댓글 및 답글 CRUD 작업 관리
export const useCommentActions = (feedId: number) => {
  const queryClient = useQueryClient();

  // 댓글 생성
  const createCommentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.feeds.comments(feedId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.feeds.detail(feedId) });
    },
  });

  // 댓글 삭제
  const deleteCommentMutation = useMutation({
    mutationFn: ({ commentId }: { commentId: number }) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.feeds.comments(feedId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.feeds.detail(feedId) });
    },
  });

  const toggleCommentLikeMutation = useMutation({
    mutationFn: () => {
      console.warn('toggleCommentLike: 백엔드 API 스펙 확인 필요');
      throw new Error('댓글 좋아요 API 미구현');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.feeds.comments(feedId) });
    },
  });

  // 답글 생성
  const createReplyMutation = useMutation({
    mutationFn: createReply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.feeds.comments(feedId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.feeds.detail(feedId) });
    },
  });

  // 답글 삭제
  const deleteReplyMutation = useMutation({
    mutationFn: ({ commentId, replyId }: { commentId: number; replyId: number }) =>
      deleteReply(commentId, replyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.feeds.comments(feedId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.feeds.detail(feedId) });
    },
  });

  // 답글 좋아요 토글
  const toggleReplyLikeMutation = useMutation({
    mutationFn: ({ commentId, replyId }: { commentId: number; replyId: number }) =>
      toggleReplyLike(commentId, replyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.feeds.comments(feedId) });
    },
  });

  const addComment = async (data: CreateCommentRequest) => {
    return createCommentMutation.mutateAsync(data);
  };

  const removeComment = async (commentId: number) => {
    return deleteCommentMutation.mutateAsync({ commentId });
  };

  // @ts-ignore - 미구현 API
  const likeComment = async (commentId: number) => {
    return toggleCommentLikeMutation.mutateAsync();
  };

  const addReply = async (data: CreateReplyRequest) => {
    return createReplyMutation.mutateAsync(data);
  };

  const removeReply = async (commentId: number, replyId: number) => {
    return deleteReplyMutation.mutateAsync({ commentId, replyId });
  };

  const likeReply = async (commentId: number, replyId: number) => {
    return toggleReplyLikeMutation.mutateAsync({ commentId, replyId });
  };

  const loading =
    createCommentMutation.isPending ||
    deleteCommentMutation.isPending ||
    toggleCommentLikeMutation.isPending ||
    createReplyMutation.isPending ||
    deleteReplyMutation.isPending ||
    toggleReplyLikeMutation.isPending;

  const error = createCommentMutation.error
    ? createUserFriendlyMessage(
        parseAxiosError(createCommentMutation.error),
        '댓글 작성에 실패했습니다.'
      )
    : deleteCommentMutation.error
      ? createUserFriendlyMessage(
          parseAxiosError(deleteCommentMutation.error),
          '댓글 삭제에 실패했습니다.'
        )
      : toggleCommentLikeMutation.error
        ? createUserFriendlyMessage(
            parseAxiosError(toggleCommentLikeMutation.error),
            '댓글 좋아요 처리에 실패했습니다.'
          )
        : createReplyMutation.error
          ? createUserFriendlyMessage(
              parseAxiosError(createReplyMutation.error),
              '답글 작성에 실패했습니다.'
            )
          : deleteReplyMutation.error
            ? createUserFriendlyMessage(
                parseAxiosError(deleteReplyMutation.error),
                '답글 삭제에 실패했습니다.'
              )
            : toggleReplyLikeMutation.error
              ? createUserFriendlyMessage(
                  parseAxiosError(toggleReplyLikeMutation.error),
                  '답글 좋아요 처리에 실패했습니다.'
                )
              : null;

  const clearError = () => {
    createCommentMutation.reset();
    deleteCommentMutation.reset();
    toggleCommentLikeMutation.reset();
    createReplyMutation.reset();
    deleteReplyMutation.reset();
    toggleReplyLikeMutation.reset();
  };

  return {
    addComment,
    removeComment,
    likeComment,
    addReply,
    removeReply,
    likeReply,
    loading,
    error,
    clearError,
  };
};
