export function FollowedAnimeSkeleton() {
  const emptyArray = Array.from({ length: 6 });
  return (
    <>
      {
        emptyArray.map(() => {
          return (
            <div className="flex flex-col justify-end w-32 h-40 bg-fifth animate-pulse rounded-md bg-cover cursor-pointer hover:shadow-black hover:shadow-inner">
            </div>
          )
        })
      }
    </>
  )
}