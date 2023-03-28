import GenresList from "@/components/genres";
import { Stars } from "@/components/stars";
import { animeApi } from "@/utils/axios";
import { AnimeInfo, AnimeInfoData } from "@/utils/Interfaces";
import { NextPageContext } from "next";
// import { useRouter } from "next/router";
// import { BiUpArrow } from "react-icons/bi";

export default function AnimePage({ data }: {
  data: {
    data: AnimeInfo
  }
}) {
  return (
    <>
      {
        !data ? null : (
          <div className="flex flex-col items-center gap-5 pb-7">
            <img
              alt="banner"
              src="/assets/dark_bg.jpg"
              className="w-full h-[22rem]"
            />
            <div className="h-1/2 w-full rounded-xl flex gap-2 px-5">
              <div className="relative w-[19rem] h-64 flex flex-col justify-end items-center">
                <img
                  className="absolute top-[-10rem] rounded-xl w-[80%] h-[23rem]"
                  src={data.data.images.jpg.large_image_url} 
                  alt="pfp"
                />
                <div className="bg-seventh w-[80%] h-9 rounded-md cursor-pointer">

                </div>
              </div>
              <div className="w-[75%] flex flex-col gap-3">
                <div className="w-full pl-2">
                  <h1 className="font-bold text-3xl"> {data.data.title} </h1>
                </div>
                <div className="w-full">
                  <div className="bg-seventh h-9 rounded-xl flex items-center px-3 mb-2">
                    <Stars score={data.data.score}/>
                  </div>
                  <GenresList data={data.data} />
                </div>
              </div>
            </div>
            <div className="bg-sixth rounded-xl w-[98%] p-5">
              <h1 className="text-3xl font-bold pb-3"> Sinopse </h1>
              <h1 className="text-2xl"> {data.data.synopsis} </h1>
            </div>
            <div className="bg-sixth rounded-xl w-[98%] p-5">
              <h1 className="text-3xl font-bold pb-3"> Trailer </h1>
              <iframe
                src={data.data.trailer.embed_url}
              />
            </div>
          </div>
        )
      }
    </>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const { data } = await animeApi.get(`/anime/${context.query.id}`)

  if (!data) return {
    redirect: { destination: "/pome/home", permanent: false },
  };

  return {
    props: {
      data,
    },
  };
}
