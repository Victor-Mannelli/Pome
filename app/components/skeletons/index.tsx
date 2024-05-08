import { FaRegHeart } from "@/utils/libs"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"

export function FollowedAnimeSkeleton() {
  return (
    <div className="flex flex-col bg-third lg:min-w-[23rem] sm:max-h-[38.5rem] h-fit sm:rounded-md">
      <h1 className="font-bold text-center p-5"> You are following </h1>
      <div className="flex flex-wrap justify-center gap-5 mb-7 px-5">
        {Array.from({ length: 6 }).map((_, i) =>
          <div
            className="flex flex-col justify-end w-32 h-40 bg-fifth animate-pulse rounded-md bg-cover cursor-pointer"
            key={i}
          ></div>
        )}
      </div>
    </div>
  )
}

export function HomePageAnimesSkeleton({ page }: { page: number }) {
  return (
    <div className="flex flex-col items-center gap-7 max-w-[1446px] xl:min-w-[50rem]">
      <h1 className="text-center hover:cursor-pointer"> New Animes! </h1>
      <div className="flex flex-wrap justify-center gap-5 px-5">
        {Array.from({ length: 28 }).map((_, i) =>
          <div
            className="w-40 h-64 rounded-md cursor-pointer hover:brightness-90 animate-pulse bg-fifth"
            key={i}
          ></div>
        )}
      </div>
      <PageHandlerSkeleton page={page} />
    </div>
  )
}

export function PageHandlerSkeleton({ page }: { page?: number }) {
  return (
    <div className="flex justify-center items-center w-full">
      <button
        className="p-5 text-xl font-bold text-eigth rounded-xl hover:bg-second animate-pulse bg-third"
      > Back
      </button>
      <h3 className="font-bold px-5 animate-pulse"> {page ? page : "-"} </h3>
      <button
        className="p-5 text-xl font-bold text-eigth rounded-xl hover:bg-second animate-pulse bg-third"
      > Next
      </button>
    </div>
  )
}

//! using: lg: '1080px',
export function AnimePageSkeleton() {
  return (
    <SkeletonTheme baseColor="#2c2e2f" highlightColor="#3a3d3e">
      <div className="flex flex-col items-center w-full mb-5">
        <div id="banner" className="w-full">
          <Skeleton className="h-56 sm:h-80" />
        </div>
        <div id="animeInfo" className="relative flex justify-start w-full min-h-72 h-fit">
          <FaRegHeart className='absolute right-1 top-0 my-3 mr-2 text-2xl text-second' />
          <div id="coverImage" className="absolute -top-5 h-64 sm:flex hidden flex-col justify-end items-center w-[19rem]">
            <Skeleton key="coverImage" className="w-60 h-[23rem] rounded-lg shadow-fifth shadow" />
            <Skeleton key="coverImageButton" className="w-60 h-9 rounded-lg shadow-fifth shadow" />
          </div>
          <div id="animeDescription" className="flex flex-col w-full p-5 sm:pl-0">
            <div id="title" className="w-full sm:pl-[19rem] pr-7">
              <Skeleton className="h-6" />
            </div>
            <div className="flex flex-col lg:flex-row justify-between pt-3 gap-3 ">
              <div className="flex flex-col min-h-48 max-w-[32.75rem] sm:ml-[19rem]">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={"animeStats" + i} className="w-72 h-5 my-1" />
                ))}
                <div className="flex flex-wrap pt-2 gap-1">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={"animeGenre" + i} className="w-32 h-9 my-1 rounded-lg" />
                  ))}
                </div>
              </div>
              <div id="tags" className="flex flex-wrap gap-2 lg:w-2/5 sm:pl-5 lg:pl-0 sm:min-w-[22.5rem] overflow-auto">
                {Array.from({ length: 12 }).map((_, i) => (
                  <Skeleton key={"animeTags" + i} className="w-[10.5rem] sm:w-44 h-5" />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div id="description" className="w-[calc(100%-40px)]">
          <Skeleton className="h-48" />
        </div>
        <div id="trailer" className="w-[calc(100%-40px)] mt-5">
          <Skeleton className="h-96" />
        </div>
      </div>
    </SkeletonTheme>
  )
}

export function ProfileSkeleton() {
  return (
    <SkeletonTheme baseColor="#2c2e2f" highlightColor="#3a3d3e">
      <div className="flex flex-col h-full">
        <div className='relative w-full h-60'>
          <Skeleton key="banner" className="w-full h-full" />
          <Skeleton key="pfp" className="absolute bottom-0 left-32 h-40 w-32 shadow-fifth shadow" />
          <Skeleton key="userName" className="absolute bottom-3 left-72 h-6 w-32 shadow-fifth shadow" />
        </div>
        <div className="flex lg:flex-row flex-col">
          <div className="flex lg:flex-col flex-row flex-wrap lg:flex-nowrap lg:w-1/5 bg-second p-10 gap-5">
            {Array.from({ length: 7 }).map((_, i) =>
              <Skeleton key={"filter" + i} className="shadow-fifth shadow w-48 lg:w-full h-10" />
            )}
          </div>
          <div className="flex flex-col items-center w-full lg:w-4/5 h-full pb-7">
            <div className="flex justify-center gap-3 p-5">
              {Array.from({ length: 5 }).map((_, i) =>
                <Skeleton key={"userAnimeStatus" + i} className="w-32 h-12 rounded-xl" />
              )}
            </div>
            <div className="flex flex-col w-[calc(100%-2.5rem)] bg-third rounded-2xl p-5 gap-5">
              {Array.from({ length: 20 }).map((_, i) =>
                <Skeleton key={"userAnimeList" + i} className="w-full h-8" />
              )}
            </div>
          </div>
        </div>
      </div>

    </SkeletonTheme >
  )
}
