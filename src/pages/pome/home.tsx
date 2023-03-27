import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const moc: any = [
    {
      title: "aaaaaaa",
      image: "",
      description: ""
    },
    {
      title: "aaaaaaa",
      image: "",
      description: ""
    },
    {
      title: "aaaaaaa",
      image: "",
      description: ""
    },
    {
      title: "aaaaaaa",
      image: "",
      description: ""
    },
    {
      title: "aaaaaaa",
      image: "",
      description: ""
    },
    {
      title: "aaaaaaa",
      image: "",
      description: ""
    },
    {
      title: "aaaaaaa",
      image: "",
      description: ""
    },
    {
      title: "aaaaaaa",
      image: "",
      description: ""
    },
    {
      title: "aaaaaaa",
      image: "",
      description: ""
    },
    {
      title: "bbbbbb",
      image: "",
      description: ""
    },
    {
      title: "bbbbbb",
      image: "",
      description: ""
    },
    {
      title: "bbbbbb",
      image: "",
      description: ""
    },
    {
      title: "bbbbbb",
      image: "",
      description: ""
    },
    {
      title: "bbbbbb",
      image: "",
      description: ""
    },
    {
      title: "bbbbbb",
      image: "",
      description: ""
    },
    {
      title: "bbbbbb",
      image: "",
      description: ""
    },
    {
      title: "bbbbbb",
      image: "",
      description: ""
    },
    {
      title: "bbbbbb",
      image: "",
      description: ""
    },
    {
      title: "bbbbbb",
      image: "",
      description: ""
    },
  ]
  

  return (
    <div className="flex m-7 gap-5 h-screen mt-20">
      <div className="flex flex-col w-3/5 h-[100%] rounded-xl">
        <div className="bg-sixth h-full rounded-xl p-5">
          <div className="h-[8%]">
            <input className="w-full h-full rounded-xl bg-fifth caret-white text-white outline-none px-4" />
          </div>
          <h1 onClick={() => router.push("/pome/releases")} className="font-bold py-2 hover:cursor-pointer hover:text-third w-[6.5rem]"> New Releases </h1>
          <div className="h-[85%] w-full flex flex-wrap gap-5 overflow-auto"> 
            {moc.map((e: any, i: number) => (
              <div key={i} className="w-[47%] h-32 bg-fifth rounded-xl p-2"> 
                <h1> {e.title} </h1>
                <h1> {e.title} </h1>
                <h1> {e.title} </h1>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-sixth h-full w-2/5 rounded-xl px-8 py-5">
        <h1 className="font-bold pb-3"> Airing </h1>
        <div className="h-[94%] w-full flex flex-wrap gap-4 overflow-auto">
          {moc.map((e: any, i: number) => (
            <div key={i} className="w-[6rem] h-28 bg-fifth rounded-xl p-2"> 
             
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
