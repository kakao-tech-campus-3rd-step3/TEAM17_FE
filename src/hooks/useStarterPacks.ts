import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchStarterPack,
  fetchStarterPackById,
  createStarterPack,
  updateStarterPack,
  deleteStarterPack,
  toggleStarterPackLike,
} from '@/api/starterPackApi';
import { QUERY_KEYS } from '@/utils/queryKeys';
import { parseAxiosError, createUserFriendlyMessage } from '@/utils/errorHandling';
import type {
  StarterPack,
  StarterPackResponse,
  StarterPackRequest,
  LikeStarterPackResponse,
} from '@/types/StarterPack';

// 모든 스타터팩 목록 관리하는 훅
export const useStarterPack = () => {
  const {
    data: starterPack = {},
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: QUERY_KEYS.starterPacks.list,
    queryFn: fetchStarterPack,
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
            updated[key] = old[key].map((pack) => (pack.packId === id ? updatedPack : pack));
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
            return pack.packId === id
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
            pack.packId === id
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
  };
};
