import { useCallback, useState } from 'react';
import { useStarterPackLike, useStarterPackById } from './useStarterPacks';
import type { StarterPack } from '@/types/StarterPack';

export function useLikedPacks() {
  const [likedPacks, setLikedPacks] = useState<Set<number>>(new Set());

  const toggleLike = useCallback((id: number) => {
    setLikedPacks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const isLiked = useCallback((id: number) => likedPacks.has(id), [likedPacks]);

  return { likedPacks, isLiked, toggleLike };
}

// 특정 스타터팩의 좋아요 상태를 관리하는 훅
export function useStarterPackLikeStatus(id: number) {
  const { starterPack } = useStarterPackById(id);

  const { toggleLike, loading } = useStarterPackLike(id);

  const packWithLike = starterPack as StarterPack & { isLiked?: boolean };

  return {
    likesCount: starterPack?.likeCount ?? 0,
    isLiked: packWithLike?.isLiked ?? false,
    loading,
    toggleLike,
  };
}
