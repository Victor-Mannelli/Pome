import { AnimeData, FilterType, ProfilePageSlugObject, UsersAnimeData, airingStatusOptions, api } from '@/utils';
import { Dispatch, SetStateAction } from 'react';

export async function getUsersAnimelist({
  setLoading,
  setFailed,
  setData,
}: {
  setData: Dispatch<SetStateAction<ProfilePageSlugObject | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setFailed: Dispatch<SetStateAction<boolean>>;
}) {
  setLoading(true);
  api
    .get('/animelist')
    .then((e) => {
      setData((prevState) => ({ ...prevState, usersAnimelist: e.data }));
    })
    .catch(() => {
      setFailed(true);
    })
    .finally(() => setLoading(false));
}

export async function getUserProfileById({
  setLoading,
  setFailed,
  setData,
  userId,
}: {
  setData: Dispatch<SetStateAction<ProfilePageSlugObject | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setFailed: Dispatch<SetStateAction<boolean>>;
  userId: string | string[];
}) {
  setLoading(true);
  api
    .get(`/users/find/${userId}`)
    .then((e) => {
      setData(e.data);
    })
    .catch((e) => {
      console.log(e, 'error');
      setFailed(true);
    })
    .finally(() => setLoading(false));
}

export function applyUnderscoreFilter(data: AnimeData, item: UsersAnimeData, filter: FilterType) {
  const specificAnime = data.Page.media.find((animeData) => animeData.id === item.anime_id);

  if (filter.search && !specificAnime.title.romaji.toLowerCase().includes(filter.search.toLowerCase())) {
    return false;
  }
  if (filter.status && item.status !== airingStatusOptions[filter.status]) {
    return false;
  }
  if (filter.genres && !specificAnime.genres.find((anime) => anime === filter.genres)) {
    return false;
  }
  if (filter.year && specificAnime.startDate.year.toString() !== filter.year.toString()) {
    return false;
  }
  return true;
}

export function sortFunction(item: UsersAnimeData, sortScore: 'up' | 'down' | 'none', data: AnimeData) {
  if (sortScore === 'down') {
    return item.score;
  }
  if (sortScore === 'up') {
    return -item.score;
  }
  if (sortScore === 'none') {
    const mediaItem = data.Page.media.find((mediaItem) => mediaItem.id === item.anime_id);
    return mediaItem ? mediaItem.title.romaji : '';
  }
}
