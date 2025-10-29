import axiosInstance from '@/api/axiosInstance';
import { ensureCsrfToken } from '@/utils/csrf';
import type { UploadPackRequest, UploadPackResponse } from '@/types/PackUpload';

export const uploadPack = async (packData: UploadPackRequest) => {
  await ensureCsrfToken();
  const { data } = await axiosInstance.post<UploadPackResponse>(
    '/api/starterPack/packs',
    packData
  );
  return data;
};
