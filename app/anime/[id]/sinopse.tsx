'use client';

import { SingleAnimeData } from '@/utils/types';
import { useEffect } from 'react';
import DOMPurify from 'dompurify';
import React from 'react';

export function Sinopse({ animeData, inAnimeInfo }: { animeData: SingleAnimeData | null; inAnimeInfo: boolean }) {
  const cleanedDescription = DOMPurify.sanitize(animeData?.description || '');
  // AI = animeInfo && PG = page
  useEffect(() => {
    const sinopseDiv = document.getElementById(inAnimeInfo ? 'sinopseAI' : 'sinopsePG');
    if (sinopseDiv && sinopseDiv.innerHTML !== cleanedDescription) {
      sinopseDiv.innerHTML = cleanedDescription;
    }
  }, [cleanedDescription, inAnimeInfo]);

  return (
    <>
      <div
        className={`bg-fourthAndAHalf rounded-xl p-5 text-white
          ${inAnimeInfo ? 'w-full' : 'w-[calc(100%-40px)]'}
          ${(inAnimeInfo && animeData.bannerImage) || (!inAnimeInfo && !animeData.bannerImage) ? 'block lg:hidden' : 'hidden lg:block'}
        `}
      >
        <h1 className="text-xl font-bold pb-3"> Sinopse </h1>
        <div id={inAnimeInfo ? 'sinopseAI' : 'sinopsePG'} className="text-lg text-white"></div>
      </div>
    </>
  );
}
