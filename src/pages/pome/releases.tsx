import GenresList from "@/components/genres";
import { Stars } from "@/components/stars";
import { animeApi } from "@/utils/axios";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";

export default function Releases() {
  const router = useRouter();
  const [page, setPage] = useState<number>(0);
  const [animeInfo, setAnimeInfo] = useState<any>();

  useEffect(() => {
    animeApi
      .get(`/anime?page=${page}`)
      .then((e) => setAnimeInfo(e.data))
  }, [page])
  // console.log(animeInfo?.data[0].genres)
  // console.log(animeInfo)
  console.log(animeInfo?.data)

  return (
    <>
      {
        !animeInfo ? null : (
          <div className="flex flex-col rounded-xl m-5 pt-12">
            {/* <div className="h-8">
                  <input className="w-full h-full rounded-xl bg-sixth caret-white text-white outline-none px-4"/>
                </div> */}
            <h1 
              // onClick={() => router.push("/pome/releases")} 
              // className="font-bold py-2 hover:cursor-pointer hover:text-seventh w-[8rem] text-xl"
              className="font-bold py-4 cursor-default w-[10rem] text-2xl"
            > New Releases </h1>
            <div className="h-[85%] w-full flex flex-wrap gap-5 overflow-auto">
              {animeInfo.data.map((e: any, i: number) => (
                <div
                  key={i}
                  className="xl:w-[48.5%] w-full h-48 bg-sixth rounded-xl p-2 cursor-pointer flex"
                  onClick={() => router.push(`/pome/anime/${e.mal_id}`)}
                >
                  <img
                    src={e.images.jpg.image_url}
                    alt={e.title}
                    className="rounded-md w-32 mr-3"
                  />
                  <div className="flex flex-col w-[88%]">
                    <h1 className="font-bold text-2xl"> {e.title} </h1>
                    <div className="flex justify-between w-full">
                      <div className="lg:w-3/5">
                        <Stars score={e.score} />
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
