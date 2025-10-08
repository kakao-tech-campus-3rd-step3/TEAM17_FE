import { useState } from 'react';
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
import type { StarterPackRequest } from '@/types/StarterPack';

// 모든 스타터팩 목록 관리하는 훅
export const useStarterPack = () => {
  const {
    data: starterPack = {},
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: QUERY_KEYS.starterPacks.list(),
    queryFn: fetchStarterPack,
    throwOnError: false,
  });

  const queryClient = useQueryClient();

  const reset = () => {
    queryClient.removeQueries({ queryKey: QUERY_KEYS.starterPacks.all });
  };

  return {
    starterPack,
    loading,
    error: error ? '스타터팩을 불러오는데 실패했습니다.' : null,
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
  });

  const queryClient = useQueryClient();

  const reset = () => {
    queryClient.removeQueries({ queryKey: QUERY_KEYS.starterPacks.detail(id) });
  };

  return {
    starterPack,
    loading,
    error: error ? '스타터팩을 불러오는데 실패했습니다.' : null,
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
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.starterPacks.all });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<StarterPackRequest> }) =>
      updateStarterPack(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.starterPacks.detail(id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.starterPacks.all });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteStarterPack,
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: QUERY_KEYS.starterPacks.detail(id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.starterPacks.all });
    },
  });

  const toggleLikeMutation = useMutation({
    mutationFn: toggleStarterPackLike,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.starterPacks.detail(id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.starterPacks.all });
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

  const error =
    createMutation.error?.message ||
    updateMutation.error?.message ||
    deleteMutation.error?.message ||
    toggleLikeMutation.error?.message ||
    null;

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

// 스타터팩 좋아요 관리 훅 (낙관적 업데이트 포함)
export const useStarterPackLike = (id: number, initialLike: number = 0) => {
  const queryClient = useQueryClient();

  // 로컬 상태로 낙관적 업데이트 관리
  const [likesCount, setLikesCount] = useState(initialLike);
  const [isLiked, setIsLiked] = useState(false);

  const toggleLikeMutation = useMutation({
    mutationFn: () => toggleStarterPackLike(id),
    onMutate: async () => {
      // 낙관적 업데이트
      const newIsLiked = !isLiked;
      const newLikesCount = newIsLiked ? likesCount + 1 : Math.max(0, likesCount - 1);

      setIsLiked(newIsLiked);
      setLikesCount(newLikesCount);

      // 롤백을 위한 이전 상태 반환
      return { previousIsLiked: isLiked, previousLikesCount: likesCount };
    },
    onSuccess: (result) => {
      // 성공 시 서버 데이터로 업데이트
      if (result) {
        setLikesCount(result.likes);
        setIsLiked(result.likes > likesCount);
      }
      // 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.starterPacks.detail(id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.starterPacks.all });
    },
    onError: (_, __, context) => {
      // 실패 시 롤백
      if (context) {
        setIsLiked(context.previousIsLiked);
        setLikesCount(context.previousLikesCount);
      }
    },
  });

  const handleToggleLike = () => {
    if (toggleLikeMutation.isPending) return;
    toggleLikeMutation.mutate();
  };

  return {
    likesCount,
    isLiked,
    loading: toggleLikeMutation.isPending,
    error: toggleLikeMutation.error ? '좋아요 처리에 실패했습니다.' : null,
    toggleLike: handleToggleLike,
  };
};
