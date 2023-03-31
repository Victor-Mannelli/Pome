import Filter from "@/components/models/filter";
import { Stars } from "@/components/stars";
import { animeApi } from "@/utils/axios";
import { GraphqlRequestFunction } from "@/utils/axios";
import { AnimeInfoData } from "@/utils/Interfaces";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const moc: any = [
    {
      title: "bbbbbb",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM1cDnT1Q5ZrkfLfxiSgFvC2ZsjpngynJGvg&usqp=CAU",
      description: ""
    },
    {
      title: "bbbbbb",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM1cDnT1Q5ZrkfLfxiSgFvC2ZsjpngynJGvg&usqp=CAU",
      description: ""
    },
    {
      title: "bbbbbb",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM1cDnT1Q5ZrkfLfxiSgFvC2ZsjpngynJGvg&usqp=CAU",
      description: ""
    },
    {
      title: "bbbbbb",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM1cDnT1Q5ZrkfLfxiSgFvC2ZsjpngynJGvg&usqp=CAU",
      description: ""
    },
    {
      title: "bbbbbb",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM1cDnT1Q5ZrkfLfxiSgFvC2ZsjpngynJGvg&usqp=CAU",
      description: ""
    },
    {
      title: "bbbbbb",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM1cDnT1Q5ZrkfLfxiSgFvC2ZsjpngynJGvg&usqp=CAU",
      description: ""
    },
    {
      title: "bbbbbb",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM1cDnT1Q5ZrkfLfxiSgFvC2ZsjpngynJGvg&usqp=CAU",
      description: ""
    },
    {
      title: "bbbbbb",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM1cDnT1Q5ZrkfLfxiSgFvC2ZsjpngynJGvg&usqp=CAU",
      description: ""
    },
    {
      title: "bbbbbb",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM1cDnT1Q5ZrkfLfxiSgFvC2ZsjpngynJGvg&usqp=CAU",
      description: ""
    },
    {
      title: "bbbbbb",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM1cDnT1Q5ZrkfLfxiSgFvC2ZsjpngynJGvg&usqp=CAU",
      description: ""
    },
  ]

  const [page, setPage] = useState<number>(0);
  const [animeInfo, setAnimeInfo] = useState<AnimeInfoData>();

  useEffect(() => {
    GraphqlRequestFunction({})

    animeApi
      .get(`/anime?limit=24&status=airing&page=${page}`)
      .then(({ data }) => setAnimeInfo(data))
  }, [page])

  console.log(animeInfo?.data);

  return (
    <>
      {
        !animeInfo ? null : (
          <div className="flex m-7 gap-5">
            <div className="h-full flex flex-col w-[73%] rounded-xl p-5">
              <div className="h-[8%]">
                <Filter onChange={(e) => console.log(e.target.value)}/>
              </div>
              <h1 className="py-4 text-center"
                onClick={() => router.push("/pome/releases")}
              > Airing </h1>
              <div className="w-full flex flex-wrap gap-5 overflow-auto">
                {animeInfo.data.map((e: any) => (
                  <div 
                    className="xl:w-[48.9%] w-full h-80 bg-third rounded-xl p-4 flex cursor-pointer"
                    onClick={() => router.push(`/pome/anime/${e.mal_id}`)}
                    key={e.mal_id} 
                  >
                    <img
                      className="h-full w-40 rounded-xl"
                      src={e.images.jpg.image_url}
                      alt="anime_image"
                    />
                    <div className="pl-5 h-[90%]">
                      <h1 className="cursor-pointer"> {e.title} </h1>
                      <Stars score={e.score} />
                      <h3 className="cursor-pointer pb-3"> {e.year} </h3>
                      <h3 className="cursor-pointer h-2/3 overflow-auto"> {e.synopsis} </h3>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                {/* page handler */}
              </div>
            </div>
            <div className="bg-third w-[27%] h-fit rounded-xl px-8 pb-10">
              <h1 className="font-bold py-5"> You are following </h1>
              <div className="w-full flex flex-wrap gap-4 overflow-auto">
                {moc.map((e: any) => (
                  <div 
                    className="w-32 h-40 bg-fifth rounded-xl p-2 bg-cover"
                    style={{backgroundImage: `url(${e.image})`}}
                    key={e.name} 
                  >

                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}
