'use client';

import { animeUserStatus, ProfilePageSlugObject, SingleAnimeData, UsersAnimeData } from '@/utils';
import { AnimeUserSettings } from '@/anime/[id]/animeUserSettings';
import React, { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';

export function AnimeRow({
  setProfileData,
  animeData,
  anime,
}: {
  setProfileData: Dispatch<SetStateAction<ProfilePageSlugObject>>;
  animeData: SingleAnimeData;
  anime: UsersAnimeData;
}) {
  const [showAnimeSettings, setShowAnimeSettings] = useState<boolean>(false);
  const [userAnimeData, setUserAnimeData] = useState<UsersAnimeData>(anime);

  return (
    <>
      <div
        key={anime.anime_id}
        className="grid grid-cols-[6%_3%_55.72%_11%_11%_13.28%] px-3 py-1 w-full items-center hover:bg-second rounded-md cursor-pointer text-sm"
        onClick={() => setShowAnimeSettings(true)}
        style={{
          boxShadow: 'rgba(0, 0, 0, 0.15) 0px -30px 60px -12px inset',
        }}
      >
        <Image alt="animeCover" src={animeData.coverImage.medium} className="h-[4rem] rounded-sm" width={1920} height={1080} />
        <span className={`${animeData.status === 'RELEASING' ? 'bg-[#00FF01]' : ''} rounded-full h-2 w-2 m-auto`}> </span>
        <h3 className="cursor-pointer">{animeData.title.romaji} </h3>
        <h3 className="text-center cursor-pointer"> {anime.score} </h3>
        <h3 className="text-center cursor-pointer"> {anime.progress} </h3>
        <h3 className={`text-center cursor-pointer font-bold ${animeUserStatus[anime.status].color}`}> {anime.status} </h3>
      </div>
      {showAnimeSettings ? (
        <AnimeUserSettings
          setShowAnimeSettings={setShowAnimeSettings}
          setUserAnimeData={setUserAnimeData}
          setProfileData={setProfileData}
          userAnimeData={userAnimeData}
          animeData={animeData}
        />
      ) : null}
    </>
  );
}
