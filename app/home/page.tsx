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
    getUsersAnimeList({ setUsersAnimeList, setLoading: usersAnimeListSetLoad, setFailed: setUsersAnimeListFailed })
    // getAnimes({ setAnimeData, setFailed: setAnimeDataFailed, setLoading: setAnimeDataLoad, page, quantity });
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-full mb-5 sm:mx-5 sm:mt-5 gap-5">
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
          <>
            <HomePageAnimesSkeleton />
          </>
        ) : (
          <>
          </>
        )
      }

      {/* // <div className="flex flex-col w-full h-full gap-5" > */}
      {/* <h1 className="text-center hover:cursor-pointer"> Airing </h1> */}
      {/* <div className={`flex flex-wrap ${animeList && animeList.length <= 7 ? 'gap-x-2' : 'justify-between'} w-fit gap-y-5`}> */}
      {/* ) : animeList?.length === 0 ? ( */}
      {/* <h1> Nenhum anime encontrado </h1> */}
      {/* ) : ( */}
      {/* <div */}
      {/* // style={{ paddingLeft: calculatePadding({ parentWidth: width, childWidth: 128 }) }} */}
      {/* // className="wrapper-container" */}
      {/* // ref={ref} */}
      {/* // > */}
      {/* {animeList?.map((anime: any) => ( */}
      {/* <div */}
      {/* // className="flex flex-col justify-end md:w-40 w-full h-64 rounded-md cursor-pointer hover:brightness-90 bg-cover" */}
      {/* // onClick={() => router.push(`/pome/animes/${anime.id}`)} */}
      {/* // style={{ backgroundImage: `url(${anime.coverImage.extraLarge})` }} */}
      {/* // key={anime.id} */}
      {/* // > */}
      {/* <h1 className="text-sm cursor-pointer bg-black bg-opacity-60 rounded-b-md p-2"> {anime.title.romaji} </h1> */}
      {/* </div> */}
      {/* // ))} */}
      {/* </div> */}
      {/* )} */}
      {animeData ?
        <PageHandler
          currentPage={page}
          setPage={setPage}
          hasNextPage={animeData.pageInfo.hasNextPage}
          // route=""
          getAnimes={() => getAnimes({
            setAnimeData,
            setFailed: setAnimeDataFailed,
            setLoading: setAnimeDataLoad,
            page,
            quantity
          })}
        /> :
        <PageHandlerSkeleton />
      }
    </div>
  )
}
