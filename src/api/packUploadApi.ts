import axiosInstance from '@/api/axiosInstance';
import { ensureCsrfToken } from '@/utils/csrf';
import type { UploadPackRequest, UploadPackResponse } from '@/types/PackUpload';

/**
 * 스타터팩 생성 API
 * @param packData UploadPackRequest
 * @returns UploadPackResponse
 */
export const uploadPack = async (packData: UploadPackRequest): Promise<UploadPackResponse> => {
  await ensureCsrfToken();

  const { data } = await axiosInstance.post<UploadPackResponse>(
    '/api/starterPack/packs',
    packData
  );

  return data;
};
