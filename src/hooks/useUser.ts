import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUserProfile, updateUserProfile } from '@/api/userApi';
import { QUERY_KEYS } from '@/utils/queryKeys';
import type { UserProfile } from '@/types/User';

export const useUserProfile = (userId: number) => {
  return useQuery<UserProfile>({
    queryKey: QUERY_KEYS.user.profile(userId),
    queryFn: () => fetchUserProfile(userId),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const useUpdateUserProfile = (userId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<UserProfile>) => updateUserProfile(userId, data),
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(QUERY_KEYS.user.profile(userId), updatedProfile);
      alert('✅ 프로필이 성공적으로 수정되었습니다!');
    },
    onError: () => {
      alert('❌ 프로필 수정에 실패했습니다.');
    },
  });
};
