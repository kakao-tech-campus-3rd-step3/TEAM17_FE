import { useState, useEffect, useCallback } from 'react';
import {
  fetchStarterPacks,
  fetchStarterPackById,
  createStarterPack,
  updateStarterPack,
  deleteStarterPack,
  toggleStarterPackLike,
} from '@/api/starterPackApi';
import type { StarterPack, StarterPackResponse, StarterPackRequest } from '@/types/StarterPack';

// 모든 스타터팩 목록 관리하는 훅
export const useStarterPacks = () => {
  const [starterPacks, setStarterPacks] = useState<StarterPackResponse>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStarterPacks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchStarterPacks();
      setStarterPacks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '스타터팩을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStarterPacks();
  }, [loadStarterPacks]);

  const refresh = useCallback(() => {
    loadStarterPacks();
  }, [loadStarterPacks]);

  return {
    starterPacks,
    loading,
    error,
    refresh,
  };
};

// 단일 스타터팩 관리하는 훅
export const useStarterPack = (id: number) => {
  const [starterPack, setStarterPack] = useState<StarterPack | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStarterPack = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchStarterPackById(id);
      setStarterPack(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '스타터팩을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      loadStarterPack();
    }
  }, [id, loadStarterPack]);

  const refresh = useCallback(() => {
    loadStarterPack();
  }, [loadStarterPack]);

  return {
    starterPack,
    loading,
    error,
    refresh,
  };
};

// 스타터팩 CRUD 작업 관리하는 훅
export const useStarterPackActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: StarterPackRequest) => {
    try {
      setLoading(true);
      setError(null);
      const result = await createStarterPack(data);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '스타터팩 생성에 실패했습니다.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (id: number, data: Partial<StarterPackRequest>) => {
    try {
      setLoading(true);
      setError(null);
      const result = await updateStarterPack(id, data);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '스타터팩 수정에 실패했습니다.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      await deleteStarterPack(id);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '스타터팩 삭제에 실패했습니다.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleLike = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const result = await toggleStarterPackLike(id);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '좋아요 처리에 실패했습니다.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    create,
    update,
    remove,
    toggleLike,
    loading,
    error,
  };
};

// 스타터팩 좋아요 관리 훅
export const useStarterPackLike = (id: number, initialLike: number = 0) => {
  const [likesCount, setLikesCount] = useState(initialLike);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToggleLike = useCallback(async () => {
    if (loading) return;

    // 낙관적 업데이트
    const newIsLiked = !isLiked;
    const newLikesCount = newIsLiked ? likesCount + 1 : Math.max(0, likesCount - 1);

    setIsLiked(newIsLiked);
    setLikesCount(newLikesCount);
    setLoading(true);

    try {
      const result = await toggleStarterPackLike(id);
      setLikesCount(result.likes);
      setIsLiked(result.likes > likesCount);
    } catch (error) {
      // 실패 시 롤백
      setIsLiked(!newIsLiked);
      setLikesCount(likesCount);
      console.error('Failed to toggle like:', error);
    } finally {
      setLoading(false);
    }
  }, [id, isLiked, likesCount, loading]);

  return {
    likesCount,
    isLiked,
    loading,
    toggleLike: handleToggleLike,
  };
};
