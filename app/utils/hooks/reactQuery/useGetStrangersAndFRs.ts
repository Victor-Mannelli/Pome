import { StrangersAndFRsType } from '@/friends/types';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/libs/axios';

export function useGetStrangersAndFRs() {
  return useQuery<StrangersAndFRsType>({
    queryKey: ['strangersAndFRs'],
    queryFn: () => {
      return new Promise((resolve, reject) => {
        api
          .get('/users/strangersAndFRs')
          .then(({ data }) => resolve(data))
          .catch((error) => reject(error));
      });
    },
    refetchOnWindowFocus: false,
  });
}
