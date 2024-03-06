export function HomePageAnimesSkeleton() {
  const emptyArray = Array.from({ length: 28 });
  return (
    <>
      {
        emptyArray.map(() => {
          return (
            <div
              className="xl:w-40 w-full h-64 rounded-md cursor-pointer hover:brightness-90 animate-pulse bg-fifth"
            >
            </div>
          )
        })
      }
    </>
  )
}