export function FollowedAnimeSkeleton() {
  return (
    <div className="flex flex-col bg-third lg:min-w-96 ms:max-h-[38.5rem] h-fit sm:rounded-md overflow-y-auto">
      <h1 className="font-bold text-center p-5"> You are following </h1>
      <div className="flex flex-wrap justify-center gap-5 mb-7 px-5">
        {Array.from({ length: 7 }).map((_, i) =>
          <div
            className="flex flex-col justify-end w-32 h-40 bg-fifth animate-pulse rounded-md bg-cover cursor-pointer hover:shadow-black hover:shadow-inner"
            key={i}
          ></div>
        )}
      </div>
    </div>
  )
}

export function HomePageAnimesSkeleton() {
  return (
    <div className="flex flex-col items-center gap-7  max-w-[1446px] lg:min-w-[50rem]">
      <h1 className="text-center hover:cursor-pointer"> New Animes! </h1>
      <div className="flex flex-wrap justify-center gap-5 px-5">
        {Array.from({ length: 24 }).map((_, i) =>
          <div
            className="w-40 h-64 rounded-md cursor-pointer hover:brightness-90 animate-pulse bg-fifth"
            key={i}
          ></div>
        )}
      </div>
      <PageHandlerSkeleton />
    </div>
  )
}

export function PageHandlerSkeleton() {
  return (
    <div className="flex justify-center items-center w-full">
      <button
        className="p-5 text-xl font-bold text-eigth rounded-xl hover:bg-second animate-pulse bg-third"
      > Back
      </button>
      <h3 className="font-bold px-5 animate-pulse"> - </h3>
      <button
        className="p-5 text-xl font-bold text-eigth rounded-xl hover:bg-second animate-pulse bg-third"
      > Next
      </button>
    </div>
  )
}