'use client';

import { AnimeUserSettings } from '@/anime/[id]/animeUserSettings';
import { SingleAnimeData, UsersAnimeData } from '@/utils';
import React, { useState } from 'react';
import Image from 'next/image';

export function AnimeRow({ animeData, anime }: { animeData: SingleAnimeData[]; anime: UsersAnimeData }) {
  const [showAnimeSettings, setShowAnimeSettings] = useState<boolean>(false);
  const [userAnimeData, setUserAnimeData] = useState<UsersAnimeData>(anime);
  const animeRowData = animeData.find((animeData) => animeData.id === anime.anime_id);

  return (
    <>
      <div
        key={anime.anime_id}
        className="grid grid-cols-[6%_58.72%_11%_11%_13.28%] px-3 py-1 w-full items-center hover:bg-second rounded-md cursor-pointer text-sm"
        onClick={() => setShowAnimeSettings(true)}
        style={{
          boxShadow: 'rgba(0, 0, 0, 0.15) 0px -30px 60px -12px inset',
        }}
      >
        <Image alt="animeCover" src={animeRowData.coverImage.medium} className="h-[4rem] rounded-sm" width={1920} height={1080} />
        <h3 className="pl-5 break-all cursor-pointer"> {animeRowData.title.romaji} </h3>
        <h3 className="text-center cursor-pointer"> {anime.score} </h3>
        <h3 className="text-center cursor-pointer"> {anime.progress} </h3>
        <h3 className="text-center cursor-pointer"> {anime.status} </h3>
      </div>
      {showAnimeSettings ? (
        <AnimeUserSettings
          setUserAnimeData={setUserAnimeData}
          setShowAnimeSettings={setShowAnimeSettings}
          animeData={animeRowData}
          userAnimeData={userAnimeData}
        />
      ) : null}
    </>
  );
}
