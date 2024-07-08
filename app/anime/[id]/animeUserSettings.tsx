'use client';

import { ProfilePageSlugObject, SingleAnimeData, UsersAnimeData } from '@/utils/types';
import { Button, Input, InputGroup, InputLeftAddon, useToast } from '@chakra-ui/react';
import { upsertUserAnimelist, removeAnimeFromUserAnimelist } from './functions';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { FaHeart, FaRegHeart, FaTrashAlt, RxCross2 } from '@/utils/libs';
import { animeUserData, animeUserStatus } from '@/utils/consts';
import { useOnClickOutside } from 'usehooks-ts';
import { Link, PomeSelect } from '@/components';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import React from 'react';

export function AnimeUserSettings({
  setShowAnimeSettings,
  userAnimeDataLoading,
  setUserAnimeData,
  setProfileData,
  userAnimeData,
  animeData,
}: {
  setProfileData?: Dispatch<SetStateAction<ProfilePageSlugObject>>;
  setUserAnimeData: Dispatch<SetStateAction<UsersAnimeData>>;
  setShowAnimeSettings: Dispatch<SetStateAction<boolean>>;
  userAnimeDataLoading?: boolean;
  userAnimeData: UsersAnimeData;
  animeData: SingleAnimeData;
}) {
  const [userAnimeStatus, setUserAnimeStatus] = useState<string>(userAnimeData?.status);
  const [loading, setLoading] = useState<boolean>(false);
  const [formKey, setFormKey] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);
  const pathname = usePathname();
  const toast = useToast();
  const ref = useRef(null);

  useOnClickOutside(ref, () => setShowAnimeSettings(false));

  useEffect(() => {
    setFormKey((prevKey) => prevKey + 1);
  }, [userAnimeStatus, userAnimeData, userAnimeDataLoading, animeData]);

  return (
    <div
      className="fixed z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-start lg:w-[50rem] md:w-[70%] w-full lg:h-[28rem] h-fit bg-second rounded-md md:rounded-xl md:border border-sixth"
      onClick={(e) => e.stopPropagation()}
      ref={ref}
    >
      <div className={'relative rounded-t-xl h-[10.5rem] w-full'} style={{ boxShadow: 'inset 0 0 200px black' }}>
        <Link href={pathname.includes('anime') ? null : `/anime/${animeData.id}`}>
          {animeData.bannerImage ? (
            <Image className="w-full h-[10.5rem] rounded-t-md sm:rounded-t-xl" alt="banner" src={animeData.bannerImage} width={1920} height={1080} />
          ) : null}
        </Link>
        <RxCross2
          className="absolute z-10 right-4 top-4 text-white text-3xl cursor-pointer hover:text-fourth drop-shadow-[0_0_3px_rgb(0_0_0)]"
          onClick={() => setShowAnimeSettings(false)}
        />
        <h3 className="absolute bottom-3 left-3 font-bold drop-shadow-[0_0_7px_rgb(0_0_0)]"> {animeData.title.romaji} </h3>
        {userAnimeData && !userAnimeDataLoading ? (
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
      <div className="flex items-center justify-center h-full w-full pb-20 pt-10">
        <form
          key={formKey}
          className="flex flex-col flex-wrap items-center justify-center lg:h-40 w-[37rem] gap-5 sm:mr-10"
          onSubmit={(e) => {
            e.preventDefault();
            if (!userAnimeStatus) {
              toast({
                title: 'Select Status First!',
                status: 'error',
                isClosable: true,
              });
              return;
            }
            const animeUserStats = {
              anime_id: animeData.id,
              status: animeData.episodes && Number(animeData.episodes) === Number(e.target['progress']?.value) ? 'Finished' : userAnimeStatus,
              score: Number(e.target['score']?.value),
              progress: userAnimeStatus === 'Finished' ? Number(animeData.episodes) : Number(e.target['progress']?.value),
              rewatches: Number(e.target['rewatches']?.value),
              startDate: e.target['start_date'].value,
              finishDate: e.target['finish_date']?.value,
              favorite: userAnimeData && userAnimeData.favorite,
            };
            upsertUserAnimelist({
              animeUserStats,
              setShowAnimeSettings,
              setData: setUserAnimeData,
              setLoading,
              toast,
            });
            setProfileData &&
              setProfileData((prevState) => ({
                ...prevState,
                userAnimelist: prevState.usersAnimelist.map((anime) =>
                  anime.anime_id === animeData.id ? { id: animeData.id, user_id: '', ...animeUserStats } : anime,
                ),
              }));
          }}
        >
          <InputGroup w={'17rem'} zIndex={20}>
            <InputLeftAddon className="flex justify-center h-full cursor-default" w={'7rem'}>
              Status
            </InputLeftAddon>
            <PomeSelect
              options={Object.keys(animeUserStatus).reduce((acc, status) => {
                if (!(animeData.status === 'RELEASING' && status === 'Finished')) {
                  acc.push(animeUserStatus[status].name);
                }
                return acc;
              }, [])}
              customSelectStyle="w-40 h-10 text-white bg-second rounded-r-md border border-white relative"
              customOptionsStyle="z-[1000000] top-[2.4rem] w-[9.875rem] bg-second"
              title={userAnimeStatus ? userAnimeStatus : 'Follow'}
              clearSelect={() => setUserAnimeStatus(null)}
              onSelect={(e) => setUserAnimeStatus(e)}
              selectionOf={'Follow'}
              setShow={setShow}
              show={show}
            />
          </InputGroup>
          {Object.keys(animeUserData).map((e, i) => (
            <InputGroup w={'17rem'} key={'input' + i}>
              <InputLeftAddon className="flex justify-center cursor-default" w={'7rem'}>
                {animeUserData[e].title}
              </InputLeftAddon>
              <Input
                id={e}
                max={
                  e === 'progress'
                    ? animeData.nextAiringEpisode
                      ? animeData.nextAiringEpisode.episode - 1
                      : animeData.episodes
                    : animeUserData[e].max
                }
                defaultValue={
                  e == 'progress' && userAnimeStatus == 'Finished'
                    ? animeData.episodes
                    : userAnimeData && !userAnimeDataLoading
                      ? userAnimeData[e]
                      : animeUserData[e].defaultValue
                }
                cursor={animeUserData[e].cursor}
                type={animeUserData[e].type}
                min={animeUserData[e].min}
                autoComplete={'off'}
                colorScheme={'dark'}
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
            className="bottom-4 right-4 rounded-xl px-7 py-3 bg-fourth hover:bg-fourthAndAHalf text-white"
            position={'absolute'}
            isDisabled={loading}
            isLoading={loading}
            type="submit"
          >
            Save
          </Button>
        </form>
      </div>
    </div>
  );
}
