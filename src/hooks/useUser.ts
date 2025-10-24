import { useQuery } from '@tanstack/react-query';
import { fetchUserProfile } from '@/api/userApi';
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
