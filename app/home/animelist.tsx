'use client';

import { AnimeCatalogData, SingleAnimeData } from '@/utils/types';
import { Link, PageHandler } from '@/components/tools';
import { Dispatch, SetStateAction } from 'react';
import React from 'react';

export function Animelist({ animeData, setPage, page }: { setPage: Dispatch<SetStateAction<number>>; animeData: AnimeCatalogData; page: number }) {
  return (
    <>
      {animeData.media.length === 0 ? (
        <div className="py-7 w-[20.2rem]">
          <h1 className="text-lg"> Nenhum anime encontrado </h1>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-4 py-5 w-[20.2rem] sm:w-[41.4rem] md:w-full">
            {animeData.media.map((anime: SingleAnimeData) => (
              <Link href={`/anime/${anime.id}`} key={anime.id}>
                <div
                  className="flex flex-col justify-end w-[9.6rem] h-64 rounded-md cursor-pointer hover:brightness-90 bg-cover"
                  style={{ backgroundImage: `url(${anime.coverImage.extraLarge})` }}
                >
                  <h1 className="text-sm cursor-pointer bg-black bg-opacity-60 rounded-b-md p-2"> {anime.title.romaji} </h1>
                </div>
              </Link>
            ))}
          </div>
          <PageHandler currentPage={page} setPage={setPage} hasNextPage={animeData.pageInfo.hasNextPage} />
        </>
      )}
    </>
  );
}
