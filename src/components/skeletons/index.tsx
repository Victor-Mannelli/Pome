export function FollowedAnimeSkeleton() {
  const emptyArray = Array.from({ length: 6 });
  return (
    <>
      {emptyArray.map((_, i) =>
        <div
          className="flex flex-col justify-end w-32 h-40 bg-fifth animate-pulse rounded-md bg-cover cursor-pointer hover:shadow-black hover:shadow-inner"
          key={i}
        ></div>
      )}
    </>
  )
}

export function HomePageAnimesSkeleton(animeList: any) {
  const emptyArray = Array.from({ length: 28 });
  return (
    <div className={`flex flex-wrap ${animeList && animeList.length <= 7 ? 'gap-x-2' : 'justify-between'} w-fit gap-y-5`}>
      {emptyArray.map((_, i) =>
        <div
          className="xl:w-40 w-full h-64 rounded-md cursor-pointer hover:brightness-90 animate-pulse bg-fifth"
          key={i}
        ></div>
      )}
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
      <h3 className="font-bold px-5"> 1 </h3>
      <button
        className="p-5 text-xl font-bold text-eigth rounded-xl hover:bg-second animate-pulse bg-third"
      > Next
      </button>
    </div>
  )
}