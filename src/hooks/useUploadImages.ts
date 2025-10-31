import { useMutation } from '@tanstack/react-query';
import { getPresignedUrls, uploadToS3 } from '@/api/s3Api';
import { AxiosError } from 'axios';

// 여러 이미지 업로드 후 S3 URL 반환
export const useUploadImages = () => {
  return useMutation<string[], AxiosError<{ message?: string }>, File[]>({
    mutationFn: async (files: File[]) => {
      // Presigned URL 리스트 발급
      const presignedList = await getPresignedUrls('feed', files);

  await Promise.all(
  presignedList.map((item, idx) =>
    uploadToS3(item.presignedUrl, files[idx])
  )
);

      // 업로드 후 최종 S3 fileUrl 배열 반환
      return presignedList.map((item) => item.fileUrl);
    },
  });
};
