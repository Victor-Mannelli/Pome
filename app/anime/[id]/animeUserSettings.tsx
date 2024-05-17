"use client"

import { AnimeUserStatsInterface, SingleAnimeData, addAnimeUserStatus, animeStatus, animeUserStatus } from '@/utils';
import { FaHeart, FaRegHeart, FaTrashAlt, RxCross2 } from '@/utils/libs';
import { Dispatch, SetStateAction, useState } from 'react';
import { AnimeUserStats } from './animeUserStatus';
import { Input, InputGroup, InputLeftAddon, Select } from '@chakra-ui/react';

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

  // function handleAnimeUserStatus(fetchData: AnimeUserStatsInterface) {
  //   const body = { ...fetchData, animeId: data.id, favorite };
  //   addAnimeUserStatus({ body, setShowAnimeSettings, setFailed, setLoading });
  // }
  return (
    <div
      className='relative lg:w-[60rem] md:w-[70%] w-full lg:h-[65%] h-screen bg-second md:rounded-xl md:border border-sixth flex flex-col items-end'
      onClick={(e) => e.stopPropagation()}
    >
      <RxCross2
        className='absolute z-20 right-4 top-4 text-white text-3xl cursor-pointer hover:text-sixth'
        onClick={() => setShowAnimeSettings(!showAnimeSettings)}
      />
      <div
        className={'relative rounded-t-xl h-72 w-full bg-cover flex flex-wrap items-end p-3 bg-right'}
        style={{ backgroundImage: `url(${data.bannerImage})`, boxShadow: 'inset 0 0 200px black' }}
      >
        <h3 className='font-bold'> {data.title.romaji} </h3>
        {favorite
          ? <FaHeart className='absolute right-1 bottom-4 mr-3 text-2xl text-red-500 hover:cursor-pointer' onClick={() => setFavorite(!favorite)} />
          : <FaRegHeart className='absolute right-1 bottom-4 mr-3 text-2xl text-white hover:cursor-pointer' onClick={() => setFavorite(!favorite)} />
        }
      </div>
      <form
        className='flex flex-col items-center justify-center h-full w-full'
        onSubmit={(e) => { e.preventDefault(); console.log(e.target); }}>
        {/* <AnimeUserStats maxEpisodes={data.episodes} fetchData={fetchData} setFetchData={setFetchData} /> */}
        <InputGroup w={"20rem"} h={"3.5rem"}>
          <InputLeftAddon w={"7rem"}> Status </InputLeftAddon>
          <Select placeholder={fetchData.status === '' ? 'Follow' : fetchData.status} roundedLeft={"initial"} textColor={"white"} cursor={"pointer"}>
            {Object.keys(animeStatus).map((e, i) =>
              <option key={i} className='text-white' value={animeStatus[e].name}> {animeStatus[e].name} </option>
              // <div
              //   key={e}
              //   onClick={() => setFetchData({ ...fetchData, status: e })}
              //   className={`px-3 py-2 text-center rounded-md hover:cursor-pointer hover:bg-fourth w-full h-full ${animeStatus[e].color}`}
              // >
              //   {animeStatus[e].name}
              // </div>
            )}
          </Select>
        </InputGroup>
        {Object.keys(animeUserStatus).map((e, i) => (
          <InputGroup w={"20rem"} h={"3.5rem"} key={i}>
            <InputLeftAddon w={"7rem"}> {e} </InputLeftAddon>
            <Input textColor={"white"} type={animeUserStatus[e].type} />
          </InputGroup>
        ))}
        <FaTrashAlt
          className='absolute left-4 top-4 text-white text-xl hover:text-red-400 cursor-pointer'
          onClick={() => console.log("remove anime status from useranimelist")}
        />
        <button className='absolute bottom-4 right-4 rounded-xl px-7 py-3 bg-fourth hover:bg-fourthAndAHalf text-white' type='submit'>
          Save
        </button>
      </form>
    </div>
  )
}
