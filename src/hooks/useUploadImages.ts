import { useMutation } from '@tanstack/react-query';
import { getPresignedUrls, uploadToS3 } from '@/api/s3Api';
import { AxiosError } from 'axios';

export const useUploadImages = () => {
  return useMutation<
    string[], 
    AxiosError<{ message?: string }>,
    File[] 
  >({
    mutationFn: async (files: File[]) => {
      const presignedList = await getPresignedUrls('feed', files);

      await Promise.all(
        presignedList.map((item, idx) => uploadToS3(item.presignedUrl, files[idx]))
      );

      return presignedList.map((item) => item.fileUrl);
    },
  });
};
