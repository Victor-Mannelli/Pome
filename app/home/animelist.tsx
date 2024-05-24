"use client"

import { AnimeCatalogData } from "@/utils/types";
import { Link } from "@/components/tools";

export function Animelist({ animeData }: { animeData: AnimeCatalogData }) {
  return (
    <>
      {animeData.media.length === 0
        ? (
          <h1> Nenhum anime encontrado </h1>
        ) : (
          <div className="flex flex-wrap gap-4 py-5">
            {animeData.media.map((anime: any) => (
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
        )}
    </>
  )
}
