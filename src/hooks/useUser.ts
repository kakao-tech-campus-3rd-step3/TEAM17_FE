import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUserProfile, updateUserProfile } from '@/api/userApi';
import { QUERY_KEYS } from '@/utils/queryKeys';
import type { UserProfile, SessionUser } from '@/types/User';
import { USER_CONSTANTS } from '@/constants/User';

type UpdateProfileVariables = {
  data: Partial<UserProfile>;
  currentMember: SessionUser;
};

export const useUserProfile = (userId?: number) => {
  return useQuery<UserProfile>({
    queryKey: QUERY_KEYS.user.profile(userId ?? USER_CONSTANTS.INVALID_USER_ID),
    queryFn: () => fetchUserProfile(userId!),
    enabled: !!userId,
    retry: false,
  });
};

export const useUpdateUserProfile = (userId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, currentMember }: UpdateProfileVariables) =>
      updateUserProfile(userId, data, currentMember), 

    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(QUERY_KEYS.user.profile(userId), updatedProfile);
      alert('프로필이 성공적으로 수정되었습니다!');
    },
    onError: () => {
      alert('프로필 수정에 실패했습니다.');
    },
  });
};