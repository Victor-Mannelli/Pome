import { AnimeInfo } from "@/utils/Interfaces";

export default function GenresList({ data } : { data: AnimeInfo }) {
  return (
    <div className="flex flex-col h-full ml-2 pr-2 gap-[0.35rem] overflow-auto">
      {data.genres.map((el: any) => (
        <li key={el.mal_id} className="text-eigth text-xl"> {el.name} </li>
      ))}
    </div>
  )
}
