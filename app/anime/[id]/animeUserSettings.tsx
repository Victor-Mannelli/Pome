'use client';

import { Button, Input, InputGroup, InputLeftAddon, Select, useToast } from '@chakra-ui/react';
import { addAnimeToUserAnimelist, removeAnimeFromUserAnimelist } from './functions';
import { FaHeart, FaRegHeart, FaTrashAlt, RxCross2 } from '@/utils/libs';
import { SingleAnimeDataForSlug, UsersAnimeData } from '@/utils/types';
import { animeUserData, animeUserStatus } from '@/utils/consts';
import { Dispatch, SetStateAction, useState } from 'react';
import React from 'react';

export function AnimeUserSettings({
  setShowAnimeSettings,
  setUserAnimeData,
  animeData,
  userAnimeData,
}: {
  setUserAnimeData: Dispatch<SetStateAction<UsersAnimeData>>;
  setShowAnimeSettings: Dispatch<SetStateAction<boolean>>;
  animeData: SingleAnimeDataForSlug;
  userAnimeData: UsersAnimeData;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  return (
    <div
      className="relative lg:w-[60rem] md:w-[70%] w-full lg:h-[65%] h-screen bg-second md:rounded-xl md:border border-sixth flex flex-col items-end"
      onClick={(e) => e.stopPropagation()}
    >
      <RxCross2
        className="absolute z-20 right-4 top-4 text-white text-3xl cursor-pointer hover:text-sixth"
        onClick={() => setShowAnimeSettings(false)}
      />
      <div
        className={'relative rounded-t-xl h-72 w-full bg-cover flex items-end p-3 bg-right'}
        style={{ backgroundImage: `url(${animeData.bannerImage})`, boxShadow: 'inset 0 0 200px black' }}
      >
        <h3 className="font-bold"> {animeData.title.romaji} </h3>
        {userAnimeData ? (
          userAnimeData.favorite === true ? (
            <FaHeart
              className="absolute right-1 bottom-4 mr-3 text-2xl text-red-500 hover:cursor-pointer"
              onClick={() => setUserAnimeData((prevState) => ({ ...prevState, favorite: false }))}
            />
          ) : (
            <FaRegHeart
              className="absolute right-1 bottom-4 mr-3 text-2xl text-white hover:cursor-pointer"
              onClick={() => setUserAnimeData((prevState) => ({ ...prevState, favorite: true }))}
            />
          )
        ) : (
          <FaRegHeart
            className="absolute right-1 bottom-4 mr-3 text-2xl text-white hover:cursor-pointer"
            onClick={() => setUserAnimeData((prevState) => ({ ...prevState, favorite: true }))}
          />
        )}
      </div>
      <div className="flex items-center justify-center h-full w-full p-5">
        <form
          className="flex flex-col flex-wrap items-center justify-center h-56 w-[45rem] gap-9"
          onSubmit={(e) => {
            e.preventDefault();
            addAnimeToUserAnimelist({
              animeUserStats: {
                anime_id: animeData.id,
                status: e.target['status'].value,
                score: Number(e.target['score']?.value),
                progress: Number(e.target['progress']?.value),
                rewatches: Number(e.target['rewatches']?.value),
                startDate: e.target['start_date'].value,
                finishDate: e.target['finish_date']?.value,
                favorite: userAnimeData && userAnimeData.favorite,
              },
              setShowAnimeSettings,
              setData: setUserAnimeData,
              setLoading,
              toast,
            });
          }}
        >
          <InputGroup w={'20rem'}>
            <InputLeftAddon cursor={'default'} w={'7rem'} h={'3rem'}>
              {' '}
              Status{' '}
            </InputLeftAddon>
            <Select
              roundedLeft={'initial'}
              textColor={'white'}
              cursor={'pointer'}
              h={'3rem'}
              iconColor="white"
              id="status"
              required
              placeholder={userAnimeData ? userAnimeData.status : 'Follow'}
              defaultValue={userAnimeData ? userAnimeData.status : null}
            >
              {Object.keys(animeUserStatus).map((e, i) => (
                <option key={'select_options' + i} value={animeUserStatus[e].name}>
                  {animeUserStatus[e].name}
                </option>
              ))}
            </Select>
          </InputGroup>
          {Object.keys(animeUserData).map((e, i) => (
            <InputGroup w={'20rem'} key={'input' + i}>
              <InputLeftAddon cursor={'default'} w={'7rem'} h={'3rem'}>
                {' '}
                {animeUserData[e].title}{' '}
              </InputLeftAddon>
              <Input
                id={e}
                min={animeUserData[e].min}
                max={e === 'progress' ? animeData.nextAiringEpisode.episode - 1 : animeUserData[e].max}
                cursor={animeUserData[e].cursor}
                colorScheme={'dark'}
                type={animeUserData[e].type}
                defaultValue={userAnimeData ? userAnimeData[e] : animeUserData[e].defaultValue}
                autoComplete="off"
                textColor={'white'}
                h={'3rem'}
              />
            </InputGroup>
          ))}
          <FaTrashAlt
            className="absolute left-4 top-4 text-white text-xl hover:text-red-400 cursor-pointer"
            onClick={() => removeAnimeFromUserAnimelist({ animeId: animeData.id, toast })}
          />
          <Button
            isLoading={loading}
            isDisabled={loading}
            position={'absolute'}
            className="bottom-4 right-4 rounded-xl px-7 py-3 bg-fourth hover:bg-fourthAndAHalf text-white"
            type="submit"
          >
            Save
          </Button>
        </form>
      </div>
    </div>
  );
}
