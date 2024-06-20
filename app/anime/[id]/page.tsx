/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { SingleAnimeDataForSlug, UsersAnimeData, getAnimeQuery, TokenContext } from '@/utils';
import { PopUp, AnimePageSkeleton, ErrorFeedback } from '@/components';
import { LiaExpandArrowsAltSolid } from '@/utils/libs/reactIcons';
import { maximizeTrailer, getUserAnimeData } from './functions';
import React, { useState, useEffect, useContext } from 'react';
import { AnimeUserSettings } from './animeUserSettings';
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { AnimeInfo } from './animeInfo';
import { Sinopse } from './sinopse';

export default function AnimePage({ params }: { params: { id: string } }) {
  const { loading, error: dataFailed, data } = useQuery<{ Media: SingleAnimeDataForSlug }>(getAnimeQuery, { variables: { id: Number(params.id) } });
  const { token } = useContext(TokenContext);
  const [userAnimeData, setUserAnimeData] = useState<UsersAnimeData | null>(null);
  const [userAnimeDataLoading, setUserAnimeDataLoading] = useState<boolean>(true);
  const [userAnimeDataFailed, setUserAnimeDataFailed] = useState<boolean>(false);
  const [showAnimeSettings, setShowAnimeSettings] = useState<boolean>(false);
  const [trailerFullScreen, setTrailerFullScreen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (!token) return;
    getUserAnimeData({
      setFailed: setUserAnimeDataFailed,
      setLoading: setUserAnimeDataLoading,
      setUserAnimeData,
      animeId: Number(params.id),
    });
  }, [params.id, token]);

  return (
    <>
      {dataFailed ? (
        <div className="flex justify-center items-center w-full h-screen">
          <ErrorFeedback refreshFunction={() => router.refresh()} loading={loading} animeApi={false} />
        </div>
      ) : loading ? (
        <AnimePageSkeleton />
      ) : (
        <div className="flex flex-col items-center w-full mb-5">
          {data.Media.bannerImage ? (
            <div className={'w-full h-80 bg-cover bg-center'} style={{ backgroundImage: `url(${data.Media.bannerImage})` }}></div>
          ) : null}
          <AnimeInfo
            toggleShowAnimeSettings={() => setShowAnimeSettings(!showAnimeSettings)}
            setUserAnimeData={setUserAnimeData}
            userAnimeData={userAnimeData}
            animeData={data.Media}
          />
          <PopUp show={showAnimeSettings} setShow={setShowAnimeSettings} bg={true}>
            {showAnimeSettings ? (
              <AnimeUserSettings
                setShowAnimeSettings={setShowAnimeSettings}
                setUserAnimeData={setUserAnimeData}
                userAnimeData={userAnimeData}
                animeData={data.Media}
              />
            ) : null}
            <></>
          </PopUp>
          <Sinopse animeData={data.Media} inAnimeInfo={false} />
          {data.Media.trailer && data.Media.trailer.site === 'youtube' ? (
            <div className="relative bg-fourthAndAHalf rounded-xl w-[calc(100%-40px)] mt-5 p-5">
              <h1 className="text-xl font-bold pb-3"> Trailer </h1>
              <div className="relative flex justify-center">
                <iframe
                  className={`${trailerFullScreen ? 'w-[94%] h-[calc(100vh-7.5rem)]' : 'h-[25rem] w-[40rem]'}`}
                  src={`https://www.youtube.com/embed/${data.Media.trailer.id}`}
                  allowFullScreen
                />
              </div>
              <div
                className="absolute right-3 top-[0.6rem] md:bottom-4 md:top-[inherit] p-3 rounded-full bg-fourth cursor-pointer hover:bg-fifth"
                onClick={() => maximizeTrailer({ setToggle: setTrailerFullScreen, toggle: trailerFullScreen })}
              >
                <LiaExpandArrowsAltSolid className="text-white text-xl" />
              </div>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}
