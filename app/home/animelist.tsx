"use client"

import { AnimeCatalogData, FilterType, UsersAnimelist } from "@/utils/types";
import { ErrorFeedback, HomePageAnimesSkeleton } from "@/components";
import { Filter, Link, PageHandler } from "@/components/tools";
import { useEffect, useState } from "react";
import { getAnimes } from "./functions";

export function Animelist({ usersAnimeListFailed, usersAnimeList }: {
  usersAnimeList: UsersAnimelist[];
  usersAnimeListFailed: boolean;
}) {
  const [animeData, setAnimeData] = useState<AnimeCatalogData | null>(null);
  const [animeDataFailed, setAnimeDataFailed] = useState<boolean>(false);
  const [animeDataLoad, setAnimeDataLoad] = useState<boolean>(true);
  const [filter, setFilter] = useState<FilterType>({
    search: "",
    id_not_in: [],
    status: "RELEASING",
  })
  const [page, setPage] = useState<number>(1);
  console.log(usersAnimeList ? usersAnimeList.map((e) => Number(e.anime_id)) : [])

  useEffect(() => {
    getAnimes({
      setAnimeData,
      setFailed: setAnimeDataFailed,
      setLoading: setAnimeDataLoad,
      page,
      quantity: 30,
      filter
    });
  }, [page, filter]);
  console.log(filter, "filter")
  return (
    <>
      {animeDataFailed ? (
        <ErrorFeedback refreshFunction={() =>
          getAnimes({
            setAnimeData,
            setFailed: setAnimeDataFailed,
            setLoading: setAnimeDataLoad,
            page,
            quantity: 30
          })}
          setFailed={setAnimeDataFailed}
          loading={animeDataLoad}
        />
      ) : animeDataLoad ? (
        <HomePageAnimesSkeleton page={page} />
      ) : (
        <div className={`flex flex-col items-center h-full w-[20.2rem] ${usersAnimeListFailed
          ? "xl:w-[62.6rem] lg:w-[52rem] md:w-[41.4rem] sm:w-[30.8rem]" : "xl:w-[52rem] md:w-[41.4rem]"}
        `}>
          <Filter setFilter={setFilter} />
          <h1 className="hover:cursor-pointer pt-3" onClick={() => { if (page !== 0) setPage(0) }}>
            New Animes!
          </h1>
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
          <PageHandler
            currentPage={page}
            setPage={setPage}
            hasNextPage={animeData.pageInfo.hasNextPage}
          />
        </div>
      )}
    </>
  )
}
