"use client"

import { ErrorFeedback, Filter, FollowedAnimeSkeleton, HomePageAnimesSkeleton } from '@/components';
import { getUsersAnimeList, titlesFilterParser, TokenContext } from '@/utils';
import { AnimeCatalogData, FilterType, UsersAnimelist } from '@/utils/types';
import { UsersAnimeListView } from './usersAnimelistView';
import { useContext, useEffect, useState } from 'react';
import { ShowFollowedAnime } from './showFollowedAnime';
import { CloseButton, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { Animelist } from './animelist';
import { getAnimes } from './functions';

export default function Home() {
  const [usersAnimeList, setUsersAnimeList] = useState<UsersAnimelist[] | null>(null);
  const [usersAnimeListFailed, setUsersAnimeListFailed] = useState<boolean>(false);
  const [usersAnimeListLoad, usersAnimeListSetLoad] = useState<boolean>(true);
  const [animeData, setAnimeData] = useState<AnimeCatalogData | null>(null);
  const [animeDataFailed, setAnimeDataFailed] = useState<boolean>(false);
  const [animeDataLoad, setAnimeDataLoad] = useState<boolean>(true);
  const [showFollowedAnime, setShowFollowedAnime] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<FilterType>({
    search: null,
    id_not_in: [],
    status: "RELEASING",
    genre: null,
  })
  const { user } = useContext(TokenContext)
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (showFollowedAnime) {
      getUsersAnimeList({
        setData: setUsersAnimeList,
        setLoading: usersAnimeListSetLoad,
        setFailed: setUsersAnimeListFailed,
      })
    }
  }, [showFollowedAnime])
  useEffect(() => {
    getAnimes({
      setAnimeData,
      setFailed: setAnimeDataFailed,
      setLoading: setAnimeDataLoad,
      page,
      quantity: 30,
      filter
    });
  }, [page, filter]);

  return (
    <div className="flex flex-col-reverse justify-center items-center lg:items-start lg:flex-row m-5 gap-10">
      <div className={`flex flex-col items-center h-full w-[20.2rem] 
        ${showFollowedAnime ? "xl:w-[52rem] md:w-[41.4rem]" : "xl:w-[62.6rem] lg:w-[52rem] md:w-[41.4rem] sm:w-[30.8rem]"}`
      }>
        <h1 className="hover:cursor-pointer py-3 text-xl" onClick={() => { if (page !== 0) setPage(0) }}>
          {filter.status ? titlesFilterParser[filter.status] : "Anime List"}
        </h1>
        <Filter
          setShowFollowedAnime={setShowFollowedAnime}
          showFollowedAnime={showFollowedAnime}
          setFilter={setFilter}
          filter={filter}
          toast={toast}
        />
        {animeDataFailed ? (
          <ErrorFeedback refreshFunction={() =>
            getAnimes({
              setAnimeData,
              setFailed: setAnimeDataFailed,
              setLoading: setAnimeDataLoad,
              page,
              quantity: 30,
            })}
            setFailed={setAnimeDataFailed}
            loading={animeDataLoad}
          />
        ) : animeDataLoad ? (
          <HomePageAnimesSkeleton page={page} />
        ) : (
          <Animelist animeData={animeData} setPage={setPage} page={page} />
        )}
      </div>
      {!showFollowedAnime ? (
        <ShowFollowedAnime
          setShowFollowedAnime={setShowFollowedAnime}
          showFollowedAnime={showFollowedAnime}
          mobile={false}
          toast={toast}
          user={user}
        />
      ) : usersAnimeListFailed ? (
        <div className="relative flex flex-col bg-third rounded-md xl:w-[34rem] lg:w-[17.75rem] md:w-[42.125rem] sm:w-[25.875rem] w-[17.75rem]">
          <CloseButton position={"absolute"} right={2} top={2} color={"white"} onClick={() => setShowFollowedAnime(false)} />
          <h1 className="font-bold text-center p-5 text-xl"> You are following </h1>
          <div className="flex flex-wrap p-5 gap-4">
            <ErrorFeedback refreshFunction={() =>
              getUsersAnimeList({
                setData: setUsersAnimeList,
                setLoading: usersAnimeListSetLoad,
                setFailed: setUsersAnimeListFailed,
              })}
              setFailed={setAnimeDataFailed}
              loading={animeDataLoad}
            />
          </div>
        </div>
      ) : usersAnimeListLoad ? (
        <FollowedAnimeSkeleton />
      ) : (
        <UsersAnimeListView usersAnimeList={usersAnimeList} router={router} />
      )}
    </div>
  )
}
