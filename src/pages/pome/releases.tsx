import GenresList from "@/components/genres";
import { Stars } from "@/components/stars";
import { animeApi } from "@/utils/axios";
import { AnimeInfo, AnimeInfoData } from "@/utils/Interfaces";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";

export default function Releases() {
  const router = useRouter();
  const [page, setPage] = useState<number>(0);
  const [animeInfo, setAnimeInfo] = useState<AnimeInfoData>();

  useEffect(() => {
    // https://api.jikan.moe/v4/anime?order_by=start_date&limit=24
    animeApi
      .get(`/anime?limit=24&status=upcoming&page=${page}`)
      .then(({ data }) => setAnimeInfo(data))
  }, [page])

  console.log(animeInfo?.data)

  return (
    <>
      {
        !animeInfo ? null : (
          <div className="flex flex-col  rounded-xl m-5">
            {/* <div className="h-8">
                  <input className="w-full h-full rounded-xl bg-sixth caret-white text-white outline-none px-4"/>
                </div> */}
            <h1 className="font-bold py-4 cursor-default w-[10rem] text-2xl"> New Releases </h1>
            <div className="w-full flex flex-wrap gap-5 overflow-auto">
              {animeInfo.data.map((e: AnimeInfo, i: number) => (
                <div
                  key={i}
                  className="xl:w-[48.5%] w-full h-56 bg-third rounded-xl p-2 cursor-pointer flex"
                  onClick={() => router.push(`/pome/anime/${e.mal_id}`)}
                >
                  <img
                    src={e.images.jpg.image_url}
                    alt={e.title}
                    className="rounded-md w-40 mr-3"
                  />
                  <div className="flex flex-col h-full w-[88%]">
                    <h1 className="font-bold text-2xl mb-3 cursor-pointer"> {e.title} </h1>
                    <div className="flex justify-between h-[68%] w-full pr-10">
                      <div className="lg:w-3/5">
                        {/* <Stars score={e.score} /> */}
                        <h3 className="overflow-auto h-full cursor-pointer"> {e.synopsis} </h3>
                      </div>
                      <GenresList data={e} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      }
    </>
  )
}
