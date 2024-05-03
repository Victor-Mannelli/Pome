import { useObserveElementWidth } from "@/utils/hooks";
import { calculatePadding } from "@/utils/functions";
import { Dispatch, SetStateAction } from "react";
import { PageHandler } from "@/components";
import { AnimeData } from "@/utils";

export function AnimeListWrap({ animeData, setPage, router, page }: {
  setPage: Dispatch<SetStateAction<number>>;
  animeData: AnimeData;
  page: number;
  router: any;
}) {
  const { width, ref } = useObserveElementWidth();

  return (
    <div className="flex flex-col max-w-[1446px] h-full gap-5">
      <h1
        className="text-center hover:cursor-pointer"
        onClick={() => setPage(0)}
      >
        New Animes!
      </h1>
      {animeData.media.length === 0
        ? (
          <h1> Nenhum anime encontrado </h1>
        ) : (
          <div
            style={{ paddingLeft: calculatePadding({ parentWidth: width, childWidth: 160 }) }}
            className="wrapper-container"
            ref={ref}
          >
            {animeData.media.map((anime: any) => (
              <div
                className="flex flex-col justify-end md:w-40 w-full h-64 rounded-md cursor-pointer hover:brightness-90 bg-cover"
                onClick={() => router.push(`/anime/${anime.id}`)}
                style={{ backgroundImage: `url(${anime.coverImage.extraLarge})` }}
                key={anime.id}
              >
                <h1 className="text-sm cursor-pointer bg-black bg-opacity-60 rounded-b-md p-2"> {anime.title.romaji} </h1>
              </div>
            ))}
          </div>
        )}
      <PageHandler
        currentPage={page}
        setPage={setPage}
        hasNextPage={animeData.pageInfo.hasNextPage}
      />
    </div>
  )
}
