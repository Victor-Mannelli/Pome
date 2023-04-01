import Button from "@/components/models/button";
import Filter from "@/components/models/filter";
import { Stars } from "@/components/stars";
import { GraphqlRequestFunction } from "@/utils/axios";
import { AnimeData } from "@/utils/Interfaces";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home({ data }: { data: AnimeData }) {
  const router = useRouter();
  console.log(data);

  return (
    <div className="flex m-7 gap-5">
      <div className="h-full flex flex-col w-[73%] rounded-xl p-5">
        <div className="h-[8%]">
          <Filter onChange={(e) => console.log(e.target.value)} />
        </div>
        <h1 className="py-4 text-center"
          onClick={() => router.push("/pome/releases")}
        > Airing </h1>
        <div className="w-full flex flex-wrap gap-5 overflow-auto">
          {data.media.map((e: any) => (
            <div
              className="xl:w-[48.9%] w-full h-80 bg-third rounded-xl p-4 flex cursor-pointer"
              onClick={() => router.push(`/pome/anime/${e.mal_id}`)}
              key={e.id}
            >
              <img
                className="h-full w-40 rounded-xl"
                src={e.coverImage.extraLarge}
                alt="anime_image"
              />
              <div className="pl-5 h-[90%]">
                <h1 className="cursor-pointer"> {e.title.romaji} </h1>
                <Stars score={e.averageScore} />
                <h3 className="cursor-pointer pb-3"> {e.startDate.year} </h3>
                <h3 className="cursor-pointer h-2/3 overflow-auto"> {e.description} </h3>
              </div>
            </div>
          ))}
          <div className="flex justify-center items-center w-full">
            {data.pageInfo.currentPage > 1 
              ? <Button 
                  className="bg-third"
                  onClick={() => router.push(`/pome/home/${data.pageInfo.currentPage - 1}`)} 
                  text="Back" 
                /> 
              : <Button 
                  className="bg-third"
                  onClick={() => console.log()} 
                  text="Back" 
                /> 
            }
            <h3 className="font-bold px-5"> { data.pageInfo.currentPage } </h3>
            {data.pageInfo.hasNextPage 
              ? <Button 
                  className="bg-third"
                  onClick={() => router.push(`/pome/home/${data.pageInfo.currentPage + 1}`)} 
                  text="Next" 
                /> 
              : null 
            }
          </div>
        </div>
      </div>
      <div className="bg-third w-[27%] h-fit rounded-xl px-8 pb-10">
        <h1 className="font-bold py-5"> You are following </h1>
        <div className="w-full flex flex-wrap gap-4 overflow-auto">
          {/* {moc.map((e: any) => (
                  <div 
                    className="w-32 h-40 bg-fifth rounded-xl p-2 bg-cover"
                    style={{backgroundImage: `url(${e.image})`}}
                    key={e.name} 
                  >
                  </div>
                ))} */}
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const data = await GraphqlRequestFunction({ page: Number(context.query.id) })

  if (!data) return {
    redirect: { destination: "/", permanent: false },
  };
  return {
    props: {
      data,
    },
  };
}
