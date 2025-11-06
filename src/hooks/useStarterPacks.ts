import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchStarterPack,
  fetchStarterPackById,
  createStarterPack,
  updateStarterPack,
  deleteStarterPack,
  toggleStarterPackLike,
  toggleStarterPackBookmark,
  fetchPackComments,
  createPackComment,
  updatePackComment,
  deletePackComment,
  togglePackCommentLike,
} from '@/api/starterPackApi';
import { QUERY_KEYS } from '@/utils/queryKeys';
import { parseAxiosError, createUserFriendlyMessage } from '@/utils/errorHandling';
import type {
  StarterPack,
  StarterPackResponse,
  StarterPackRequest,
  LikeStarterPackResponse,
  BookmarkStarterPackResponse,
  PackCommentResponse,
  PagePackCommentResponse,
} from '@/types/StarterPack';
import type { Comment } from '@/types/Feed';

const PACK_COMMENT_DEFAULT_PAGE = 0;
const PACK_COMMENT_DEFAULT_SIZE = 10;

// 모든 스타터팩 목록 관리하는 훅
export const useStarterPack = () => {
  const {
    data: starterPack = {},
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: QUERY_KEYS.starterPacks.list,
    queryFn: () => fetchStarterPack(),
    throwOnError: false,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const queryClient = useQueryClient();

  const reset = () => {
    queryClient.removeQueries({ queryKey: QUERY_KEYS.starterPacks.all });
  };

  return {
    starterPack,
    loading,
    error: error
      ? createUserFriendlyMessage(
          parseAxiosError(error),
          '스타터팩 목록을 불러오는데 실패했습니다.'
        )
      : null,
    refresh: refetch,
    reset,
  };
};

export const useStarterPackById = (id: number) => {
  const {
    data: starterPack,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: QUERY_KEYS.starterPacks.detail(id),
    queryFn: () => fetchStarterPackById(id),
    enabled: !!id,
    throwOnError: false,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const queryClient = useQueryClient();

  const reset = () => {
    queryClient.removeQueries({ queryKey: QUERY_KEYS.starterPacks.detail(id) });
  };

  return {
    starterPack,
    loading,
    error: error
      ? createUserFriendlyMessage(
          parseAxiosError(error),
          '스타터팩 정보를 불러오는데 실패했습니다.'
        )
      : null,
    refresh: refetch,
    reset,
  };
};

// 스타터팩 CRUD 작업 관리하는 훅
export const useStarterPackActions = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createStarterPack,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.starterPacks.list });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<StarterPackRequest> }) =>
      updateStarterPack(id, data),
    onSuccess: (updatedPack, { id }) => {
      queryClient.setQueryData(QUERY_KEYS.starterPacks.detail(id), updatedPack);
      queryClient.setQueryData(
        QUERY_KEYS.starterPacks.list,
        (old: StarterPackResponse | undefined) => {
          if (!old) return old;

          const updated: StarterPackResponse = {};
          for (const key in old) {
            updated[key] = old[key].map((pack) => (pack.id === id ? updatedPack : pack));
          }
          return updated;
        }
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteStarterPack,
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: QUERY_KEYS.starterPacks.detail(id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.starterPacks.list });
    },
  });

  const toggleLikeMutation = useMutation({
    mutationFn: toggleStarterPackLike,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.starterPacks.detail(id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.starterPacks.list });
    },
  });

  const create = async (data: StarterPackRequest) => {
    return createMutation.mutateAsync(data);
  };

  const update = async (id: number, data: Partial<StarterPackRequest>) => {
    return updateMutation.mutateAsync({ id, data });
  };

  const remove = async (id: number) => {
    return deleteMutation.mutateAsync(id);
  };

  const toggleLike = async (id: number) => {
    return toggleLikeMutation.mutateAsync(id);
  };

  const loading =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending ||
    toggleLikeMutation.isPending;

  const error = createMutation.error
    ? createUserFriendlyMessage(
        parseAxiosError(createMutation.error),
        '스타터팩 작업 중 오류가 발생했습니다.'
      )
    : updateMutation.error
      ? createUserFriendlyMessage(
          parseAxiosError(updateMutation.error),
          '스타터팩 수정 중 오류가 발생했습니다.'
        )
      : deleteMutation.error
        ? createUserFriendlyMessage(
            parseAxiosError(deleteMutation.error),
            '스타터팩 삭제 중 오류가 발생했습니다.'
          )
        : toggleLikeMutation.error
          ? createUserFriendlyMessage(
              parseAxiosError(toggleLikeMutation.error),
              '좋아요 처리에 실패했습니다.'
            )
          : null;

  const clearError = () => {
    createMutation.reset();
    updateMutation.reset();
    deleteMutation.reset();
    toggleLikeMutation.reset();
  };

  return {
    create,
    update,
    remove,
    toggleLike,
    loading,
    error,
    clearError,
  };
};

// 스타터팩 좋아요 관리 훅
export const useStarterPackLike = (id: number) => {
  const queryClient = useQueryClient();

  const toggleLikeMutation = useMutation({
    mutationFn: () => toggleStarterPackLike(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.starterPacks.detail(id) });

      const previousPack = queryClient.getQueryData(QUERY_KEYS.starterPacks.detail(id));

      queryClient.setQueryData(
        QUERY_KEYS.starterPacks.detail(id),
        (old: StarterPack | undefined) => {
          if (!old) return old;
          const currentIsLiked = (old as StarterPack & { isLiked?: boolean }).isLiked ?? false;
          return {
            ...old,
            isLiked: !currentIsLiked,
            likeCount: currentIsLiked ? Math.max(0, old.likeCount - 1) : old.likeCount + 1,
          };
        }
      );

      queryClient.setQueryData(
        QUERY_KEYS.starterPacks.list,
        (old: StarterPackResponse | undefined) => {
          if (!old) return old;

          const updatePack = (pack: StarterPack) => {
            const currentIsLiked = (pack as StarterPack & { isLiked?: boolean }).isLiked ?? false;
            return pack.id === id
              ? {
                  ...pack,
                  isLiked: !currentIsLiked,
                  likeCount: currentIsLiked ? Math.max(0, pack.likeCount - 1) : pack.likeCount + 1,
                }
              : pack;
          };

          const updated: StarterPackResponse = {};
          for (const key in old) {
            updated[key] = old[key].map(updatePack);
          }
          return updated;
        }
      );

      return { previousPack };
    },
    onSuccess: (result: LikeStarterPackResponse) => {
      queryClient.setQueryData(
        QUERY_KEYS.starterPacks.detail(id),
        (old: StarterPack | undefined) => {
          if (!old) return old;
          return {
            ...old,
            likeCount: result.likeCount,
            isLiked: result.isLiked,
          };
        }
      );

      queryClient.setQueryData(
        QUERY_KEYS.starterPacks.list,
        (old: StarterPackResponse | undefined) => {
          if (!old) return old;

          const updatePack = (pack: StarterPack) =>
            pack.id === id
              ? { ...pack, likeCount: result.likeCount, isLiked: result.isLiked }
              : pack;

          const updated: StarterPackResponse = {};
          for (const key in old) {
            updated[key] = old[key].map(updatePack);
          }
          return updated;
        }
      );
    },
    onError: (_, __, context) => {
      if (context?.previousPack) {
        queryClient.setQueryData(QUERY_KEYS.starterPacks.detail(id), context.previousPack);
      }
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.starterPacks.list });
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
    rawError: toggleLikeMutation.error,
  };
};

// 스타터팩 북마크 관리 훅
export const useStarterPackBookmark = (id: number) => {
  const queryClient = useQueryClient();

  const toggleBookmarkMutation = useMutation({
    mutationFn: () => toggleStarterPackBookmark(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.starterPacks.detail(id) });

      const previousPack = queryClient.getQueryData(QUERY_KEYS.starterPacks.detail(id));

      queryClient.setQueryData(
        QUERY_KEYS.starterPacks.detail(id),
        (old: StarterPack | undefined) => {
          if (!old) return old;
          const currentIsBookmarked =
            (old as StarterPack & { isBookmarked?: boolean }).isBookmarked ?? false;
          return {
            ...old,
            isBookmarked: !currentIsBookmarked,
            bookmarkCount: currentIsBookmarked
              ? Math.max(0, old.bookmarkCount - 1)
              : old.bookmarkCount + 1,
          };
        }
      );

      queryClient.setQueryData(
        QUERY_KEYS.starterPacks.list,
        (old: StarterPackResponse | undefined) => {
          if (!old) return old;

          const updatePack = (pack: StarterPack) => {
            const currentIsBookmarked =
              (pack as StarterPack & { isBookmarked?: boolean }).isBookmarked ?? false;
            return pack.id === id
              ? {
                  ...pack,
                  isBookmarked: !currentIsBookmarked,
                  bookmarkCount: currentIsBookmarked
                    ? Math.max(0, pack.bookmarkCount - 1)
                    : pack.bookmarkCount + 1,
                }
              : pack;
          };

          const updated: StarterPackResponse = {};
          for (const key in old) {
            updated[key] = old[key].map(updatePack);
          }
          return updated;
        }
      );

      return { previousPack };
    },
    onSuccess: (result: BookmarkStarterPackResponse) => {
      queryClient.setQueryData(
        QUERY_KEYS.starterPacks.detail(id),
        (old: StarterPack | undefined) => {
          if (!old) return old;
          return {
            ...old,
            bookmarkCount: result.bookmarkCount,
            isBookmarked: result.isBookmarked,
          };
        }
      );

      queryClient.setQueryData(
        QUERY_KEYS.starterPacks.list,
        (old: StarterPackResponse | undefined) => {
          if (!old) return old;

          const updatePack = (pack: StarterPack) =>
            pack.id === id
              ? { ...pack, bookmarkCount: result.bookmarkCount, isBookmarked: result.isBookmarked }
              : pack;

          const updated: StarterPackResponse = {};
          for (const key in old) {
            updated[key] = old[key].map(updatePack);
          }
          return updated;
        }
      );

      // 북마크 변경 시 프로필 데이터 갱신
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.all });
    },
    onError: (_, __, context) => {
      if (context?.previousPack) {
        queryClient.setQueryData(QUERY_KEYS.starterPacks.detail(id), context.previousPack);
      }
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.starterPacks.list });
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
    rawError: toggleBookmarkMutation.error,
  };
};

// ==================== 스타터팩 댓글 관련 ====================

// PackCommentResponse를 Feed의 Comment 타입으로 변환
const convertPackCommentToComment = (packComment: PackCommentResponse): Comment => {
  return {
    commentId: packComment.id,
    author: {
      userId: packComment.author.id,
      name: packComment.author.name,
      profileImageUrl: packComment.author.profileImageUrl,
    },
    content: packComment.content,
    createdAt: packComment.createdAt,
    likeCount: packComment.likeCount,
    isLiked: packComment.isLiked,
    parentId: packComment.parentId,
    isMine: packComment.isMine,
    isDeleted: packComment.isDeleted,
  };
};

// PackCommentResponse 배열을 Comment 트리 구조로 변환
const convertPackCommentsToComments = (packComments: PackCommentResponse[]): Comment[] => {
  const commentsMap = new Map<number, Comment>();
  const rootComments: Comment[] = [];

  // 먼저 모든 댓글을 맵에 추가
  packComments.forEach((packComment) => {
    const comment = convertPackCommentToComment(packComment);
    commentsMap.set(comment.commentId, comment);
  });

  // 트리 구조로 변환
  packComments.forEach((packComment) => {
    const comment = commentsMap.get(packComment.id)!;

    if (packComment.parentId === null) {
      // 루트 댓글
      rootComments.push(comment);
    } else {
      // 답글
      const parentComment = commentsMap.get(packComment.parentId);
      if (parentComment) {
        if (!parentComment.replies) {
          parentComment.replies = [];
        }
        parentComment.replies.push(comment);
      }
    }
  });

  return rootComments;
};

// 스타터팩 댓글 목록 조회 (페이지네이션 지원)
export const usePackComments = (
  packId: number,
  page: number = PACK_COMMENT_DEFAULT_PAGE,
  size: number = PACK_COMMENT_DEFAULT_SIZE,
  options?: { sort?: string }
) => {
  const {
    data: commentsResponse,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: [...QUERY_KEYS.starterPacks.detail(packId), 'comments', page, size, options?.sort],
    queryFn: () => fetchPackComments(packId, page, size, options),
    enabled: !!packId,
    throwOnError: false,
    retry: false,
  });

  const comments: Comment[] = commentsResponse
    ? convertPackCommentsToComments(commentsResponse.content)
    : [];

  const queryClient = useQueryClient();

  const reset = () => {
    queryClient.removeQueries({
      queryKey: [...QUERY_KEYS.starterPacks.detail(packId), 'comments'],
    });
  };

  return {
    comments,
    totalCount: commentsResponse?.totalElements || 0,
    loading,
    error: error
      ? createUserFriendlyMessage(parseAxiosError(error), '댓글을 불러오는데 실패했습니다.')
      : null,
    refresh: refetch,
    reset,
  };
};

// 스타터팩 댓글 및 답글 CRUD 작업 관리
export const usePackCommentActions = (packId: number) => {
  const queryClient = useQueryClient();

  // 댓글 생성
  const createCommentMutation = useMutation({
    mutationFn: ({ content, parentId }: { content: string; parentId?: number | null }) =>
      createPackComment(packId, content, parentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...QUERY_KEYS.starterPacks.detail(packId), 'comments'],
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.starterPacks.detail(packId) });
    },
  });

  // 댓글 수정
  const updateCommentMutation = useMutation({
    mutationFn: ({ commentId, content }: { commentId: number; content: string }) =>
      updatePackComment(commentId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...QUERY_KEYS.starterPacks.detail(packId), 'comments'],
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.starterPacks.detail(packId) });
    },
  });

  // 댓글 삭제
  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: number) => deletePackComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...QUERY_KEYS.starterPacks.detail(packId), 'comments'],
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.starterPacks.detail(packId) });
    },
  });

  const addComment = async (content: string, parentId?: number | null) => {
    return createCommentMutation.mutateAsync({ content, parentId });
  };

  const editComment = async (commentId: number, content: string) => {
    return updateCommentMutation.mutateAsync({ commentId, content });
  };

  const removeComment = async (commentId: number) => {
    return deleteCommentMutation.mutateAsync(commentId);
  };

  const loading =
    createCommentMutation.isPending ||
    updateCommentMutation.isPending ||
    deleteCommentMutation.isPending;

  const error = createCommentMutation.error
    ? createUserFriendlyMessage(
        parseAxiosError(createCommentMutation.error),
        '댓글 작성에 실패했습니다.'
      )
    : updateCommentMutation.error
      ? createUserFriendlyMessage(
          parseAxiosError(updateCommentMutation.error),
          '댓글 수정에 실패했습니다.'
        )
      : deleteCommentMutation.error
        ? createUserFriendlyMessage(
            parseAxiosError(deleteCommentMutation.error),
            '댓글 삭제에 실패했습니다.'
          )
        : null;

  const clearError = () => {
    createCommentMutation.reset();
    updateCommentMutation.reset();
    deleteCommentMutation.reset();
  };

  return {
    addComment,
    editComment,
    removeComment,
    loading,
    error,
    clearError,
  };
};

// 스타터팩 댓글 좋아요 관리 훅
export const usePackCommentLike = (packId: number) => {
  const queryClient = useQueryClient();

  const toggleLikeMutation = useMutation({
    mutationFn: (commentId: number) => togglePackCommentLike(commentId),
    onMutate: async (commentId) => {
      await queryClient.cancelQueries({
        queryKey: [...QUERY_KEYS.starterPacks.detail(packId), 'comments'],
      });

      const commentQueries = queryClient.getQueriesData<PagePackCommentResponse>({
        queryKey: [...QUERY_KEYS.starterPacks.detail(packId), 'comments'],
      });

      // 낙관적 업데이트: 모든 페이지네이션 변형의 댓글 목록 캐시 업데이트
      commentQueries.forEach(([queryKey, oldData]) => {
        if (!oldData?.content) return;
        queryClient.setQueryData(queryKey, {
          ...oldData,
          content: oldData.content.map((comment: PackCommentResponse) => {
            if (comment.id !== commentId) return comment;
            const newIsLiked = !comment.isLiked;
            const newLikeCount = newIsLiked
              ? (comment.likeCount || 0) + 1
              : Math.max(0, (comment.likeCount || 0) - 1);
            return {
              ...comment,
              isLiked: newIsLiked,
              likeCount: newLikeCount,
            };
          }),
        });
      });

      return { previousCommentQueries: commentQueries, commentId };
    },
    onSuccess: (result, commentId) => {
      // 서버 응답으로 모든 페이지네이션 변형의 댓글 목록 캐시 업데이트
      queryClient.setQueriesData(
        { queryKey: [...QUERY_KEYS.starterPacks.detail(packId), 'comments'] },
        (old: PagePackCommentResponse | undefined) => {
          if (!old?.content) return old;
          return {
            ...old,
            content: old.content.map((comment: PackCommentResponse) =>
              comment.id === commentId
                ? { ...comment, likeCount: result.likeCount, isLiked: result.isLiked }
                : comment
            ),
          };
        }
      );

      // pack-detail 캐시 무효화하여 commentCount 업데이트
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.starterPacks.detail(packId),
      });
    },
    onError: (_error, _commentId, context) => {
      // 실패 시 모든 매칭되는 쿼리 캐시를 이전 상태로 롤백
      if (context?.previousCommentQueries) {
        context.previousCommentQueries.forEach(([queryKey, data]) => {
          if (data) {
            queryClient.setQueryData(queryKey, data);
          }
        });
      }
      // 댓글 목록 무효화하여 서버 데이터로 복구
      queryClient.invalidateQueries({
        queryKey: [...QUERY_KEYS.starterPacks.detail(packId), 'comments'],
      });
    },
  });

  const toggleLike = (commentId: number) => {
    if (toggleLikeMutation.isPending) return;
    toggleLikeMutation.mutate(commentId);
  };

  return {
    toggleLike,
    loading: toggleLikeMutation.isPending,
    error: toggleLikeMutation.error
      ? createUserFriendlyMessage(
          parseAxiosError(toggleLikeMutation.error),
          '댓글 좋아요 처리에 실패했습니다.'
        )
      : null,
    rawError: toggleLikeMutation.error,
  };
};
