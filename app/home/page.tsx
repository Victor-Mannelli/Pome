"use client"

import { ErrorFeedback, HomePageAnimesSkeleton, PageHandler, PageHandlerSkeleton } from '@/components';
import { getAnimes, getUsersAnimeList } from './functions';
import { UsersAnimeListView } from './usersAnimeListView';
import { useContext, useEffect, useState } from 'react';
import { AnimeData, UsersAnimeList } from '@/utils';
import { TokenContext } from '@/utils/providers';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [usersAnimeList, setUsersAnimeList] = useState<UsersAnimeList[] | null>(null);
  const [animeData, setAnimeData] = useState<AnimeData | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [failed, setFailed] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(28);
  const [filter, setFilter] = useState<string>('');
  const [page, setPage] = useState<number>(0);

  const { userToken } = useContext(TokenContext);
  const animeList = animeData?.media;
  const router = useRouter();

  useEffect(() => {
    getAnimes({ setAnimeData, setFailed, setLoading, page, quantity });
    // if (userToken) getUsersAnimeList({ setUsersAnimeList })
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-full m-5 gap-5">
      {/* <div className='flex flex-col gap-5 w-[20%]'>
        <h1 className="text-center"> Filters </h1>
        <Filter
          placeholder='search'
          onChange={(e) => setFilter(e.target.value)}
        />
      </div> */}
      <UsersAnimeListView usersAnimeList={usersAnimeList} router={router} />
      {/* {failed ? (
        <ErrorFeedback refreshFunction={() => console.log("reload")} />
      ) : (
        <div className="flex flex-col w-full h-full gap-5">
          <h1 className="text-center hover:cursor-pointer"> Airing </h1>
          <div className={`flex flex-wrap ${animeList && animeList.length <= 7 ? 'gap-x-2' : 'justify-between'} w-fit gap-y-5`}>
            {isLoading ? (
              <HomePageAnimesSkeleton />
            ) : animeList?.length === 0 ? (
              <h1> Nenhum anime encontrado </h1>
            ) : (
              animeList?.map((anime: any) => (
                <div
                  className="flex flex-col justify-end md:w-40 w-full h-64 rounded-md cursor-pointer hover:brightness-90 bg-cover"
                  onClick={() => router.push(`/pome/animes/${anime.id}`)}
                  style={{ backgroundImage: `url(${anime.coverImage.extraLarge})` }}
                  key={anime.id}
                >
                  <h1 className="text-sm cursor-pointer bg-black bg-opacity-60 rounded-b-md p-2"> {anime.title.romaji} </h1>
                </div>
              ))
            )}
            {animeData ?
              <PageHandler
                currentPage={page}
                setPage={setPage}
                hasNextPage={animeData.pageInfo.hasNextPage}
                // route=""
                getAnimes={() => getAnimes({ setAnimeData, setFailed, setLoading, page, quantity })}
              /> :
              <PageHandlerSkeleton />
            }
          </div>
        </div>
      )} */}
    </div >
  );
}
