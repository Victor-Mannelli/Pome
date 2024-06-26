'use client';

import { AnimeData, SingleAnimeData, UsersAnimeData } from '@/utils/types';
import { ErrorFeedback, FollowedAnimeSkeleton } from '@/components';
import { getAnimelistQuery } from '@/utils/queries';
import { Dispatch, SetStateAction } from 'react';
import { CloseButton } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { UsersAnime } from './usersAnime';
import React from 'react';

export function UsersAnimeList({
  setUsersAnimelistFailed,
  usersAnimelistLoading,
  setShowFollowedAnime,
  usersAnimelistFailed,
  setUsersAnimelist,
  getDataFunction,
  usersAnimelist,
}: {
  setUsersAnimelist: Dispatch<SetStateAction<UsersAnimeData[] | null>>;
  setUsersAnimelistFailed: Dispatch<SetStateAction<boolean>>;
  setShowFollowedAnime: Dispatch<SetStateAction<boolean>>;
  usersAnimelist: UsersAnimeData[] | null;
  usersAnimelistLoading: boolean;
  usersAnimelistFailed: boolean;
  getDataFunction: () => void;
}) {
  const { loading, error, data } = useQuery<AnimeData>(getAnimelistQuery, {
    variables: {
      quantity: usersAnimelist ? usersAnimelist.length : 0,
      id_in: usersAnimelist ? usersAnimelist.map((anime: UsersAnimeData) => anime.anime_id) : [],
    },
  });

  return (
    <div className="relative flex flex-col bg-third rounded-md xl:w-[34rem] lg:w-[17.75rem] md:w-[42.125rem] sm:w-[25.875rem] w-[17.75rem]">
      <CloseButton position={'absolute'} right={2} top={2} color={'white'} onClick={() => setShowFollowedAnime(false)} />
      <h1 className="font-bold text-center pt-5"> You are following </h1>
      <div className="flex flex-wrap p-5 gap-4">
        {usersAnimelistFailed || error ? (
          <div className="relative flex flex-col bg-third rounded-md xl:w-[34rem] lg:w-[17.75rem] md:w-[42.125rem] sm:w-[25.875rem] w-[17.75rem]">
            <div className="flex flex-wrap p-5 gap-4">
              <ErrorFeedback
                refreshFunction={getDataFunction}
                setFailed={setUsersAnimelistFailed}
                loading={usersAnimelistLoading || loading}
                animeApi={false}
              />
            </div>
          </div>
        ) : loading || usersAnimelistLoading ? (
          <FollowedAnimeSkeleton />
        ) : usersAnimelist && usersAnimelist.length > 0 ? (
          usersAnimelist.map((usersAnime: UsersAnimeData) => {
            const animeData = data.Page.media.find((singleAnime: SingleAnimeData) => singleAnime.id === usersAnime.anime_id);
            const episodeParam = animeData.nextAiringEpisode ? animeData.nextAiringEpisode.episode - 1 : animeData.episodes;
            if (!animeData.nextAiringEpisode && animeData.episodes === usersAnime.progress) return;
            return (
              <UsersAnime
                episodeParam={episodeParam}
                setData={setUsersAnimelist}
                key={usersAnime.anime_id}
                usersAnime={usersAnime}
                animeData={animeData}
              />
            );
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
  );
}
