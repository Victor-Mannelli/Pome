'use client';

import { AnimeData, SingleAnimeData, UsersAnimeData } from '@/utils/types';
import { ErrorFeedback, FollowedAnimeSkeleton, Link } from '@/components';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { BiMinus, BiPlus, getUsersAnimeList } from '@/utils';
import { getAnimelistQuery } from '@/utils/queries';
import { CloseButton } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import React from 'react';

export function UsersAnimeList({
  setShowFollowedAnime,
  showFollowedAnime,
}: {
  setShowFollowedAnime: Dispatch<SetStateAction<boolean>>;
  showFollowedAnime: boolean;
}) {
  const [usersAnimelist, setUsersAnimelist] = useState<UsersAnimeData[] | null>(null);
  const [usersAnimelistLoading, setUsersAnimelistLoading] = useState<boolean>(true);
  const [usersAnimelistFailed, setUsersAnimelistFailed] = useState<boolean>(false);

  const { loading, error, data } = useQuery<AnimeData>(getAnimelistQuery, {
    variables: {
      quantity: usersAnimelist ? usersAnimelist.length : 0,
      id_in: usersAnimelist ? usersAnimelist.map((anime: UsersAnimeData) => anime.anime_id) : [],
    },
  });

  useEffect(() => {
    if (showFollowedAnime) {
      getUsersAnimeList({
        setData: setUsersAnimelist,
        setLoading: setUsersAnimelistLoading,
        setFailed: setUsersAnimelistFailed,
      });
    }
  }, [showFollowedAnime]);

  return (
    <div className="relative flex flex-col bg-third rounded-md xl:w-[34rem] lg:w-[17.75rem] md:w-[42.125rem] sm:w-[25.875rem] w-[17.75rem]">
      <CloseButton position={'absolute'} right={2} top={2} color={'white'} onClick={() => setShowFollowedAnime(false)} />
      <h1 className="font-bold text-center pt-5"> You are following </h1>
      <div className="flex flex-wrap p-5 gap-4">
        {usersAnimelistFailed || error ? (
          <div className="relative flex flex-col bg-third rounded-md xl:w-[34rem] lg:w-[17.75rem] md:w-[42.125rem] sm:w-[25.875rem] w-[17.75rem]">
            <div className="flex flex-wrap p-5 gap-4">
              <ErrorFeedback
                refreshFunction={() =>
                  getUsersAnimeList({
                    setData: setUsersAnimelist,
                    setLoading: setUsersAnimelistLoading,
                    setFailed: setUsersAnimelistFailed,
                  })
                }
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
            return (
              <Link href={`/anime/${usersAnime.anime_id}`} key={usersAnime.anime_id}>
                <div
                  className="flex flex-col justify-end w-[7.125rem] h-40 bg-fifth rounded-md bg-cover cursor-pointer hover:shadow-black hover:shadow-inner"
                  style={{ backgroundImage: `url(${animeData.coverImage.extraLarge})` }}
                >
                  <div
                    className={`flex flex-col justify-center items-center h-fit w-full bg-black bg-opacity-50 rounded-b-md cursor-default
                    ${animeData.nextAiringEpisode.episode - 1 - usersAnime.progress > 0 ? 'border-b-8 border-signature' : ''}
                  `}
                  >
                    {animeData.nextAiringEpisode.episode - 1 - usersAnime.progress > 0 ? (
                      <div className="flex items-center gap-5">
                        <BiMinus
                          className="text-white text-xl cursor-pointer hover:text-eigth"
                          onClick={(event) => {
                            event.stopPropagation();
                            // updateFollowedAnime({ progress: e.progress - 1, animeId: animeData.anime_id, toggle, setToggle })
                          }}
                        />
                        <h3 className="text-white"> {animeData.nextAiringEpisode.episode - 1 - usersAnime.progress} </h3>
                        <BiPlus
                          className="text-white text-xl cursor-pointer hover:text-eigth"
                          onClick={(event) => {
                            event.stopPropagation();
                            // updateFollowedAnime({ progress: e.progress + 1, animeId: animeData.anime_id, toggle, setToggle })
                          }}
                        />
                      </div>
                    ) : null}
                    <h3 className={`text-white ${animeData.nextAiringEpisode.episode - 1 - usersAnime.progress > 0 ? '' : 'py-1'}`}>
                      {Math.floor(animeData.nextAiringEpisode.timeUntilAiring / 86400)}d{' '}
                      {Math.floor((animeData.nextAiringEpisode.timeUntilAiring % 86400) / 3600)}h{' '}
                      {Math.floor((animeData.nextAiringEpisode.timeUntilAiring % 3600) / 60)}m
                    </h3>
                  </div>
                </div>
              </Link>
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
