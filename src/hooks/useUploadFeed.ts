import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadFeed } from '@/api/feedUploadApi';
import { QUERY_KEYS } from '@/utils/queryKeys';

export const useUploadFeed = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadFeed,
    onSuccess: () => {
      alert('✅ 피드가 성공적으로 업로드되었습니다!');

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.feeds.lists });
    },
    onError: (error: unknown) => {
      console.error('❌ 피드 업로드 실패:', error);
      alert('피드 업로드 중 오류가 발생했습니다.');
    },
  });
};
