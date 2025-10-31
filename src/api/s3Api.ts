import axiosInstance from '@/api/axiosInstance';
import { ensureCsrfToken } from '@/utils/csrf';
import { AxiosError } from 'axios';

type PresignedUrlRequest = {
  files: {
    fileName: string;
    contentType: string;
  }[];
};

// POST presigned URL 구조 대응
export type PresignedUrlResponse = {
  presignedUrl: string;
  fileUrl: string;
}[];

// ==================== Presigned URL 발급 ====================
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
      throw error;
    }
    console.error('[Presigned URL 요청 실패 - Unknown]', error);
    throw error;
  }
};
export const uploadToS3 = async (presignedUrl: string, file: File): Promise<void> => {
  try {
    const res = await fetch(presignedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
        'x-amz-acl': 'public-read',
      },
      body: file,
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`S3 업로드 실패 (상태 ${res.status}): ${errText}`);
    }

    console.info(`[S3 업로드 성공] ${file.name}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[S3 업로드 실패]', message);
    throw error;
  }
};
