import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUserProfile, updateUserProfile } from '@/api/userApi';
import { QUERY_KEYS } from '@/utils/queryKeys';
import type { UserProfile } from '@/types/User';

export const useUserProfile = () => {
  return useQuery<UserProfile>({
    queryKey: QUERY_KEYS.user.profile(),
    queryFn: fetchUserProfile,
    staleTime: 1000 * 60 * 5, 
    retry: 1, 
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<UserProfile>) => updateUserProfile(data),
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(QUERY_KEYS.user.profile(), updatedProfile);
      alert('프로필이 성공적으로 수정되었습니다!');
    },
    onError: () => {
      alert('프로필 수정에 실패했습니다.');
    },
  });
};