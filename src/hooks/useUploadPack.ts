import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadPack } from '@/api/packUploadApi';
import { QUERY_KEYS } from '@/utils/queryKeys';
import type { AxiosError } from 'axios';
import type { UploadPackRequest, UploadPackResponse } from '@/types/PackUpload';

/**
 * 스타터팩 업로드 훅
 * - /api/starterPack/packs POST 요청 수행
 * - 성공 시 캐시 무효화 및 알림 표시
 */
export const useUploadPack = () => {
  const queryClient = useQueryClient();

  return useMutation<UploadPackResponse, AxiosError, UploadPackRequest>({
    mutationFn: uploadPack,
    onSuccess: (data) => {
      console.info('스타터팩 업로드 성공:', data);
      alert('스타터팩이 성공적으로 등록되었습니다!');
      // 업로드 후 리스트 캐시 갱신
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.starterPacks.list });
    },
    onError: (error) => {
      console.error('스타터팩 업로드 실패:', error.response?.data || error.message);
      alert('스타터팩 업로드 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    },
  });
};
