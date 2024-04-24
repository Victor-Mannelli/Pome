export default function AnimePage() {
  return (
    <div className="flex flex-wrap gap-2 m-5  bg-fourth">
      {Array.from({ length: 5 }).map((_, i) =>
        <div
          className="w-40 h-20 bg-fifth"
          key={i}
        ></div>
      )}
    </div>
  )
}