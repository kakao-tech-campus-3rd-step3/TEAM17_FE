import axiosInstance from '@/api/axiosInstance';
import type { UserProfile, SessionUser } from '@/types/User';
import { ensureCsrfToken } from '@/utils/csrf';

export const fetchUserProfile = async (userId: number): Promise<UserProfile> => {
  try {
    const response = await axiosInstance.get(`/api/members/${userId}/mypage`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (
  userId: number,
  data: Partial<UserProfile>,
  currentMember: SessionUser
): Promise<UserProfile> => {
  try {
    await ensureCsrfToken();

    const response = await axiosInstance.put(`/api/members/${userId}/mypage`, data, {
      params: { currentMember },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update user profile:', error);
    throw error;
  }
};
