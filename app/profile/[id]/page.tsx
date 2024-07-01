'use client';

import { AnimeData, FaSortAmountDown, FaSortAmountUpAlt, FilterType, TokenContext, UsersAnimeData, getAnimelistQuery, FaSort } from '@/utils';
import { applyUnderscoreFilter, getUsersAnimelist, sortFunction } from './functions';
import { AnimeFilter, ProfileSkeleton } from '@/components';
import { bufferToBase64, logout } from '@/utils/functions';
import { useContext, useEffect, useState } from 'react';
import { Avatar, useToast } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { AnimeRow } from './animeRow';
import _ from 'underscore';
import React from 'react';

export default function Profile() {
  const [usersAnimelist, setUsersAnimelist] = useState<UsersAnimeData[] | null>(null);
  const [usersAnimelistFailed, setUsersAnimelistFailed] = useState<boolean>(false);
  const [usersAnimelistLoad, usersAnimelistSetLoad] = useState<boolean>(true);
  const [sortScore, setSortScore] = useState<'up' | 'down' | 'none'>('none');
  const { user, setToken, setUser } = useContext(TokenContext);
  const [filter, setFilter] = useState<FilterType>({
    search: null,
    status: null,
    genres: null,
    year: null,
  });
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
  const animelist = _.sortBy(filteredAnimelist, (item) => sortFunction(item, sortScore, data));

  return usersAnimelistFailed || error ? (
    logout({ setToken, setUser, toast })
  ) : usersAnimelistLoad || loading ? (
    <ProfileSkeleton />
  ) : usersAnimelist ? (
    <div className="flex flex-col items-center">
      <div
        className={'flex items-end w-full h-60 mb-2 bg-cover'}
        style={user?.banner ? { backgroundImage: `url('data:image/png;base64, ${bufferToBase64(user?.banner)}')` } : { backgroundColor: '#1e1e1e' }}
      >
        <div className="flex justify-end w-1/4">
          <Avatar
            borderRadius={2}
            h={160}
            w={137}
            className="cursor-pointer"
            src={user ? `data:image/png;base64, ${bufferToBase64(user.avatar)}` : null}
          />
        </div>
        <h1 className="w-3/4 pl-7 pb-5 text-2xl"> {user?.username?.[0]?.toUpperCase() + user?.username?.slice(1)} </h1>
      </div>
      <AnimeFilter setFilter={setFilter} showFollowedAnime={true} filter={filter} />
      <div className="flex flex-col gap-[0.3rem] xl:w-[62.6rem] lg:w-[52rem] md:w-[41.4rem] sm:w-[30.8rem]">
        <div className="grid grid-cols-[6%_58.72%_11%_11%_13.28%] w-full p-3">
          <h3 className="text-center break-all font-bold"> Title </h3>
          <div></div>
          <div
            className="flex items-center justify-center gap-1 cursor-pointer [&>*]:cursor-pointer [&>h3]:hover:text-signature"
            onClick={() => setSortScore((prevState) => (prevState === 'none' ? 'up' : prevState === 'up' ? 'down' : 'none'))}
          >
            <h3 className="text-center font-bold">Score</h3>
            {sortScore === 'down' ? (
              <FaSortAmountUpAlt className="text-white" />
            ) : sortScore === 'up' ? (
              <FaSortAmountDown className="text-white" />
            ) : (
              <FaSort className="text-white" />
            )}
          </div>
          <h3 className="text-center font-bold"> Progress </h3>
          <h3 className="text-center font-bold"> Status </h3>
        </div>
        {usersAnimelist && usersAnimelist.length > 0 ? (
          animelist.map((anime: UsersAnimeData) => {
            const animeData = data.Page.media;
            return <AnimeRow key={anime.anime_id} animeData={animeData} anime={anime} />;
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
