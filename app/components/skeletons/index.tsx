export function FollowedAnimeSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) =>
        <div
          className="flex flex-col justify-end w-32 h-40 bg-fifth animate-pulse rounded-md bg-cover cursor-pointer hover:shadow-black hover:shadow-inner"
          key={i}
        ></div>
      )}
    </>
  )
}

export function HomePageAnimesSkeleton() {
  return (
    <>
      {Array.from({ length: 28 }).map((_, i) =>
        <div
          className="xl:w-40 w-full h-64 rounded-md cursor-pointer hover:brightness-90 animate-pulse bg-fifth"
          key={i}
        ></div>
      )}
    </>
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