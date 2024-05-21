/* eslint-disable @next/next/no-img-element */
import { animeStatus, FaHeart, FaRegHeart, monthNames } from "@/utils";
import { SingleAnimeDataForSlug } from "@/utils/types";
import { Dispatch, SetStateAction } from "react";
import { parseCookies } from "nookies";
import { Stars } from "@/components";

export function AnimeInfo({ toggleShowAnimeSettings, setAnimeData, animeData, toast }: {
  setAnimeData: Dispatch<SetStateAction<SingleAnimeDataForSlug>>;
  toggleShowAnimeSettings: () => void;
  animeData: SingleAnimeDataForSlug;
  toast: any;
}) {
  const startDate = new Date(animeData.start_date * 1000)
  const token = parseCookies(null).token;

  return (
    <div className="relative flex justify-start w-full min-h-72 h-fit">
      {animeData.UserAnimeList ? (
        animeData.UserAnimeList.favorite === false ?
          <FaRegHeart
            className='absolute right-1 top-0 my-3 mr-2 text-2xl text-white hover:cursor-pointer'
            onClick={() => token ?
              setAnimeData(prevState => ({
                ...prevState, UserAnimeList: { ...prevState.UserAnimeList, favorite: true }
              }))
              : toast.error('Log in first!')
            }
          /> :
          <FaHeart
            className='absolute right-1 top-0 my-3 mr-2 text-2xl text-red-500 hover:cursor-pointer'
            onClick={() => token ?
              setAnimeData(prevState => ({
                ...prevState, UserAnimeList: { ...prevState.UserAnimeList, favorite: false }
              }))
              : toast.error('Log in first!')
            }
          />
      ) :
        <FaRegHeart
          className='absolute right-1 top-0 my-3 mr-2 text-2xl text-white hover:cursor-pointer'
          onClick={() => token ?
            setAnimeData(prevState => ({
              ...prevState, UserAnimeList: { ...prevState.UserAnimeList, favorite: true }
            }))
            : toast.error('Log in first!')}
        />
      }
      <div
        id="coverImageDisplay"
        className={`${animeData.banner_image ? "absolute -top-5 h-[17rem]" : "m-5"} md:flex hidden flex-col justify-end items-center gap-2 w-[19rem]`}
      >
        <img
          id="coverImage"
          alt="coverImage"
          className="w-60 h-[23.5rem] rounded-lg"
          src={animeData.cover_image}
        />
        <div
          key="coverImageButton"
          className="flex items-center justify-center w-60 h-9 rounded-md hover:bg-fifth bg-fourthAndAHalf hover:cursor-pointer"
          onClick={() => {
            if (!token) return toast.error('Log in first!')
            toggleShowAnimeSettings();
          }}
        >
          <h3 className={`font-bold text-lg py-3 ${animeData.UserAnimeList ? animeStatus[animeData.UserAnimeList.status].color : ""}`}>
            {animeData.UserAnimeList ? animeStatus[animeData.UserAnimeList.status].name : 'Follow'}
          </h3>
        </div>
      </div>
      <div id="animeInfo" className="flex flex-col w-full p-5 md:pl-0">
        <h1 id="title" className={`w-full pr-7 font-bold text-2xl ${animeData.banner_image ? "md:pl-[19rem]" : ""} `}> {animeData.title} </h1>
        <div className="flex flex-col lg:flex-row pt-3 gap-7">
          <div className={`flex flex-col justify-evenly min-h-48 ${animeData.banner_image ? "md:ml-[19rem]" : ""}`}>
            <div className='flex w-72 h-6 my-1'>
              <h3 className='pr-2 pt-[0.1rem]'>
                <span className='font-bold italic pr-1'> {animeData.status[0] + animeData.status.slice(1).toLocaleLowerCase()} </span>
                {animeData.average_score ? 'with' : ''}
              </h3>
              {animeData.average_score ? <Stars className='' score={animeData.average_score} /> : null}
            </div>
            {animeData.status === 'RELEASING'
              ? (
                <>
                  <h3 className='w-72 h-6 my-1'> Current Episode: {animeData.next_airing_episode.episode - 1} </h3>
                  <h3 className='w-72 h-6 my-1 text-h-signature'>
                    Next Episode in {Math.floor(animeData.next_airing_episode.timeUntilAiring / 86400)}d {" "}
                    {Math.floor((animeData.next_airing_episode.timeUntilAiring % 86400) / 3600)}h {" "}
                    {Math.floor((animeData.next_airing_episode.timeUntilAiring % 3600) / 60)}m {" "}
                  </h3>
                  <h3 className='w-72 h-6 my-1'> Total Episodes: {animeData.episodes} </h3>
                </>
              ) : animeData.status === 'NOT_YET_RELEASED'
                ? (
                  <>
                    <h3 className='w-72 h-6 my-1 text-h-signature'>
                      Start Date:
                      {' ' + monthNames[startDate.getMonth()] + ' ' + startDate.getDate() + 'th, '}
                      {startDate.getFullYear()}
                    </h3>
                    {animeData.episodes ? <h3> Total Episodes: {animeData.episodes} </h3> : null}
                  </>
                )
                : null}
            {!animeData.genres ? null :
              <div id='genres' className="flex flex-wrap gap-1 xl:w-[33.5rem] xx:w-fit">
                {animeData.genres.map((e: string, i: number) => (
                  <h3 key={e + i} className="w-32 h-9 my-1 rounded-lg text-center pt-1 text-eigth text-md border"> {e} </h3>
                ))}
              </div>
            }
          </div>
          {!animeData.tags ? null :
            <div id="tags" className="flex xl:flex-col flex-wrap items-start gap-2 pl-2 md:pl-7 lg:pl-0 xx:h-48 xl:h-[18.8rem] xl:w-[28rem] xx:pl-36">
              {animeData.tags.map((e: any,) => (
                <li key={e} className="text-eigth w-full sm:w-[13.5rem] h-5"> {e} </li>
              ))}
              {/* <li className="text-eigth w-full sm:w-[13.5rem] h-5"> asdasd </li> */}
            </div>
          }
        </div>
      </div>
    </div >
  )
}
