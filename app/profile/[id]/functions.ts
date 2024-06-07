import { Dispatch, SetStateAction } from 'react';
import { UsersAnimeData, api } from '@/utils';

export async function getUsersAnimelist({
  setData,
  setLoading,
  setFailed,
}: {
  setData: Dispatch<SetStateAction<UsersAnimeData[] | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setFailed: Dispatch<SetStateAction<boolean>>;
}) {
  setLoading(true);
  api
    .get('/animelist')
    .then((e) => {
      setData(e.data);
    })
    .catch(() => {
      setFailed(true);
    })
    .finally(() => setLoading(false));
}
