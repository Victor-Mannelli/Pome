import { AnimeUserStatsInterface, FaHeart, FaRegHeart, monthNames, SingleAnimeData, token } from "@/utils";
import { Dispatch, SetStateAction } from "react";
import { Stars } from "@/components";

export function AnimeInfo({ data, favorite, setFavorite, toast, toggleShowAnimeSettings, fetchData }: {
  setFavorite: Dispatch<SetStateAction<boolean>>;
  toggleShowAnimeSettings: () => void;
  fetchData: AnimeUserStatsInterface;
  data: SingleAnimeData;
  favorite: boolean;
  toast: any;
}) {
  return (
    <div className="relative flex justify-start w-full min-h-72 h-fit">
      {favorite ?
        <FaHeart
          className='absolute right-1 top-0 my-3 mr-2 text-2xl text-red-500 hover:cursor-pointer'
          onClick={() => token ? setFavorite(!favorite) : toast.error('Log in first!')}
        /> :
        <FaRegHeart
          className='absolute right-1 top-0 my-3 mr-2 text-2xl text-white hover:cursor-pointer'
          onClick={() => token ? setFavorite(!favorite) : toast.error('Log in first!')}
        />
      }
      <div
        id="coverImageDisplay"
        className={`${data.bannerImage ? "absolute -top-5 h-64" : "m-5"}  md:flex hidden flex-col justify-end items-center gap-2 w-[19rem]`}
      >
        <img
          id="coverImage"
          alt="coverImage"
          className="w-60 h-[23rem] rounded-lg"
          src={data.coverImage.extraLarge}
        />
        <div
          key="coverImageButton"
          className="flex items-center justify-center w-60 h-9 rounded-md hover:bg-fifth bg-fourthAndAHalf"
          onClick={() => {
            // api.post('/animes/populate', { id: data.id });
            if (!token) return toast.error('Log in first!')
            toggleShowAnimeSettings();
          }}
        >
          <h3 className='hover:cursor-pointer text-h-signature font-bold text-lg'>
            {fetchData.status === '' ? 'Follow' : fetchData.status}
          </h3>
        </div>
      </div>
      <div id="animeInfo" className="flex flex-col w-full p-5 md:pl-0">
        <h1 id="title" className={`w-full pr-7 font-bold text-2xl ${data.bannerImage ? "md:pl-[19rem]" : ""} `}> {data.title.romaji} </h1>
        <div className="flex flex-col lg:flex-row justify-between pt-3 gap-3 ">
          <div className={`flex flex-col min-h-48 max-w-[32.75rem] ${data.bannerImage ? "md:ml-[19rem]" : ""}`}>
            <div className='flex w-72 h-6 my-1'>
              <h3 className='pr-2 pt-[0.1rem]'> <span className='font-bold italic pr-1'> {data.status[0] + data.status.slice(1).toLocaleLowerCase()} </span> {data.averageScore ? 'with' : ''} </h3>
              {data.averageScore ? <Stars className='' score={data.averageScore} /> : null}
            </div>
            {data.status === 'RELEASING'
              ? (
                <>
                  <h3 className='w-72 h-6 my-1'> Current Episode: {data.nextAiringEpisode.episode - 1} </h3>
                  <h3 className='w-72 h-6 my-1 text-h-signature'>
                    Next Episode in {Math.floor(data.nextAiringEpisode.timeUntilAiring / 86400)}d {Math.floor((data.nextAiringEpisode.timeUntilAiring % 86400) / 3600)}h {Math.floor((data.nextAiringEpisode.timeUntilAiring % 3600) / 60)}m
                  </h3>
                  <h3 className='w-72 h-6 my-1'> Total Episodes: {data.episodes} </h3>
                </>
              ) : data.status === 'NOT_YET_RELEASED'
                ? (
                  <>
                    <h3 className='w-72 h-6 my-1 text-h-signature'> Start Date: {data.startDate.day && data.startDate.day + ' of'} {monthNames[data.startDate.month - 1] + ', '}{data.startDate.year} </h3>
                    {data.episodes ? <h3> Total Episodes: {data.episodes} </h3> : null}
                  </>
                )
                : null}
            {!data.genres ? null :
              <div id='genres' className="flex flex-wrap pt-2 gap-1">
                {data.genres.map((e: string, i: number) => (
                  <h3 key={e + i} className="w-32 h-9 my-1 rounded-lg text-center pt-1 text-eigth text-md border"> {e} </h3>
                ))}
              </div>
            }
          </div>
          {!data.tags ? null :
            <div id="tags" className="flex flex-wrap gap-2 lg:w-2/5 sm:pl-5 lg:pl-0 sm:min-w-[22.5rem]">
              {data.tags.map((e: any,) => (
                <li key={e.id} className="text-eigth w-[10.5rem] sm:w-44 h-5"> {e.name} </li>
              ))}
            </div>
          }
        </div>
      </div>
    </div>
  )
}