import { monthNames, SingleAnimeData } from "@/utils";
import { Stars } from "@/components";

export function AnimeContent({ data }: { data: SingleAnimeData }) {
  return (
    <div className="w-[75%] flex flex-col gap-3 ">
      <h1 className="font-bold text-2xl"> {data.title.romaji} </h1>
      <div className="w-full flex flex-col sm:flex-row pr-24 gap-10 overflow-auto">
        <div className='flex flex-col w-fit gap-3'>
          <div className='flex h-6'>
            <h3 className='pr-2 pt-[0.1rem]'> <span className='font-bold italic pr-1'> {data.status[0] + data.status.slice(1).toLocaleLowerCase()} </span> {data.averageScore ? 'with' : ''} </h3>
            {data.averageScore ? <Stars className='' score={data.averageScore} /> : null}
          </div>
          {data.status === 'RELEASING'
            ? (
              <div className='flex flex-col gap-1'>
                <h3> Current Episode: {data.nextAiringEpisode.episode - 1} </h3>
                <h3 className='text-h-signature'>
                  Next Episode in {Math.floor(data.nextAiringEpisode.timeUntilAiring / 86400)}d {Math.floor((data.nextAiringEpisode.timeUntilAiring % 86400) / 3600)}h {Math.floor((data.nextAiringEpisode.timeUntilAiring % 3600) / 60)}m
                </h3>
                <h3> Total Episodes: {data.episodes} </h3>
              </div>
            ) : data.status === 'NOT_YET_RELEASED'
              ? (
                <div className='flex flex-col gap-1 pt-2'>
                  <h3 className='text-h-signature'> Start Date: {data.startDate.day && data.startDate.day + ' of'} {monthNames[data.startDate.month - 1] + ', '}{data.startDate.year} </h3>
                  {data.episodes ? <h3> Total Episodes: {data.episodes} </h3> : null}
                </div>
              )
              : null}
          {!data.genres ? null :
            <div id='genres' className="flex flex-wrap h-full bg-red-500 gap-[0.35rem] overflow-auto">
              {data.genres.map((e: string, i: number) => (
                <h3 key={i} className="text-eigth text-md border h-fit p-2 rounded-xl"> {e} </h3>
              ))}
            </div>
          }
        </div>
        {!data.tags ? null :
          <div id='tags' className={`flex flex-col flex-wrap w-auto ${!data.bannerImage ? 'h-36' : 'h-56'} `}>
            {data.tags.map((e: any,) => (
              <li key={e.id} className="text-eigth text-lg pr-10"> {e.name} </li>
            ))}
          </div>
        }
      </div>
    </div>
  )
}
