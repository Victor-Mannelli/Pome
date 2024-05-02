"use client"

import { ErrorFeedback, FollowedAnimeSkeleton, HomePageAnimesSkeleton, PageHandler, PageHandlerSkeleton } from '@/components';
import { getAnimes, getUsersAnimeList } from './functions';
import { UsersAnimeListView } from './usersAnimeListView';
import { useContext, useEffect, useState } from 'react';
import { AnimeData, UsersAnimeList } from '@/utils';
import { TokenContext } from '@/utils/providers';
import { useRouter } from 'next/navigation';
import { useObserveElementWidth } from '@/utils/hooks';
import { calculatePadding } from '@/utils/functions';
import { AnimeListWrap } from './animeListWrap';

export default function Home() {
  const [usersAnimeList, setUsersAnimeList] = useState<UsersAnimeList[] | null>(null);
  const [usersAnimeListLoad, usersAnimeListSetLoad] = useState<boolean>(true);
  const [usersAnimeListFailed, setUsersAnimeListFailed] = useState<boolean>(false);

  const [animeData, setAnimeData] = useState<AnimeData | null>(null);
  const [animeDataLoad, setAnimeDataLoad] = useState<boolean>(true);
  const [animeDataFailed, setAnimeDataFailed] = useState<boolean>(false);

  const [quantity, setQuantity] = useState<number>(28);
  const [filter, setFilter] = useState<string>('');
  const [page, setPage] = useState<number>(0);

  // const { userToken } = useContext(TokenContext);
  const { width, ref } = useObserveElementWidth();
  const animeList = animeData?.media;
  const router = useRouter();

  useEffect(() => {
    // getUsersAnimeList({ setUsersAnimeList, setLoading: usersAnimeListSetLoad, setFailed: setUsersAnimeListFailed })
    // getAnimes({ setAnimeData, setFailed: setAnimeDataFailed, setLoading: setAnimeDataLoad, page, quantity });
  }, []);

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
            getAnimes({ setAnimeData, setFailed: setAnimeDataFailed, setLoading: setAnimeDataLoad, page, quantity })}
          />
        ) : animeDataLoad ? (
          <HomePageAnimesSkeleton />
        ) : (
          <AnimeListWrap
            animeData={animeData}
            setPage={setPage}
            router={router}
            page={page}
            getAnimes={() => getAnimes({
              setAnimeData,
              setFailed: setAnimeDataFailed,
              setLoading: setAnimeDataLoad,
              page,
              quantity
            })}
          />
        )
      }
    </div>
  )
}
{/* <h1> Nenhum anime encontrado </h1> */ }
