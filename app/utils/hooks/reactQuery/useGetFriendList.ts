import { useQuery } from '@tanstack/react-query';
import { FriendShip } from '@/friends/types';
import { api } from '@/utils/libs/axios';

export function useGetFriendList() {
  return useQuery<FriendShip[]>({
    queryKey: ['friendlist'],
    queryFn: () => {
      return new Promise((resolve, reject) => {
        api
          .get('/friendship/friendList')
          .then(({ data }) => resolve(data))
          .catch((error) => reject(error));
      });
    },
    refetchOnWindowFocus: false,
  });
}
