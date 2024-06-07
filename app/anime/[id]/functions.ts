import { AnimeUserStatus, UsersAnimeData } from '@/utils/types';
import { UseToastOptions } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { api } from '@/utils';

export function getUserAnimeData({
  setUserAnimeData,
  setLoading,
  setFailed,
  animeId,
}: {
  setUserAnimeData: Dispatch<SetStateAction<UsersAnimeData>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setFailed: Dispatch<SetStateAction<boolean>>;
  animeId: number;
}) {
  setLoading(true);
  api
    .get('/animelist')
    .then((e) => {
      setUserAnimeData(e.data.find((anime: UsersAnimeData) => anime.anime_id === animeId));
    })
    .catch(() => setFailed(true))
    .finally(() => setLoading(false));
}

export function maximizeTrailer({ toggle, setToggle }: { setToggle: Dispatch<SetStateAction<boolean>>; toggle: boolean }) {
  setToggle(!toggle);
  setTimeout(() => {
    if (toggle) return;
    scrollBy({
      top: 700,
      left: 0,
      behavior: 'smooth',
    });
  }, 500);
}

export async function removeAnimeFromUserAnimelist({ animeId, toast }: { toast: (options?: UseToastOptions) => void; animeId: number }) {
  api
    .delete(`/animelist/${animeId}`)
    .then(() =>
      toast({
        title: 'Anime deleted from your list',
        status: 'success',
        isClosable: true,
      }),
    )
    .catch(() =>
      toast({
        title: 'An error has occured',
        status: 'error',
        isClosable: true,
      }),
    );
}

export async function addAnimeToUserAnimelist({
  setShowAnimeSettings,
  animeUserStats,
  setLoading,
  setData,
  toast,
}: {
  setData: Dispatch<SetStateAction<UsersAnimeData>>;
  setShowAnimeSettings: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  toast: (options?: UseToastOptions) => void;
  animeUserStats: AnimeUserStatus;
}) {
  setLoading(true);

  const newData = {
    anime_id: animeUserStats.anime_id,
    status: animeUserStats.status,
    start_date: animeUserStats.startDate,
    ...(animeUserStats.score !== 0 && { score: animeUserStats.score }),
    ...(animeUserStats.progress !== 0 && { progress: animeUserStats.progress }),
    ...(animeUserStats.rewatches !== 0 && {
      rewatches: animeUserStats.rewatches,
    }),
    ...(animeUserStats.finishDate.length !== 0 && {
      finish_date: animeUserStats.finishDate,
    }),
    ...(animeUserStats.favorite && { favorite: animeUserStats.favorite }),
  };
  api
    .post('/animelist', newData)
    .then((e) => {
      setData(e.data);
      setShowAnimeSettings(false);
      toast({
        title: 'Anime status updated!',
        status: 'success',
        isClosable: true,
      });
    })
    .catch(() => {
      toast({
        title: 'Error on updating',
        status: 'error',
        isClosable: true,
      });
    })
    .finally(() => setLoading(false));
}
