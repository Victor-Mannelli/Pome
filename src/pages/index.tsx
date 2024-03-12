import { Filter, PageHandler, HomePageAnimesSkeleton, FollowedAnimeSkeleton, PageHandlerSkeleton } from '@/components';
import { getAnimes, getAnimesUserList, updateFollowedAnime } from '@/utils/functions';
import { AnimeData, UserFollowingAnime } from '@/utils/interfaces';
import { BiMinus, BiPlus } from '@/utils/libs';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [userFollowedAnimes, setUserFollowedAnimes] = useState<UserFollowingAnime[]>([]);
  const [toggle, setToggle] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>('');
  const [data, setData] = useState<AnimeData>();
  const router = useRouter();

  useEffect(() => {
    getAnimesUserList(setUserFollowedAnimes)
  }, [toggle]);

  useEffect(() => {
    getAnimes({
      quantity: 28 + followedAnimesId.length,
      page: router.asPath === '/' ? 1 : router.query.page,
      setData
    })
  }, [userFollowedAnimes])

  const followedAnimesId: number[] = userFollowedAnimes.map((e: any) => e.anime_id)
  const animeList = data?.media.filter((e) => {
    if (filter) return e.title.romaji.toLocaleLowerCase().includes(filter)
    return !followedAnimesId.includes(e.id)
  });

  return (
    <div className="flex m-5 gap-5">
      <div className='flex flex-col gap-5 w-[15%]'>
        <h1 className="text-center"> Filters </h1>
        <Filter
          placeholder='search'
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="flex flex-col w-full h-full gap-5">
        <h1 className="text-center hover:cursor-pointer"> Airing </h1>
        {data && animeList ?
          <div className={`flex flex-wrap ${animeList && animeList.length <= 7 ? 'gap-x-2' : 'justify-between'} w-fit gap-y-5`}>
            {animeList.map((e: any) =>
              <div
                className="flex flex-col justify-end xl:w-40 w-full h-64 rounded-md cursor-pointer hover:brightness-90 bg-cover"
                onClick={() => router.push(`/pome/animes/${e.id}`)}
                style={{ backgroundImage: `url(${e.coverImage.extraLarge})` }}
                key={e.id}
              >
                <h1 className="text-sm cursor-pointer bg-black bg-opacity-60 rounded-b-md p-2"> {e.title.romaji} </h1>
                {/* <div className='flex justify-center items-center h-2/5 w-full bg-black bg-opacity-60'> </div> 
                      <img
                        className="h-full w-40 rounded-md"
                        src={e.coverImage.extraLarge}
                        alt="anime_image"
                      />  
                      <div className="pl-5 h-full flex flex-col">
                        {e.averageScore ? <Stars className='mb-3' score={e.averageScore} /> : null}
                        <h3 className="cursor-pointer pb-3"> {e.startDate.year} </h3>
                        <h3 className="cursor-pointer h-2/3 overflow-auto">
                          {e.description ? e.description.replace(/(<([^>]+)>)/ig, ' ').replace(/(\r\n|\n|\r)/gm, ' ') : 'No description yet'}
                        </h3>
                      </div> 
                  */}
              </div>
            )}
          </div>
          : <HomePageAnimesSkeleton />
        }
        {data ?
          <PageHandler
            currentPage={data.pageInfo.currentPage}
            hasNextPage={data.pageInfo.hasNextPage}
            route=""
            toggle={toggle}
            setToggle={setToggle}
          /> :
          <PageHandlerSkeleton />
        }
      </div>
      <div className="flex flex-col gap-5 w-2/5 h-fit rounded-md">
        <h1 className="font-bold text-center"> You are following </h1>
        <div className="bg-third w-full flex flex-wrap gap-4 rounded-md p-5 overflow-auto">
          {
            userFollowedAnimes ?
              userFollowedAnimes.length > 0 ? userFollowedAnimes.map((e: UserFollowingAnime) => (
                <div
                  className="flex flex-col justify-end w-32 h-40 bg-fifth rounded-md bg-cover cursor-pointer hover:shadow-black hover:shadow-inner"
                  onClick={() => router.push(`/pome/animes/${e.anime.anime_id}`)}
                  style={{ backgroundImage: `url(${e.anime.cover_image})` }}
                  key={e.anime.anime_id}
                >
                  <div className='flex flex-col justify-center items-center h-fit w-full bg-black bg-opacity-50 rounded-b-md border-b-8 border-signature cursor-default'>
                    {e.anime.next_airing_episode.episode - 1 - e.progress > 0 ?
                      <div className='flex items-center gap-5'>
                        <BiMinus
                          className='text-white text-xl cursor-pointer hover:text-eigth'
                          onClick={(event) => {
                            event.stopPropagation();
                            updateFollowedAnime({ progress: e.progress - 1, animeId: e.anime.anime_id, toggle, setToggle })
                          }}
                        />
                        <h3 className='text-white'> {e.anime.next_airing_episode.episode - 1 - e.progress} </h3>
                        <BiPlus
                          className='text-white text-xl cursor-pointer hover:text-eigth'
                          onClick={(event) => {
                            event.stopPropagation();
                            updateFollowedAnime({ progress: e.progress + 1, animeId: e.anime.anime_id, toggle, setToggle })
                          }}
                        />
                      </div>
                      : null
                    }
                    <h3 className={`text-white ${e.anime.next_airing_episode.episode - 1 - e.progress > 0 ? '' : 'py-1'}`}>
                      {
                        Math.floor(e.anime.next_airing_episode.timeUntilAiring / 86400)
                      }d {
                        Math.floor((e.anime.next_airing_episode.timeUntilAiring % 86400) / 3600)
                      }h {
                        Math.floor((e.anime.next_airing_episode.timeUntilAiring % 3600) / 60)
                      }m
                    </h3>
                  </div>
                </div>
              )) :
                <div className='w-full h-fit p-5 rounded-md bg-third'>
                  {/* <div className='w-32 h-fit bg-fifth rounded-md bg-cover cursor-pointer hover:shadow-black hover:shadow-inner'> */}
                  <p className='text-center'> You are not following any anime yet <br /> open their pages and start following!</p>
                </div>
              : <FollowedAnimeSkeleton />
          }
        </div>
      </div>
    </div >
  );
}
