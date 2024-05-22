"use client"

import { Button, Input, InputGroup, InputLeftAddon, Select } from '@chakra-ui/react';
import { addAnimeToUserAnimelist, removeAnimeFromUserAnimelist } from "./functions";
import { FaHeart, FaRegHeart, FaTrashAlt, RxCross2 } from '@/utils/libs';
import { Dispatch, SetStateAction, useState } from 'react';
import { animeStatus, animeUserStatus } from '@/utils';
import { SingleAnimeDataForSlug } from '@/utils/types';

export function UserAnimeSettings({ setShowAnimeSettings, setAnimeData, animeData }: {
  setAnimeData: Dispatch<SetStateAction<SingleAnimeDataForSlug>>;
  setShowAnimeSettings: Dispatch<SetStateAction<boolean>>;
  animeData: SingleAnimeDataForSlug;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);

  return (
    <div
      className='relative lg:w-[60rem] md:w-[70%] w-full lg:h-[65%] h-screen bg-second md:rounded-xl md:border border-sixth flex flex-col items-end'
      onClick={(e) => e.stopPropagation()}
    >
      <RxCross2
        className='absolute z-20 right-4 top-4 text-white text-3xl cursor-pointer hover:text-sixth'
        onClick={() => setShowAnimeSettings(false)}
      />
      <div
        className={'relative rounded-t-xl h-72 w-full bg-cover flex items-end p-3 bg-right'}
        style={{ backgroundImage: `url(${animeData.bannerImage})`, boxShadow: 'inset 0 0 200px black' }}
      >
        <h3 className='font-bold'> {animeData.title.romaji} </h3>
        {animeData.UserAnimeList ? (
          animeData.UserAnimeList.favorite === true
            ? <FaHeart
              className='absolute right-1 bottom-4 mr-3 text-2xl text-red-500 hover:cursor-pointer'
              onClick={() => setAnimeData(prevState => ({
                ...prevState, UserAnimeList: { ...prevState.UserAnimeList, favorite: false }
              }))}
            />
            : <FaRegHeart
              className='absolute right-1 bottom-4 mr-3 text-2xl text-white hover:cursor-pointer'
              onClick={() => setAnimeData(prevState => ({
                ...prevState, UserAnimeList: { ...prevState.UserAnimeList, favorite: true }
              }))}
            />
        ) : (
          <FaRegHeart
            className='absolute right-1 bottom-4 mr-3 text-2xl text-white hover:cursor-pointer'
            onClick={() => setAnimeData(prevState => ({
              ...prevState, UserAnimeList: { ...prevState.UserAnimeList, favorite: true }
            }))}
          />
        )}
      </div>
      <div className='flex items-center justify-center h-full w-full p-5'>
        <form
          className='flex flex-col flex-wrap items-center justify-center h-56 w-[45rem] gap-9'
          onSubmit={(e) => {
            e.preventDefault();
            addAnimeToUserAnimelist({
              animeUserStats: {
                anime_id: animeData.anime_id,
                status: e.target["status"].value,
                score: Number(e.target["score"]?.value),
                progress: Number(e.target["progress"]?.value),
                rewatches: Number(e.target["rewatches"]?.value),
                startDate: e.target["start_date"].value,
                finishDate: e.target["finish_date"]?.value,
                favorite: animeData.UserAnimeList && animeData.UserAnimeList.favorite
              },
              setShowAnimeSettings,
              setData: setAnimeData,
              setFailed,
              setLoading,
            })
          }}>
          {/* <AnimeUserStats maxEpisodes={data.episodes} fetchData={fetchData} setFetchData={setFetchData} /> */}
          <InputGroup w={"20rem"}>
            <InputLeftAddon cursor={"default"} w={"7rem"} h={"3rem"}> Status </InputLeftAddon>
            <Select
              roundedLeft={"initial"}
              textColor={"white"}
              cursor={"pointer"}
              h={"3rem"}
              iconColor='white'
              id='status'
              required
              placeholder={
                animeData.UserAnimeList ? (
                  animeData.UserAnimeList.status === '' ? 'Follow' : animeData.UserAnimeList.status
                ) : 'Follow'
              }
              defaultValue={animeData.UserAnimeList ? animeData.UserAnimeList.status : null}
            >
              {Object.keys(animeStatus).map((e, i) =>
                <option
                  key={"select_options" + i}
                  value={animeStatus[e].name}
                >
                  {animeStatus[e].name}
                </option>
              )}
            </Select>
          </InputGroup>
          {Object.keys(animeUserStatus).map((e, i) =>
            <InputGroup w={"20rem"} key={"input" + i}>
              <InputLeftAddon cursor={"default"} w={"7rem"} h={"3rem"}> {animeUserStatus[e].title} </InputLeftAddon>
              <Input
                id={e}
                min={animeUserStatus[e].min}
                max={e === "progress" ? animeData.nextAiringEpisode.episode - 1 : animeUserStatus[e].max}
                cursor={animeUserStatus[e].cursor}
                colorScheme={"dark"}
                type={animeUserStatus[e].type}
                defaultValue={animeData.UserAnimeList ? animeData.UserAnimeList[e] : animeUserStatus[e].defaultValue}
                autoComplete='off'
                textColor={"white"}
                h={"3rem"}
              />
            </InputGroup>
          )}
          <FaTrashAlt
            className='absolute left-4 top-4 text-white text-xl hover:text-red-400 cursor-pointer'
            onClick={() => removeAnimeFromUserAnimelist(animeData.id)}
          />
          <Button
            isLoading={loading}
            isDisabled={loading}
            position={"absolute"}
            className='bottom-4 right-4 rounded-xl px-7 py-3 bg-fourth hover:bg-fourthAndAHalf text-white'
            type='submit'
          >
            Save
          </Button>
        </form>
      </div>
    </div >
  )
}
