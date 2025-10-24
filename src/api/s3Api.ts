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
    const response = await axiosInstance.post<PresignedUrlResponse>(
      `/api/s3/presigned-urls?dirName=${dirName}`,
      payload
    );

    if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
      throw new Error('Presigned URL 발급 실패: 응답 데이터가 비어 있습니다.');
    }

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Presigned URL 요청 실패:', error.message);
      throw new Error(error.message);
    }
    console.error('Presigned URL 요청 실패:', error);
    throw new Error('Presigned URL 요청 중 알 수 없는 오류가 발생했습니다.');
  }
};

export const uploadToS3 = async (presignedUrl: string, file: File) => {
  try {
    const res = await fetch(presignedUrl, {
      method: 'PUT',
      headers: { 'Content-Type': file.type },
      body: file,
    });

    if (!res.ok) {
      throw new Error(`S3 업로드 실패: 상태 코드 ${res.status}`);
    }
  } catch (error) {
    console.error('S3 업로드 실패:', error);
    throw new Error('이미지 업로드 중 오류가 발생했습니다.');
  }
};
