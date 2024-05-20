/* eslint-disable @next/next/no-img-element */
"use client"

import { getAnimeData, getUniqueUserAnimelist, maximizeTrailer } from './functions';
import { PopUp, AnimePageSkeleton, ErrorFeedback } from '@/components';
import { LiaExpandArrowsAltSolid } from '@/utils/libs/reactIcons';
import { UserAnimeSettings } from './animeUserSettings';
import { useEffect, useState } from 'react';
import { AnimeInfo } from './animeInfo';
import { toast } from 'react-toastify';

export default function AnimePage({ params }: { params: { id: string } }) {
  const [showAnimeSettings, setShowAnimeSettings] = useState<boolean>(false);
  const [trailerFullScreen, setTrailerFullScreen] = useState<boolean>(false);

  const [usersAnimeStatus, setUsersAnimeStatus] = useState<any | null>(null);
  const [usersAnimeStatusLoad, setUsersAnimeStatusLoad] = useState<boolean>(true);
  const [usersAnimeStatusFailed, setUsersAnimeStatusFailed] = useState<boolean>(false);

  const [data, setData] = useState<any | null>(null);
  const [dataLoad, setDataLoad] = useState<boolean>(true);
  const [dataFailed, setDataFailed] = useState<boolean>(false);

  useEffect(() => {
    // getUniqueUserAnimelist({
    //   setFailed: setUsersAnimeStatusFailed,
    //   setLoading: setUsersAnimeStatusLoad,
    //   setData: setUsersAnimeStatus,
    //   animeId: params.id,
    // });
    getAnimeData({
      setFailed: setDataFailed,
      setLoading: setDataLoad,
      animeId: params.id,
      setData,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(data, "data")
  console.log(usersAnimeStatus, "usersAnimeStatus")

  return (
    <>
      {dataFailed ?
        (
          <ErrorFeedback
            refreshFunction={() => {
              getUniqueUserAnimelist({ animeId: params.id, setData: setUsersAnimeStatus, setFailed: setUsersAnimeStatusFailed, setLoading: setUsersAnimeStatusLoad })
              getAnimeData({ animeId: params.id, setData, setFailed: setDataFailed, setLoading: setDataLoad })
            }}
          />
        ) : dataLoad || usersAnimeStatusLoad ? (
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
                <div className="relative flex justify-center">
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
