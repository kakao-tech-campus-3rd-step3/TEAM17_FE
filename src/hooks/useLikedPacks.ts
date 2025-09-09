import { useCallback, useState } from 'react';

export function useLikedPacks() {
  const [likedPacks, setLikedPacks] = useState<Set<string>>(new Set());

  const toggleLike = useCallback((id: string) => {
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

  const isLiked = useCallback((id: string) => likedPacks.has(id), [likedPacks]);

  return { likedPacks, isLiked, toggleLike };
}
