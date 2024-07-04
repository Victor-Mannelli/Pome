'use client';

import { Button, Input, InputGroup, InputLeftAddon, Select, useToast } from '@chakra-ui/react';
import { upsertUserAnimelist, removeAnimeFromUserAnimelist } from './functions';
import { FaHeart, FaRegHeart, FaTrashAlt, RxCross2 } from '@/utils/libs';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { SingleAnimeData, UsersAnimeData } from '@/utils/types';
import { animeUserData, animeUserStatus } from '@/utils/consts';
import { useOnClickOutside } from 'usehooks-ts';
import { usePathname } from 'next/navigation';
import { Link } from '@/components';
import Image from 'next/image';
import React from 'react';

export function AnimeUserSettings({
  setShowAnimeSettings,
  setUserAnimeData,
  userAnimeData,
  animeData,
}: {
  setUserAnimeData: Dispatch<SetStateAction<UsersAnimeData>>;
  setShowAnimeSettings: Dispatch<SetStateAction<boolean>>;
  userAnimeData: UsersAnimeData;
  animeData: SingleAnimeData;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const pathname = usePathname();
  const toast = useToast();
  const ref = useRef(null);

  useOnClickOutside(ref, () => setShowAnimeSettings(false));

  return (
    <div
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-start lg:w-[50rem] md:w-[70%] w-full lg:h-[28rem] h-screen bg-second md:rounded-xl md:border border-sixth"
      onClick={(e) => e.stopPropagation()}
      ref={ref}
    >
      <RxCross2
        className="absolute z-20 right-4 top-4 text-white text-3xl cursor-pointer hover:text-fourth drop-shadow-[0_0_3px_rgb(0_0_0)]"
        onClick={() => setShowAnimeSettings(false)}
      />
      <div className={'relative rounded-t-xl h-60 w-full bg-cover flex items-end bg-right'} style={{ boxShadow: 'inset 0 0 200px black' }}>
        <Link href={pathname.includes('anime') ? null : `/anime/${animeData.id}`}>
          {animeData.bannerImage ? (
            <Image className="w-full h-full rounded-t-xl" alt="banner" src={animeData.bannerImage} width={1920} height={1080} />
          ) : null}
        </Link>
        <h3 className="absolute bottom-3 left-3 font-bold drop-shadow-[0_0_7px_rgb(0_0_0)]"> {animeData.title.romaji} </h3>
        {userAnimeData ? (
          userAnimeData.favorite === true ? (
            <FaHeart
              className="z-20 absolute right-1 bottom-4 mr-3 text-2xl text-red-500 hover:cursor-pointer drop-shadow-[0_0_2px_rgb(255_255_255)]"
              onClick={(e) => {
                e.stopPropagation();
                setUserAnimeData((prevState) => ({ ...prevState, favorite: false }));
              }}
            />
          ) : (
            <FaRegHeart
              className="z-20 absolute right-1 bottom-4 mr-3 text-2xl text-white hover:cursor-pointer drop-shadow-[0_0_7px_rgb(0_0_0)]"
              onClick={(e) => {
                e.stopPropagation();
                setUserAnimeData((prevState) => ({ ...prevState, favorite: true }));
              }}
            />
          )
        ) : (
          <FaRegHeart
            className="z-20 absolute right-1 bottom-4 mr-3 text-2xl text-white hover:cursor-pointer drop-shadow-[0_0_7px_rgb(0_0_0)]"
            onClick={(e) => {
              e.stopPropagation();
              setUserAnimeData((prevState) => ({ ...prevState, favorite: true }));
            }}
          />
        )}
      </div>
      <div className="flex items-center justify-center h-full w-full">
        <form
          className="flex flex-col flex-wrap items-center justify-center lg:h-40 w-[37rem] gap-5 mr-10"
          onSubmit={(e) => {
            e.preventDefault();
            upsertUserAnimelist({
              animeUserStats: {
                anime_id: animeData.id,
                status: e.target['status'].value,
                score: Number(e.target['score']?.value),
                progress: e.target['status'].value === 'Finished' ? Number(animeData.episodes) : Number(e.target['progress']?.value),
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
          <InputGroup w={'17rem'}>
            <InputLeftAddon className="flex justify-center h-full cursor-default" w={'7rem'}>
              Status
            </InputLeftAddon>
            <Select
              roundedLeft={'initial'}
              textColor={'white'}
              cursor={'pointer'}
              iconColor="white"
              id="status"
              required
              placeholder={userAnimeData ? userAnimeData.status : 'Follow'}
              defaultValue={userAnimeData ? userAnimeData.status : null}
              w={'10rem'}
            >
              {Object.keys(animeUserStatus).map((e, i) => (
                <option key={'select_options' + i} value={animeUserStatus[e].name}>
                  {animeUserStatus[e].name}
                </option>
              ))}
            </Select>
          </InputGroup>
          {Object.keys(animeUserData).map((e, i) => (
            <InputGroup w={'17rem'} key={'input' + i}>
              <InputLeftAddon className="flex justify-center cursor-default" w={'7rem'}>
                {animeUserData[e].title}
              </InputLeftAddon>
              <Input
                id={e}
                min={animeUserData[e].min}
                max={
                  e === 'progress'
                    ? animeData.nextAiringEpisode
                      ? animeData.nextAiringEpisode.episode - 1
                      : animeData.episodes
                    : animeUserData[e].max
                }
                cursor={animeUserData[e].cursor}
                colorScheme={'dark'}
                type={animeUserData[e].type}
                defaultValue={userAnimeData ? userAnimeData[e] : animeUserData[e].defaultValue}
                autoComplete="off"
                textColor={'white'}
                w={'10rem'}
              />
            </InputGroup>
          ))}
          <FaTrashAlt
            className="absolute left-4 top-4 text-white text-xl hover:text-red-400 cursor-pointer drop-shadow-[0_0_3px_rgb(0_0_0)]"
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
