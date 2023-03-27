import { BiUpArrow } from "react-icons/bi";

export default function AnimePage() {
  return (
    <div className="flex flex-col m-5 gap-5 h-[calc(100vh-7.5rem)]">
      <div className="bg-sixth h-1/2 w-full rounded-xl flex gap-2 p-5">
        <div className="w-[25%] flex flex-col justify-between items-center">
          <img alt="pfp" src="/assets/dark_bg.jpg" className="rounded-xl h-[85%] w-full"/>
          <div className="bg-seventh w-full h-7 rounded-md relative">
            <BiUpArrow className="absolute right-2 bottom-[0.4rem] text-black"/>
          </div>
        </div>
        <div className="w-[75%] flex flex-col gap-3">
          <div className="w-full bg-sixth pl-2">
            <h1> Title </h1>
          </div>
          <div className="w-full">
            <div className="bg-seventh h-9 rounded-xl flex items-center px-3 mb-2">
              <h1> Stars </h1>
            </div>
            <div className="px-3">
              <h1> tag 1 </h1>
              <h1> tag 2 </h1>
              <h1> tag 3 </h1>
              <h1> tag 4 </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-sixth h-1/2 rounded-xl w-full p-5">
        <h1> Description </h1>
      </div>
    </div>
  )
}
