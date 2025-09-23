import { useState } from 'react';
import { useAsync, useAsyncActions } from './useAsync';
import {
  fetchStarterPack,
  fetchStarterPackById,
  createStarterPack,
  updateStarterPack,
  deleteStarterPack,
  toggleStarterPackLike,
} from '@/api/starterPackApi';
import type { StarterPackRequest } from '@/types/StarterPack';

// 모든 스타터팩 목록 관리하는 훅
export const useStarterPack = () => {
  const {
    data: starterPack,
    loading,
    error,
    execute,
    reset,
  } = useAsync(fetchStarterPack, {
    initialData: {},
    errorMessage: () => '스타터팩을 불러오는데 실패했습니다.',
  });

  return {
    starterPack: starterPack || {},
    loading,
    error,
    refresh: execute,
    reset,
  };
};

// 단일 스타터팩 관리하는 훅
export const useStarterPackById = (id: number) => {
  const {
    data: starterPack,
    loading,
    error,
    execute,
    reset,
  } = useAsync(() => fetchStarterPackById(id), {
    immediate: !!id,
    errorMessage: () => '스타터팩을 불러오는데 실패했습니다.',
  });

  return {
    starterPack,
    loading,
    error,
    refresh: execute,
    reset,
  };
};

// 스타터팩 CRUD 작업 관리하는 훅
export const useStarterPackActions = () => {
  const { loading, error, execute, clearError } = useAsyncActions({
    errorMessage: (error: unknown) =>
      error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
  });

  const create = async (data: StarterPackRequest) => {
    const result = await execute(() => createStarterPack(data));
    if (!result) throw new Error('스타터팩 생성에 실패했습니다.');
    return result;
  };

  const update = async (id: number, data: Partial<StarterPackRequest>) => {
    const result = await execute(() => updateStarterPack(id, data));
    if (!result) throw new Error('스타터팩 수정에 실패했습니다.');
    return result;
  };

  const remove = async (id: number) => {
    await execute(() => deleteStarterPack(id));
  };

  const toggleLike = async (id: number) => {
    const result = await execute(() => toggleStarterPackLike(id));
    if (!result) throw new Error('좋아요 처리에 실패했습니다.');
    return result;
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
export const useStarterPackLike = (id: number, initialLike: number = 0) => {
  const { loading, error, execute } = useAsync(() => toggleStarterPackLike(id), {
    immediate: false, // 수동 실행만
    errorMessage: () => '좋아요 처리에 실패했습니다.',
  });

  // 로컬 상태로 낙관적 업데이트 관리
  const [likesCount, setLikesCount] = useState(initialLike);
  const [isLiked, setIsLiked] = useState(false);

  const handleToggleLike = async () => {
    if (loading) return;

    // 낙관적 업데이트
    const newIsLiked = !isLiked;
    const newLikesCount = newIsLiked ? likesCount + 1 : Math.max(0, likesCount - 1);

    setIsLiked(newIsLiked);
    setLikesCount(newLikesCount);

    // 서버 요청
    const result = await execute();

    if (result) {
      setLikesCount(result.likes);
      setIsLiked(result.likes > likesCount);
    } else {
      // 실패 시 롤백
      setIsLiked(!newIsLiked);
      setLikesCount(likesCount);
    }
  };

  return {
    likesCount,
    isLiked,
    loading,
    error,
    toggleLike: handleToggleLike,
  };
};
