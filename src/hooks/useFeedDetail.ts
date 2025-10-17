import { useState, useEffect } from 'react';
import { useFeedById } from './useFeeds';
import type { FeedDetail } from '@/types/Feed';

interface UseFeedDetailReturn {
  feed: FeedDetail | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  updateFeed: (updates: Partial<FeedDetail>) => void;
}

export const useFeedDetail = (feedId: string | undefined): UseFeedDetailReturn => {
  const { feed: feedData, loading, error, refresh } = useFeedById(feedId);
  const [localFeed, setLocalFeed] = useState<FeedDetail | null>(null);

  useEffect(() => {
    if (feedData) {
      setLocalFeed(feedData);
    }
  }, [feedData]);

  const updateFeed = (updates: Partial<FeedDetail>) => {
    setLocalFeed((prev) => (prev ? { ...prev, ...updates } : null));
  };

  return {
    feed: localFeed || feedData || null,
    loading,
    error,
    refetch: refresh,
    updateFeed,
  };
};
