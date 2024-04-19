// import { Filter, PageHandler, HomePageAnimesSkeleton, FollowedAnimeSkeleton, PageHandlerSkeleton } from '@/components';
// import { getAnimes, getAnimesUserList, updateFollowedAnime } from '@/utils/functions';
// import { AnimeData, UserFollowingAnime } from '@/utils/interfaces';
"use client"

import { useEffect, useState } from 'react';
import { AnimeData, BiMinus, BiPlus } from '@/utils';
import { useRouter } from 'next/navigation';
import { ErrorFeedback, HomePageAnimesSkeleton } from '@/components';
import { Filter } from '@/components/filter';
import { getAnimes } from './functions';

export default function Home() {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [failed, setFailed] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(20);
  // const [animeList, setAnimeList] = useState<any>([]);
  const [animeData, setAnimeData] = useState<AnimeData | null>(null);
  const [filter, setFilter] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const router = useRouter();
  const animeList = animeData?.media;

	useEffect(() => {
		getAnimes({ setAnimeData, setFailed, setLoading, page, quantity });
	}, []);



  return (
    <div className="flex m-5 gap-5">
      <div className='flex flex-col gap-5 w-[15%]'>
        <h1 className="text-center"> Filters </h1>
        <Filter
          placeholder='search'
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      {failed ? (
        <ErrorFeedback refreshFunction={() => console.log("reload")} />
      ) : (
        <div className="flex flex-col w-full h-full gap-5">
          <div className={`flex flex-wrap ${animeList && animeList.length <= 7 ? 'gap-x-2' : 'justify-between'} w-fit gap-y-5`}>
            <h1 className="text-center hover:cursor-pointer"> Airing </h1>
            {isLoading ? (
              <HomePageAnimesSkeleton />
            ) : animeList?.length === 0 ? (
              <h1> Nenhum anime encontrado </h1>
            ) : (
              <>
              </>
              // animeList.map((anime: any) => (
              //   <div
              //     className="flex flex-col justify-end xl:w-40 w-full h-64 rounded-md cursor-pointer hover:brightness-90 bg-cover"
              //     onClick={() => router.push(`/pome/animes/${anime.id}`)}
              //     style={{ backgroundImage: `url(${anime.coverImage.extraLarge})` }}
              //     key={anime.id}
              //   >
              //     <h1 className="text-sm cursor-pointer bg-black bg-opacity-60 rounded-b-md p-2"> {anime.title.romaji} </h1>
              //   </div>
              // ))
            )}
          </div>
        </div>
      )}
    </div >
  );
}
