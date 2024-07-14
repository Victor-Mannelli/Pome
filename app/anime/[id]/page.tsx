'use client';

import { UsersAnimeData, getAnimeQuery, TokenContext, SingleAnimeData, logout } from '@/utils';
import { PopUp, AnimePageSkeleton, ErrorFeedback } from '@/components';
import { LiaExpandArrowsAltSolid } from '@/utils/libs/reactIcons';
import { maximizeTrailer, getUserAnimeData } from './functions';
import { useState, useEffect, useContext } from 'react';
import { AnimeUserSettings } from './animeUserSettings';
import { useRouter } from 'next/navigation';
import { useToast } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { AnimeInfo } from './animeInfo';
import { Sinopse } from './sinopse';
import React from 'react';

export default function AnimePage({ params }: { params: { id: string } }) {
  const { loading, error: dataFailed, data } = useQuery<{ Media: SingleAnimeData }>(getAnimeQuery, { variables: { id: Number(params.id) } });
  const [userAnimeData, setUserAnimeData] = useState<UsersAnimeData | null>(null);
  const [userAnimeDataLoading, setUserAnimeDataLoading] = useState<boolean>(true);
  const [userAnimeDataFailed, setUserAnimeDataFailed] = useState<boolean>(false);
  const [showAnimeSettings, setShowAnimeSettings] = useState<boolean>(false);
  const [trailerFullScreen, setTrailerFullScreen] = useState<boolean>(false);
  const { token, setToken, setUser } = useContext(TokenContext);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (!token) return;
    getUserAnimeData({
      setFailed: setUserAnimeDataFailed,
      setLoading: setUserAnimeDataLoading,
      setUserAnimeData,
      animeId: Number(params.id),
    });
  }, [params.id, token]);

  if (userAnimeDataFailed) {
    logout({ setToken, setUser, toast });
    router.push('/');
  }
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
            <div className={'w-full h-52 sm:h-80 bg-cover bg-center'} style={{ backgroundImage: `url(${data.Media.bannerImage})` }}></div>
          ) : null}
          <AnimeInfo
            toggleShowAnimeSettings={() => setShowAnimeSettings(!showAnimeSettings)}
            userAnimeDataLoading={userAnimeDataLoading}
            setUserAnimeData={setUserAnimeData}
            userAnimeData={userAnimeData}
            animeData={data.Media}
            token={token}
            toast={toast}
          />
          <PopUp show={showAnimeSettings} setShow={setShowAnimeSettings} bg={true}>
            {showAnimeSettings ? (
              <AnimeUserSettings
                setShowAnimeSettings={setShowAnimeSettings}
                userAnimeDataLoading={userAnimeDataLoading}
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
