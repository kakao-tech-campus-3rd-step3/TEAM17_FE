import { useMutation } from '@tanstack/react-query';
import { getPresignedUrls, uploadToS3 } from '@/api/s3Api';
import { AxiosError } from 'axios';

// 여러 이미지 업로드 후 S3 URL 반환
export const useUploadImages = (dirName: 'feed' | 'packs' | 'products' = 'feed') => {
  return useMutation<string[], AxiosError<{ message?: string }>, File[]>({
    mutationFn: async (files: File[]) => {
      const presignedList = await getPresignedUrls(dirName, files);

      await Promise.all(
        presignedList.map((item, idx) =>
          uploadToS3(item.presignedUrl, files[idx])
        )
      );

      return presignedList.map((item) => item.fileUrl);
    },
  });
};