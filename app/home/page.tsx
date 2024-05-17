"use client"

import { ErrorFeedback, FollowedAnimeSkeleton, HomePageAnimesSkeleton } from '@/components';
import { AnimeData, getUsersAnimeList, UsersAnimeList } from '@/utils';
import { UsersAnimeListView } from './usersAnimeListView';
import { AnimeListWrap } from './animeListWrap';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAnimes } from './functions';

export default function Home() {
  const [usersAnimeList, setUsersAnimeList] = useState<UsersAnimeList[] | null>(null);
  const [usersAnimeListFailed, setUsersAnimeListFailed] = useState<boolean>(false);
  const [usersAnimeListLoad, usersAnimeListSetLoad] = useState<boolean>(true);

  const [animeData, setAnimeData] = useState<AnimeData | null>(null);
  const [animeDataLoad, setAnimeDataLoad] = useState<boolean>(true);
  const [animeDataFailed, setAnimeDataFailed] = useState<boolean>(false);

  const [filter, setFilter] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const router = useRouter();

  useEffect(() => {
    getUsersAnimeList({ setData: setUsersAnimeList, setLoading: usersAnimeListSetLoad, setFailed: setUsersAnimeListFailed })
  }, [])

  useEffect(() => {
    getAnimes({
      setAnimeData,
      setFailed: setAnimeDataFailed,
      setLoading: setAnimeDataLoad,
      page,
      quantity: 28
    });
  }, [page]);

  return (
    <div className="flex flex-col justify-center lg:flex-row h-full max-w-full mb-5 sm:mx-5 sm:mt-5 gap-5">
      {/* <div className='flex flex-col gap-5 w-[20%]'>
        <h1 className="text-center"> Filters </h1>
        <Filter
          placeholder='search'
          onChange={(e) => setFilter(e.target.value)}
        />
      </div> */}
      {usersAnimeListFailed ? null : usersAnimeListLoad ?
        (
          <FollowedAnimeSkeleton />
        ) : usersAnimeList ? (
          <UsersAnimeListView usersAnimeList={usersAnimeList} router={router} />
        ) : (
          <div className='w-full h-fit p-5 rounded-md bg-third'>
            <p className='text-center'> You are not following any anime yet <br /> open their pages and start following!</p>
          </div>
        )
      }
      {animeDataFailed ?
        (
          <ErrorFeedback refreshFunction={() =>
            getAnimes({
              setAnimeData,
              setFailed: setAnimeDataFailed,
              setLoading: setAnimeDataLoad,
              page,
              quantity: 28
            })}
          />
        ) : animeDataLoad ? (
          <HomePageAnimesSkeleton page={page} />
        ) : (
          <AnimeListWrap animeData={animeData} setPage={setPage} router={router} page={page} />
        )
      }
    </div>
  )
}
