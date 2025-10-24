import axiosInstance from '@/api/axiosInstance';

type PresignedUrlRequest = {
  files: {
    fileName: string;
    contentType: string;
  }[];
};

type PresignedUrlResponse = {
  presignedUrl: string;
  fileUrl: string;
}[];

export const getPresignedUrls = async (dirName: string, files: File[]): Promise<PresignedUrlResponse> => {
  const payload: PresignedUrlRequest = {
    files: files.map((file) => ({
      fileName: file.name,
      contentType: file.type,
    })),
  };

  const response = await axiosInstance.post<PresignedUrlResponse>(
    `/api/s3/presigned-urls?dirName=${dirName}`,
    payload
  );

  return response.data;
};

export const uploadToS3 = async (presignedUrl: string, file: File) => {
  await fetch(presignedUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  });
};