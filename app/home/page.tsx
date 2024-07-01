'use client';

import { TokenContext, VariablesContext, FilterType, AnimeData, UsersAnimeData, getUsersFollewedAnime } from '@/utils';
import { ErrorFeedback, AnimeFilter, HomePageAnimesSkeleton } from '@/components';
import { getAnimesQuery, getAnimesVariables } from '@/utils/queries';
import { useContext, useEffect, useState } from 'react';
import { ShowFollowedAnime } from './showFollowedAnime';
import { UsersAnimeList } from './usersAnimelist';
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { Animelist } from './animelist';
import React from 'react';

export default function Home() {
  const { showFollowedAnime, setShowFollowedAnime, animelistTitle, setAnimelistTitle } = useContext(VariablesContext);
  const [usersAnimelist, setUsersAnimelist] = useState<UsersAnimeData[] | null>(null);
  const [usersAnimelistLoading, setUsersAnimelistLoading] = useState<boolean>(true);
  const [usersAnimelistFailed, setUsersAnimelistFailed] = useState<boolean>(false);
  const { user } = useContext(TokenContext);
  const [page, setPage] = useState<number>(1);
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
  const router = useRouter();

  useEffect(() => {
    if (showFollowedAnime) {
      getUsersFollewedAnime({
        setData: setUsersAnimelist,
        setLoading: setUsersAnimelistLoading,
        setFailed: setUsersAnimelistFailed,
        setFilter,
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
        <AnimeFilter setShowFollowedAnime={setShowFollowedAnime} showFollowedAnime={showFollowedAnime} setFilter={setFilter} filter={filter} />
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
      ) : (
        <UsersAnimeList
          setUsersAnimelistFailed={setUsersAnimelistFailed}
          setShowFollowedAnime={setShowFollowedAnime}
          setUsersAnimelist={setUsersAnimelist}
          usersAnimelistLoading={usersAnimelistLoading}
          usersAnimelistFailed={usersAnimelistFailed}
          usersAnimelist={usersAnimelist}
          getDataFunction={() =>
            getUsersFollewedAnime({
              setData: setUsersAnimelist,
              setLoading: setUsersAnimelistLoading,
              setFailed: setUsersAnimelistFailed,
              setFilter,
            })
          }
        />
      )}
    </div>
  );
}
