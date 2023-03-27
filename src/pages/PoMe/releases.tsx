import { Stars } from "@/components/models/stars";
import { animeApi } from "@/utils/axios";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";

export default function Releases() {
  const router = useRouter();
  const [page, setPage] = useState<number>(0);
  const [animeInfo, setAnimeInfo] = useState<any>();

  const moc = [
    {
      name: "aaaaaaaaaa",
    },
    {
      name: "aaaaaaaaaa",
    },
    {
      name: "aaaaaaaaaa",
    },
    {
      name: "aaaaaaaaaa",
    },
    {
      name: "aaaaaaaaaa",
    },
    {
      name: "aaaaaaaaaa",
    },
    {
      name: "aaaaaaaaaa",
    },
    {
      name: "aaaaaaaaaa",
    },
    {
      name: "aaaaaaaaaa",
    },
    {
      name: "aaaaaaaaaa",
    },
    {
      name: "aaaaaaaaaa",
    },
  ]

  useEffect(() => {
    animeApi
      .get(`/anime?page=${page}`)
      .then((e) => setAnimeInfo(e.data))
  }, [page])
  console.log(animeInfo?.data)
  console.log(animeInfo)
  console.log(animeInfo.data[0].genres)
  if (!animeInfo) {
    return (
      <>
      </>
    )
  } else {
    return (
      <div className="flex flex-col rounded-xl m-5">
        {/* <div className="h-8">
          <input className="w-full h-full rounded-xl bg-sixth caret-white text-white outline-none px-4"/>
        </div> */}
        <h1 onClick={() => router.push("/PoMe/releases")} className="font-bold py-2 hover:cursor-pointer hover:text-third w-[6.5rem]"> New Releases </h1>
        <div className="h-[85%] w-full flex flex-wrap gap-5 overflow-auto">
          {animeInfo.data.map((e: any, i: number) => (
            <div key={i} className="lg:w-[48.5%] w-full h-48 bg-sixth rounded-xl p-2 cursor-pointer flex">
              <img
                src={e.images.jpg.image_url}
                alt={e.title}
                className="rounded-md w-32 mr-3"
              />
              <div className="flex flex-col w-[80%]">
                <h1 className="font-bold"> {e.title} </h1>
                <div className="flex w-full">
                  <div className="w-[75%] lg:w-3/5">
                    <Stars score={e.score.score} />
                  </div>
                  <div className="flex flex-col w-[25%] lg:w-2/5 h-36 ml-2 gap-[0.35rem] overflow-auto">
                    {e.genres.map((el: any) => (
                      <li key={el.mal_id} className="text-white"> {el.name} </li>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
