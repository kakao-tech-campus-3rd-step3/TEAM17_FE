import axiosInstance from '@/api/axiosInstance';
import { ensureCsrfToken } from '@/utils/csrf';
import { AxiosError } from 'axios';

type PresignedUrlRequest = {
  files: {
    fileName: string;
    contentType: string;
  }[];
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

  try {
    await ensureCsrfToken();

    const { data } = await axiosInstance.post<PresignedUrlResponse>(
      `/api/s3/presigned-urls?dirName=${encodeURIComponent(dirName)}`,
      payload
    );

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Presigned URL 발급 실패: 응답 데이터가 비어 있습니다.');
    }

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('[Presigned URL 요청 실패]', error.response?.data || error.message);
    } else {
      console.error('[Presigned URL 요청 실패 - Unknown]', error);
    }
    throw error;
  }
};

export const uploadToS3 = async (presignedUrl: string, file: File): Promise<void> => {
  try {

    const res = await axiosInstance.put(presignedUrl, file, {
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
