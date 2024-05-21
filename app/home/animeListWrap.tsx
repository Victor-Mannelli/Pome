import { useObserveElementWidth } from "@/utils/hooks";
import { Link, PageHandler } from "@/components/tools";
import { calculatePadding } from "@/utils/functions";
import { Dispatch, SetStateAction } from "react";
import { AnimeCatalogData } from "@/utils/types";

export function AnimeListWrap({ animeData, setPage, page }: {
  setPage: Dispatch<SetStateAction<number>>;
  animeData: AnimeCatalogData;
  page: number;
}) {
  const { width, ref } = useObserveElementWidth();

  return (
    <div className="flex flex-col items-center max-w-[1446px] h-full ">
      <h1
        className="hover:cursor-pointer mt-4"
        onClick={() => { if (page !== 0) setPage(0) }}
      >
        New Animes!
      </h1>
      {animeData.media.length === 0
        ? (
          <h1> Nenhum anime encontrado </h1>
        ) : (
          <div
            style={{ paddingLeft: calculatePadding({ parentWidth: width, childWidth: 155 }) }}
            className="wrapper-container"
            ref={ref}
          >
            {animeData.media.map((anime: any) => (
              <Link href={`/anime/${anime.id}`} key={anime.id}>
                <div
                  className="flex flex-col justify-end w-[9.7rem] h-64 rounded-md cursor-pointer hover:brightness-90 bg-cover"
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
  )
}
