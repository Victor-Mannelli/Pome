/* eslint-disable @next/next/no-img-element */
"use client"

import { AnimeUserStatsInterface, SingleAnimeData, TokenContext, UsersAnimeList } from '@/utils';
import { getAnimeData, getUniqueUserAnimelist, maximizeTrailer } from './functions';
import { LiaExpandArrowsAltSolid } from '@/utils/libs/reactIcons';
import { useContext, useEffect, useState } from 'react';
import { PopUp, AnimePageSkeleton } from '@/components';
import { UserAnimeSettings } from './animeUserSettings';
import { AnimeInfo } from './animeInfo';
import { toast } from 'react-toastify';

export default function AnimePage({ params }: { params: { id: string } }) {
  const [usersAnimeStatus, setUsersAnimeStatus] = useState<UsersAnimeList | null>(null);
  const [showAnimeSettings, setShowAnimeSettings] = useState<boolean>(false);
  const [trailerFullScreen, setTrailerFullScreen] = useState<boolean>(false);
  const [data, setData] = useState<SingleAnimeData | null>(null);
  const [dataLoad, setDataLoad] = useState<boolean>(true);
  const [dataFailed, setDataFailed] = useState<boolean>(false);
  const [fetchData, setFetchData] = useState<AnimeUserStatsInterface>({
    status: usersAnimeStatus ? usersAnimeStatus.status : '',
    score: 0,
    progress: 0,
    rewatches: 0,
    startDate: new Date(),
    finishDate: null
  });
  const [favorite, setFavorite] = useState<boolean>(usersAnimeStatus?.favorite ? usersAnimeStatus?.favorite : false);
  const { user, token } = useContext(TokenContext);

  useEffect(() => {
    getUniqueUserAnimelist({ animeId: params.id, setData: setUsersAnimeStatus })
    getAnimeData({ animeId: params.id, setData, setFailed: setDataFailed, setLoading: setDataLoad })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(usersAnimeStatus)

  return (
    <>
      {!data ? (
        <AnimePageSkeleton />
      ) : (
        <div className="flex flex-col items-center w-full mb-5">
          {data.bannerImage ? (
            <div
              className={'w-full h-80 bg-cover bg-center'}
              style={{ backgroundImage: `url(${data.bannerImage})` }}
            > </div>
          ) : null}
          <AnimeInfo
            toggleShowAnimeSettings={() => setShowAnimeSettings(!showAnimeSettings)}
            setUsersAnimeStatus={setUsersAnimeStatus}
            usersAnimeStatus={usersAnimeStatus}
            toast={toast}
            data={data}
          />
          <PopUp show={showAnimeSettings} setShow={setShowAnimeSettings} bg={true}>
            <UserAnimeSettings
              setUsersAnimeStatus={setUsersAnimeStatus}
              usersAnimeStatus={usersAnimeStatus}
              setShowAnimeSettings={setShowAnimeSettings}
              showAnimeSettings={showAnimeSettings}
              data={data}
            />
          </PopUp>
          <div id="sinopse" className="w-[calc(100%-40px)]">
            <p className="text-xl bg-fourthAndAHalf rounded-xl p-5">
              <span className="text-2xl font-bold"> Sinopse </span> <br /> <br />
              {data.description.replace(/(<([^>]+)>)/ig, ' ').replace(/(\r\n|\n|\r)/gm, ' ')}
            </p>
          </div>
          {data.trailer && data.trailer.site === 'youtube' ? (
            <div className="relative bg-fourthAndAHalf rounded-xl w-[calc(100%-40px)] mt-5 p-5">
              <h1 className="text-2xl font-bold pb-3"> Trailer </h1>
              <div className="flex justify-center">
                <iframe
                  className={`${trailerFullScreen ? "w-[94%] h-[calc(100vh-7.5rem)]" : "h-[25rem] w-[40rem]"}`}
                  src={`https://www.youtube.com/embed/${data.trailer.id}`}
                  allowFullScreen
                />
              </div>
              <div
                className='absolute right-3 top-[0.6rem] md:bottom-4 md:top-[inherit] p-3 rounded-full bg-fourth hover:cursor-pointer hover:bg-fifth'
                onClick={() => maximizeTrailer({ setToggle: setTrailerFullScreen, toggle: trailerFullScreen })}
              >
                <LiaExpandArrowsAltSolid className='text-white text-xl' />
              </div>
            </div>
          ) : null}
        </div >
      )}
    </>
  );
}
