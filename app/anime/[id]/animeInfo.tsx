import { AnimeTags, SingleAnimeData, UsersAnimeData } from '@/utils/types';
import { Dispatch, SetStateAction, useContext } from 'react';
import { animeUserStatus, monthNames } from '@/utils/consts';
import { FaHeart, FaRegHeart } from '@/utils/libs';
import { useToast } from '@chakra-ui/react';
import { TokenContext } from '@/utils';
import { Stars } from '@/components';
import { Sinopse } from './sinopse';
import Image from 'next/image';
import React from 'react';

export function AnimeInfo({
  toggleShowAnimeSettings,
  setUserAnimeData,
  userAnimeData,
  animeData,
}: {
  setUserAnimeData: Dispatch<SetStateAction<UsersAnimeData>>;
  toggleShowAnimeSettings: () => void;
  userAnimeData: UsersAnimeData;
  animeData: SingleAnimeData;
}) {
  const { token } = useContext(TokenContext);
  const toast = useToast();
  return (
    <div className={`relative flex justify-start w-full min-h-72 h-fit ${animeData.bannerImage ? '' : 'mt-16'}`}>
      {userAnimeData ? (
        userAnimeData.favorite === false ? (
          <FaRegHeart
            className="absolute right-1 top-0 my-3 mr-2 text-2xl text-white hover:cursor-pointer"
            onClick={() =>
              token
                ? setUserAnimeData((prevState) => ({
                    ...prevState,
                    favorite: true,
                  }))
                : toast({
                    title: 'Log in first!',
                    status: 'success',
                    isClosable: true,
                  })
            }
          />
        ) : (
          <FaHeart
            className="absolute right-1 top-0 my-3 mr-2 text-2xl text-red-500 hover:cursor-pointer"
            onClick={() =>
              token
                ? setUserAnimeData((prevState) => ({
                    ...prevState,
                    favorite: false,
                  }))
                : toast({
                    title: 'Log in first!',
                    status: 'success',
                    isClosable: true,
                  })
            }
          />
        )
      ) : (
        <FaRegHeart
          className="absolute right-1 top-0 my-3 mr-2 text-2xl text-white hover:cursor-pointer"
          onClick={() =>
            token
              ? setUserAnimeData((prevState) => ({
                  ...prevState,
                  favorite: true,
                }))
              : toast({
                  title: 'Log in first!',
                  status: 'success',
                  isClosable: true,
                })
          }
        />
      )}
      <div
        id="coverImageDisplay"
        className={`${animeData.bannerImage ? 'absolute -top-5 h-[17rem] justify-end' : 'm-5 justify-start'} md:flex hidden flex-col  items-center gap-2 w-[19rem]`}
      >
        <Image
          id="coverImage"
          alt="coverImage"
          className="w-60 h-[23.5rem] rounded-lg"
          src={animeData.coverImage.extraLarge}
          width={1920}
          height={1080}
        />
        <button
          key="coverImageButton"
          className={`flex items-center justify-center w-60 h-9 py-3 rounded-md hover:bg-fifth bg-fourthAndAHalf cursor-pointer font-bold text-lg
            ${userAnimeData ? animeUserStatus[userAnimeData.status].color : 'text-white'}
          `}
          onClick={() => {
            if (!token) {
              toast({
                title: 'Log in first!',
                status: 'error',
                isClosable: true,
              });
              return;
            }
            toggleShowAnimeSettings();
          }}
        >
          {userAnimeData ? animeUserStatus[userAnimeData.status].name : 'Follow'}
        </button>
      </div>
      <div id="animeInfo" className={`flex flex-col w-full md:pl-0 ${animeData.bannerImage ? 'm-5' : 'my-5 mr-5 ml-1'}`}>
        <h1 id="title" className={`w-full pr-7 font-bold text-2xl ${animeData.bannerImage ? 'md:pl-[17.75rem]' : ''} `}>
          {animeData.title.romaji}
        </h1>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row lg:flex-row pt-3 gap-7">
            <div className={`flex flex-col gap-3 ${animeData.bannerImage ? 'md:ml-[17.75rem]' : ''}`}>
              <div className="flex w-72 h-6">
                <h3 className="pr-2 pt-[0.1rem]">
                  <span className="font-bold italic pr-1"> {animeData.status[0] + animeData.status.slice(1).toLocaleLowerCase()} </span>
                  {animeData.averageScore ? 'with' : ''}
                </h3>
                {animeData.averageScore ? <Stars className="" score={animeData.averageScore} /> : null}
              </div>
              {animeData.status === 'RELEASING' && animeData.nextAiringEpisode ? (
                <>
                  <h3 className="w-72 h-6"> Current Episode: {animeData.nextAiringEpisode.episode - 1} </h3>
                  <h3 className="w-72 h-6 text-h-signature">
                    Next Episode in {Math.floor(animeData.nextAiringEpisode.timeUntilAiring / 86400)}d{' '}
                    {Math.floor((animeData.nextAiringEpisode.timeUntilAiring % 86400) / 3600)}h{' '}
                    {Math.floor((animeData.nextAiringEpisode.timeUntilAiring % 3600) / 60)}m{' '}
                  </h3>
                  <h3 className="w-72 h-6"> Total Episodes: {animeData.episodes} </h3>
                </>
              ) : animeData.status === 'NOT_YET_RELEASED' ? (
                <>
                  <h3 className="w-72 h-6 text-h-signature">
                    Start Date: {monthNames[animeData.startDate.month]}
                    {animeData.startDate.day ? ' ' + animeData.startDate.day + 'th, ' : ', '}
                    {animeData.startDate.year}
                  </h3>
                  {animeData.episodes ? <h3> Total Episodes: {animeData.episodes} </h3> : null}
                </>
              ) : null}
              {!animeData.genres ? null : (
                <div id="genres" className="flex flex-wrap gap-1 xl:w-[33.5rem]">
                  {animeData.genres.map((e: string, i: number) => (
                    <h3 key={e + i} className="w-32 h-9 rounded-lg text-center pt-1 text-eigth text-md border">
                      {' '}
                      {e}{' '}
                    </h3>
                  ))}
                </div>
              )}
            </div>
            {animeData.tags ? (
              <div
                id="tags"
                className={`flex flex-wrap ${animeData.bannerImage ? 'xl:flex-col ' : 'flex-col'} items-start gap-2 pl-2 md:pl-7 lg:pl-0 xx:pl-36 xl:h-52 xx:h-48 xl:w-[28rem]`}
              >
                {animeData.tags.slice(0, window.innerWidth < 1780 && 1080 < window.innerWidth ? 21 : 28).map((e: AnimeTags) => (
                  <>
                    <li key={e.id + 'desktop'} className="hidden sm:list-item w-full cursor-default sm:w-[13.5rem] h-[1.35rem] text-eigth">
                      {e.name.replace(' ', '_').length >= 20 ? e.name.slice(0, 20) + '...' : e.name}
                    </li>
                    <li key={e.id + 'mobile'} className="sm:hidden w-full cursor-default sm:w-[13.5rem] h-[1.35rem] text-eigth">
                      {e.name}
                    </li>
                  </>
                ))}
              </div>
            ) : null}
          </div>
          <Sinopse animeData={animeData} inAnimeInfo={true} />
        </div>
      </div>
    </div>
  );
}
