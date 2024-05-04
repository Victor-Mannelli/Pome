import { FaRegHeart } from "@/utils/libs"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"

export function FollowedAnimeSkeleton() {
  return (
    <div className="flex flex-col bg-third lg:min-w-96 sm:max-h-[38.5rem] h-fit sm:rounded-md overflow-y-auto">
      <h1 className="font-bold text-center p-5"> You are following </h1>
      <div className="flex flex-wrap justify-center gap-5 mb-7 px-5">
        {Array.from({ length: 6 }).map((_, i) =>
          <div
            className="flex flex-col justify-end w-32 h-40 bg-fifth animate-pulse rounded-md bg-cover cursor-pointer hover:shadow-black hover:shadow-inner"
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

export function AnimePageSkeleton() {
  return (
    <SkeletonTheme baseColor="#2c2e2f" highlightColor="#3a3d3e">
      <div className="flex flex-col items-center w-full mb-5">
        <div className="w-full">
          <Skeleton key="banner" className="h-80" />
        </div>
        <div className="flex flex-col">
          <div className="relative flex justify-start w-full h-72">
            <FaRegHeart className='absolute right-1 top-0 m-3 text-2xl text-white' />
            <div className="absolute -top-5 h-64 w-[19rem] flex flex-col justify-end items-center">
              <Skeleton key="coverImage" className="rounded-xl w-60 h-[23rem] shadow-fifth shadow" />
              <Skeleton key="coverImageButton" className="w-60 h-9 shadow-fifth shadow" />
            </div>
            <div className="flex flex-col w-full  pl-[19rem] py-5 pr-12">
              <Skeleton className="w-full h-6" />
              <div className="flex pt-3">
                <div className="w-3/5">
                  <Skeleton className="w-72 h-5 my-1" />
                  <Skeleton className="w-56 h-5 my-1" />
                  <Skeleton className="w-72 h-5 my-1" />
                  <Skeleton className="w-56 h-5 my-1" />
                  <div className="flex flex-wrap pt-2 gap-1">
                    <Skeleton className="w-32 h-9 my-1 rounded-lg" />
                    <Skeleton className="w-32 h-9 my-1 rounded-lg" />
                    <Skeleton className="w-32 h-9 my-1 rounded-lg" />
                    <Skeleton className="w-32 h-9 my-1 rounded-lg" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 w-2/5 overflow-auto">
                  <Skeleton className="w-44 h-5" />
                  <Skeleton className="w-44 h-5" />
                  <Skeleton className="w-44 h-5" />
                  <Skeleton className="w-44 h-5" />
                  <Skeleton className="w-44 h-5" />
                  <Skeleton className="w-44 h-5" />
                  <Skeleton className="w-44 h-5" />
                  <Skeleton className="w-44 h-5" />
                  <Skeleton className="w-44 h-5" />
                  <Skeleton className="w-44 h-5" />
                  <Skeleton className="w-44 h-5" />
                  <Skeleton className="w-44 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[calc(100%-40px)]">
          <Skeleton className="h-48" />
        </div>
        <div className="w-[calc(100%-40px)] mt-5">
          <Skeleton className="h-96" />
        </div>
      </div>
    </SkeletonTheme>
  )
}
