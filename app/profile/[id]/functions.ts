import { AnimeData, FilterType, UsersAnimeData, airingStatusOptions, api } from '@/utils';
import { Dispatch, SetStateAction } from 'react';

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
