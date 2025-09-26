import { useState, useEffect } from 'react';
import type { FeedDetail } from '@/types/Feed';
import { MOCK_FEED_DETAIL } from '@/mocks/feedData';

interface UseFeedDetailReturn {
  feed: FeedDetail | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  updateFeed: (updates: Partial<FeedDetail>) => void;
}

/**
 * 피드 상세 정보를 가져오는 커스텀 훅
 * @param feedId - 피드 ID
 * @returns 피드 데이터, 로딩 상태, 에러 상태, 재요청 함수
 */
export const useFeedDetail = (feedId: string | undefined): UseFeedDetailReturn => {
  const [feed, setFeed] = useState<FeedDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeedDetail = async () => {
    if (!feedId) {
      setError('피드 ID가 필요합니다.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // TODO: 실제 API 호출로 교체
      // const response = await feedApi.getFeedDetail(feedId);
      // setFeed(response.data);

      // 현재는 목 데이터 사용
      setFeed(MOCK_FEED_DETAIL);
    } catch (err) {
      setError('피드 상세 정보를 불러오는데 실패했습니다.');
      console.error('Failed to load feed detail:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedDetail();
  }, [feedId]);

  const refetch = () => {
    fetchFeedDetail();
  };

  const updateFeed = (updates: Partial<FeedDetail>) => {
    setFeed((prev) => (prev ? { ...prev, ...updates } : null));
  };

  return {
    feed,
    loading,
    error,
    refetch,
    updateFeed,
  };
};
