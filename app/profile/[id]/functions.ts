'use server';

import { AnimeData, ProfilePageSlugObject, UsersAnimeData, api } from '@/utils';
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
      // console.log(e.data, 'getUsersAnimelist');
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
      // console.log(e.data, 'getUserProfileById');
      setData(e.data);
    })
    .catch((e) => {
      console.log(e, 'error');
      setFailed(true);
    })
    .finally(() => setLoading(false));
}

export async function sortFunction(item: UsersAnimeData, sortScore: 'up' | 'down' | 'none', data: AnimeData) {
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
