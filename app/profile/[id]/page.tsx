'use client';

import { AnimeData, FilterType, TokenContext, UsersAnimeData, getAnimelistQuery } from '@/utils';
import { applyUnderscoreFilter, getUsersAnimelist } from './functions';
import { AnimeFilter, ProfileSkeleton } from '@/components';
import { useContext, useEffect, useState } from 'react';
import { Avatar, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { logout } from '@/utils/functions';
import { useQuery } from '@apollo/client';
import { AnimeRow } from './animeRow';
import _ from 'underscore';
import React from 'react';

export default function Profile() {
  const [usersAnimelist, setUsersAnimelist] = useState<UsersAnimeData[] | null>(null);
  const [usersAnimelistFailed, setUsersAnimelistFailed] = useState<boolean>(false);
  const [usersAnimelistLoad, usersAnimelistSetLoad] = useState<boolean>(true);
  const { user, setToken, setUser } = useContext(TokenContext);
  const [filter, setFilter] = useState<FilterType>({
    search: null,
    status: null,
    genres: null,
    year: null,
  });
  const router = useRouter();
  const toast = useToast();
  const { loading, error, data } = useQuery<AnimeData>(getAnimelistQuery, {
    variables: {
      quantity: usersAnimelist ? usersAnimelist.length : 0,
      id_in: usersAnimelist ? usersAnimelist.map((anime: UsersAnimeData) => anime.anime_id) : [],
    },
  });

  useEffect(() => {
    getUsersAnimelist({ setData: setUsersAnimelist, setLoading: usersAnimelistSetLoad, setFailed: setUsersAnimelistFailed });
  }, []);
  const filteredAnimelist = _.filter(usersAnimelist, (item: UsersAnimeData) => data && applyUnderscoreFilter(data, item, filter));
  const animelist = _.sortBy(filteredAnimelist, data?.Page?.media?.[0]?.title?.romaji || '').reverse();

  return usersAnimelistFailed || error ? (
    logout({ setToken, setUser, toast })
  ) : usersAnimelistLoad || loading ? (
    <ProfileSkeleton />
  ) : usersAnimelist ? (
    <div className="flex flex-col items-center">
      <div
        className={'flex items-end w-full h-60 mb-2'}
        style={user?.banner ? { backgroundImage: `url('${user?.banner}')` } : { backgroundColor: '#1e1e1e' }}
      >
        <div className="flex justify-end w-1/4">
          <Avatar borderRadius={2} h={160} w={137} className="cursor-pointer" src={user ? user.avatar : null} />
        </div>
        <h1 className="w-3/4 pl-7 pb-5 text-2xl"> {user?.username[0].toUpperCase() + user?.username.slice(1)} </h1>
      </div>
      <AnimeFilter setFilter={setFilter} showFollowedAnime={true} filter={filter} />
      <div className="flex flex-col gap-[0.3rem] xl:w-[62.6rem] lg:w-[52rem] md:w-[41.4rem] sm:w-[30.8rem]">
        <div className="grid grid-cols-[6%_58.72%_11%_11%_13.28%] w-full p-3">
          <h3 className="text-center break-all font-bold"> Title </h3>
          <div></div>
          <h3 className="text-center font-bold"> Score </h3>
          <h3 className="text-center font-bold"> Progress </h3>
          <h3 className="text-center font-bold"> Status </h3>
        </div>
        {usersAnimelist && usersAnimelist.length > 0 ? (
          animelist.map((anime: UsersAnimeData) => {
            const animeData = data.Page.media;
            return <AnimeRow key={anime.anime_id} router={router} animeData={animeData} anime={anime} />;
          })
        ) : (
          <div className="w-full h-fit p-5 rounded-md bg-third">
            <p className="text-center">
              You are not following any anime yet <br /> open their pages and start following!
            </p>
          </div>
        )}
      </div>
    </div>
  ) : null;
}
