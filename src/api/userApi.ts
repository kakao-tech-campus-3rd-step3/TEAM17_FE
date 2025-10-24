import axiosInstance from '@/api/axiosInstance';
import type { UserProfile } from '@/types/User';

// ✅ 내 프로필 조회
export const fetchUserProfile = async (): Promise<UserProfile> => {
  try {
    const response = await axiosInstance.get<UserProfile>('/api/user/profile');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    throw error;
  }
};

// ✅ 프로필 수정
export const updateUserProfile = async (data: Partial<UserProfile>): Promise<UserProfile> => {
  try {
    return {
      userId: 1,
      nickname: data.nickname ?? '정보 없음',
      hobby: data.hobby ?? '정보 없음',
      introduction: data.introduction ?? '정보 없음',
      profileImage: null,
      postCount: 10,
    };
  } catch (error) {
    console.error('Failed to update user profile:', error);
    throw error;
  }
};
