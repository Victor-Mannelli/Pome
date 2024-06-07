'use client';

import { TokenContext, VariablesContext, getUsersAnimeList, FilterType, UsersAnimeData, AnimeData } from '@/utils';
import { ErrorFeedback, Filter, FollowedAnimeSkeleton, HomePageAnimesSkeleton } from '@/components';
import { getAnimesQuery, getAnimesVariables } from '@/utils/queries';
import { UsersAnimeListView } from './usersAnimelistView';
import { useContext, useEffect, useState } from 'react';
import { ShowFollowedAnime } from './showFollowedAnime';
import { CloseButton } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { Animelist } from './animelist';
import React from 'react';

export default function Home() {
  const [usersAnimeList, setUsersAnimeList] = useState<UsersAnimeData[] | null>(null);
  const [usersAnimeListFailed, setUsersAnimeListFailed] = useState<boolean>(false);
  const [usersAnimeListLoad, usersAnimeListSetLoad] = useState<boolean>(true);
  const [showFollowedAnime, setShowFollowedAnime] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const router = useRouter();
  const { animelistTitle, setAnimelistTitle } = useContext(VariablesContext);
  const { user } = useContext(TokenContext);
  const [filter, setFilter] = useState<FilterType>({
    status: animelistTitle,
    id_not_in: [],
    search: null,
    genres: null,
    year: null,
  });
  const {
    loading: animeDataLoading,
    error: animeDataError,
    data: animeData,
  } = useQuery<AnimeData>(getAnimesQuery, { variables: getAnimesVariables({ quantity: 30, page, filter }) });

  useEffect(() => {
    if (showFollowedAnime) {
      getUsersAnimeList({
        setData: setUsersAnimeList,
        setLoading: usersAnimeListSetLoad,
        setFailed: setUsersAnimeListFailed,
      });
    }
  }, [showFollowedAnime]);

  useEffect(() => {
    setAnimelistTitle(filter.status);
  }, [filter, setAnimelistTitle]);

  return (
    <div className="relative flex flex-col-reverse justify-center items-center lg:items-start lg:flex-row m-5 lg:gap-10 gap-3">
      <div
        className={`flex flex-col items-center h-full w-[20.2rem] 
        ${showFollowedAnime ? 'xl:w-[52rem] md:w-[41.4rem]' : 'xl:w-[62.6rem] lg:w-[52rem] md:w-[41.4rem] sm:w-[30.8rem]'}`}
      >
        <Filter setShowFollowedAnime={setShowFollowedAnime} showFollowedAnime={showFollowedAnime} setFilter={setFilter} filter={filter} />
        {animeDataError ? (
          <div className="h-[calc(100vh-20rem)] flex items-center justify-center">
            <ErrorFeedback animeApi={true} loading={animeDataLoading} refreshFunction={() => router.refresh()} />
          </div>
        ) : animeDataLoading ? (
          <HomePageAnimesSkeleton page={page} />
        ) : (
          <Animelist animeData={animeData.Page} setPage={setPage} page={page} />
        )}
      </div>
      {!showFollowedAnime ? (
        <ShowFollowedAnime
          setShowFollowedAnime={setShowFollowedAnime}
          showFollowedAnime={showFollowedAnime}
          mobile={false}
          // toast={toast}
          user={user}
        />
      ) : usersAnimeListFailed ? (
        <div className="relative flex flex-col bg-third rounded-md xl:w-[34rem] lg:w-[17.75rem] md:w-[42.125rem] sm:w-[25.875rem] w-[17.75rem]">
          <CloseButton position={'absolute'} right={2} top={2} color={'white'} onClick={() => setShowFollowedAnime(false)} />
          <h1 className="font-bold text-center p-5 text-xl"> You are following </h1>
          <div className="flex flex-wrap p-5 gap-4">
            <ErrorFeedback
              refreshFunction={() =>
                getUsersAnimeList({
                  setData: setUsersAnimeList,
                  setLoading: usersAnimeListSetLoad,
                  setFailed: setUsersAnimeListFailed,
                })
              }
              setFailed={setUsersAnimeListFailed}
              loading={usersAnimeListLoad}
              animeApi={false}
            />
          </div>
        </div>
      ) : usersAnimeListLoad ? (
        <FollowedAnimeSkeleton />
      ) : (
        <UsersAnimeListView usersAnimeList={usersAnimeList} setShowFollowedAnime={setShowFollowedAnime} />
      )}
    </div>
  );
}
