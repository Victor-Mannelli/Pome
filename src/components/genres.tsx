import { AnimeInfo } from "@/utils/Interfaces";

export default function GenresList(data : AnimeInfo) {
  return (
    <div className="flex flex-col h-36 ml-2 pr-2 gap-[0.35rem] overflow-auto">
      {data.data.genres.map((el: any) => (
        <li key={el.mal_id} className="text-eigth text-2xl"> {el.name} </li>
      ))}
    </div>
  )
}
