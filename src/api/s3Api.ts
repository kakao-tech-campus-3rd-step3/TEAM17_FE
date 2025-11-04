import axiosInstance from '@/api/axiosInstance';
import axios, { AxiosError } from 'axios';
import { ensureCsrfToken } from '@/utils/csrf';

type PresignedUrlRequest = {
  files: { fileName: string; contentType: string }[];
};

export type PresignedUrlResponse = {
  presignedUrl: string;
  fileUrl: string;
}[];

export const getPresignedUrls = async (
  dirName: string,
  files: File[]
): Promise<PresignedUrlResponse> => {
  const payload: PresignedUrlRequest = {
    files: files.map((file) => ({
      fileName: file.name,
      contentType: file.type,
    })),
  };

  await ensureCsrfToken();

  const { data } = await axiosInstance.post<PresignedUrlResponse>(
    `/api/s3/presigned-urls?dirName=${encodeURIComponent(dirName)}`,
    payload
  );

  return data;
};

export const uploadToS3 = async (presignedUrl: string, file: File): Promise<void> => {
  const s3Axios = axios.create(); 

  try {
    const res = await s3Axios.put(presignedUrl, file, {
      headers: {
        'Content-Type': file.type,
        'x-amz-acl': 'public-read',
      },
    });

    if (res.status < 200 || res.status >= 300) {
      throw new Error(`S3 업로드 실패 (상태 ${res.status})`);
    }

    console.info(`[S3 업로드 성공] ${file.name}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('[S3 업로드 실패]', error.response?.data || error.message);
    } else {
      console.error('[S3 업로드 실패 - Unknown]', error);
    }
    throw error;
  }
};
