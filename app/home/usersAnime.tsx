'use client';

import React, { Dispatch, SetStateAction, useRef } from 'react';
import { SingleAnimeData, UsersAnimeData } from '@/utils/types';
import { useDebounceCallback } from 'usehooks-ts';
import { updateUserProgress } from './functions';
import { BiMinus, BiPlus } from '@/utils/libs';
import { useToast } from '@chakra-ui/react';
import { Link } from '@/components';
import Image from 'next/image';

export function UsersAnime({
  episodeParam,
  usersAnime,
  animeData,
  setData,
}: {
  setData: Dispatch<SetStateAction<UsersAnimeData[]>>;
  usersAnime: UsersAnimeData;
  animeData: SingleAnimeData;
  episodeParam: number;
}) {
  const progressRef = useRef(0);
  const toast = useToast();

  const debouncedUpdate = useDebounceCallback(() => {
    if (progressRef.current === 0) return;
    updateUserProgress({
      progress: usersAnime.progress + progressRef.current,
      anime_id: animeData.id,
      toast,
    });
    progressRef.current = 0;
  }, 4000);

  const handleProgressChange = (change: number) => {
    progressRef.current += change;
    setData((prevState) =>
      prevState.map((userAnimeData) => {
        if (userAnimeData.anime_id === animeData.id) {
          return { ...userAnimeData, progress: userAnimeData.progress + change };
        }
        return userAnimeData;
      }),
    );
    debouncedUpdate();
  };

  return (
    <div className="relative flex flex-col justify-end w-[7.125rem] h-40 bg-fifth rounded-md cursor-pointer hover:shadow-black hover:shadow-inner">
      <Link href={`/anime/${usersAnime.anime_id}`}>
        <Image
          className="absolute inset-0 rounded-md w-[7.125rem] h-40"
          src={animeData.coverImage.extraLarge}
          alt={'CoverImage'}
          height={1080}
          width={1920}
        />
      </Link>
      <div
        className={`z-10 flex flex-col justify-center items-center h-fit w-full bg-black bg-opacity-50 rounded-b-md cursor-default
        ${episodeParam - usersAnime.progress > 0 ? 'border-b-[6px] border-signature' : ''}
      `}
      >
        {episodeParam - usersAnime.progress > 0 ? (
          <div className={`z-10 flex items-center gap-5 ${!animeData.nextAiringEpisode ? 'py-[0.15rem]' : ''}`}>
            <BiMinus
              className="text-white text-xl cursor-pointer hover:text-eigth"
              onClick={(event) => {
                event.stopPropagation();
                handleProgressChange(-1);
              }}
            />
            <h3 className="text-white"> {episodeParam - usersAnime.progress} </h3>
            <BiPlus
              className="text-white text-xl cursor-pointer hover:text-eigth"
              onClick={(event) => {
                event.stopPropagation();
                handleProgressChange(+1);
              }}
            />
          </div>
        ) : null}
        <h3 className={`text-white ${episodeParam - usersAnime.progress > 0 ? '' : 'py-1'}`}>
          {animeData.nextAiringEpisode ? (
            <>
              {Math.floor(animeData.nextAiringEpisode.timeUntilAiring / 86400)}d{' '}
              {Math.floor((animeData.nextAiringEpisode.timeUntilAiring % 86400) / 3600)}h{' '}
              {Math.floor((animeData.nextAiringEpisode.timeUntilAiring % 3600) / 60)}m
            </>
          ) : null}
        </h3>
      </div>
    </div>
  );
}
