"use client"

import { ErrorFeedback, Filter, FollowedAnimeSkeleton, HomePageAnimesSkeleton, PageHandler } from '@/components';
import { AnimeCatalogData, FilterType, UsersAnimelist } from '@/utils/types';
import { getUsersAnimeList, titlesFilterParser } from '@/utils';
import { UsersAnimeListView } from './usersAnimelistView';
import { useEffect, useState } from 'react';
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
  const [filter, setFilter] = useState<FilterType>({
    search: null,
    id_not_in: [],
    status: "RELEASING",
    genre: null,
  })
  const [page, setPage] = useState<number>(1);
  const router = useRouter();

  useEffect(() => {
    getUsersAnimeList({
      setData: setUsersAnimeList,
      setLoading: usersAnimeListSetLoad,
      setFailed: setUsersAnimeListFailed,
    })
  }, [])
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

  console.log(filter)

  return (
    <div className="flex flex-col-reverse justify-center items-center lg:items-start lg:flex-row m-5 gap-10">
      <div className={`flex flex-col items-center h-full w-[20.2rem] ${usersAnimeListFailed
        ? "xl:w-[62.6rem] lg:w-[52rem] md:w-[41.4rem] sm:w-[30.8rem]" : "xl:w-[52rem] md:w-[41.4rem]"}`
      }>
        <h1 className="hover:cursor-pointer py-3 text-xl" onClick={() => { if (page !== 0) setPage(0) }}>
          {titlesFilterParser[filter.status]}
        </h1>
        <Filter setFilter={setFilter} filter={filter} />
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
      {usersAnimeListFailed ? null : usersAnimeListLoad ? (
        <FollowedAnimeSkeleton />
      ) : (
        <UsersAnimeListView usersAnimeList={usersAnimeList} router={router} />
      )}
    </div>
  )
}
