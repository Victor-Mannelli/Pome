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

export function HomePageAnimesSkeleton() {
  const emptyArray = Array.from({ length: 28 });
  return (
    <>
      {emptyArray.map((_, i) =>
        <div
          className="xl:w-40 w-full h-64 rounded-md cursor-pointer hover:brightness-90 animate-pulse bg-fifth"
          key={i}
        ></div>
      )}
    </>
  )
}
