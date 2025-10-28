import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadPack } from '@/api/packUploadApi';
import { QUERY_KEYS } from '@/utils/queryKeys';

export const useUploadPack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadPack,
    onSuccess: () => {
      alert('✅ 스타터팩이 성공적으로 등록되었습니다!');
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.starterPacks.list });
    },
    onError: (error: unknown) => {
      console.error('❌ 스타터팩 업로드 실패:', error);
      alert('스타터팩 업로드 중 오류가 발생했습니다.');
    },
  });
};
