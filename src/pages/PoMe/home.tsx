
export default function Home() {

  const releases: any = [
    {
      title: "aa",
      image: "",
      description: ""
    }
  ]

  return (
    <div className="flex m-7 gap-2 h-[87.5vh]">
      <div className="flex flex-col w-1/2 h-full rounded-xl">
        <div>
          <input />
        </div>
        <div className="bg-fifth h-full rounded-xl p-7">
          <h1> Title </h1>
          {releases.map((e: any) => {
            <div> 
              <h1> {e.title} </h1>
            </div>
          })}
        </div>
      </div>

      <div className="bg-fifth h-full rounded-xl p-7 w-1/2">
          <h1 className="bg-first"> </h1>
          <h1 className="bg-second"> </h1>
          <h1 className="bg-third"> </h1>
          <h1 className="bg-fourth"> </h1>
          <h1 className="bg-fifth"> </h1>
          <h1 className="bg-sixth"> </h1>
          <h1 className="bg-seventh"> </h1>
      </div>
    </div>
  )
}
