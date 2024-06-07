'use client';

import { TokenContext, VariablesContext, FilterType, AnimeData } from '@/utils';
import { ErrorFeedback, Filter, HomePageAnimesSkeleton } from '@/components';
import { getAnimesQuery, getAnimesVariables } from '@/utils/queries';
import { useContext, useEffect, useState } from 'react';
import { ShowFollowedAnime } from './showFollowedAnime';
import { UsersAnimeList } from './usersAnimelist';
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { Animelist } from './animelist';
import React from 'react';

export default function Home() {
  const { animelistTitle, setAnimelistTitle } = useContext(VariablesContext);
  const [showFollowedAnime, setShowFollowedAnime] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
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
  const router = useRouter();

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
      ) : (
        <UsersAnimeList setShowFollowedAnime={setShowFollowedAnime} showFollowedAnime={showFollowedAnime} />
      )}
    </div>
  );
}
