"use client"

import { AnimeUserStatsInterface, SingleAnimeData, addAnimeUserStatus } from '@/utils';
import { FaHeart, FaRegHeart, RxCross2 } from '@/utils/libs';
import { AnimeUserStats } from './animeUserStatus';
import { Dispatch, SetStateAction, useState } from 'react';

export function UserAnimeSettings({ setShowAnimeSettings, showAnimeSettings, setFetchData, setFavorite, fetchData, favorite, data }: {
  setFetchData: Dispatch<SetStateAction<AnimeUserStatsInterface>>;
  setShowAnimeSettings: Dispatch<SetStateAction<boolean>>;
  setFavorite: Dispatch<SetStateAction<boolean>>;
  fetchData: AnimeUserStatsInterface;
  showAnimeSettings: boolean;
  data: SingleAnimeData;
  favorite: boolean;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);

  function handleAnimeUserStatus(fetchData: AnimeUserStatsInterface) {
    const body = { ...fetchData, animeId: data.id, favorite };
    addAnimeUserStatus({ body, setShowAnimeSettings, setFailed, setLoading });
  }
  return (
    <div
      className='relative lg:w-[60rem] md:w-[70%] w-full md:h-[70%] h-screen bg-second md:rounded-xl md:border border-sixth flex flex-col gap-3'
      onClick={(e) => e.stopPropagation()}
    >
      <RxCross2
        className='absolute z-20 right-4 top-4 text-white text-3xl cursor-pointer hover:text-sixth'
        onClick={() => setShowAnimeSettings(!showAnimeSettings)}
      />
      {/* 
        <div>
          <img className='rounded-t-xl h-[13.1rem]' src={data.bannerImage} alt='banner' />
        </div> 
      */}
      <div
        className={'relative rounded-t-xl h-[13.1rem] bg-cover flex flex-wrap items-end p-3'}
        style={{ backgroundImage: `url(${data.bannerImage})`, boxShadow: 'inset 0 0 200px black' }}
      >
        <h3 className='font-bold'> {data.title.romaji} </h3>
        {favorite
          ? <FaHeart className='absolute right-1 bottom-4 mr-3 text-2xl text-red-500 hover:cursor-pointer' onClick={() => setFavorite(!favorite)} />
          : <FaRegHeart className='absolute right-1 bottom-4 mr-3 text-2xl text-white hover:cursor-pointer' onClick={() => setFavorite(!favorite)} />
        }
      </div>
      <AnimeUserStats maxEpisodes={data.episodes} fetchData={fetchData} setFetchData={setFetchData} />
      <div
        className='absolute bottom-4 right-4 rounded-xl px-7 py-3 bg-fourth hover:bg-fourthAndAHalf cursor-pointer'
        onClick={() => handleAnimeUserStatus(fetchData)}
      >
        <h3 className='cursor-pointer'> Save </h3>
      </div>
    </div>
  )
}
