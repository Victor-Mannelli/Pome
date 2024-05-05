/* eslint-disable @next/next/no-img-element */
"use client"

import { api, animeApi, monthNames, token, AnimeUserStatsInterface, SingleAnimeData } from '@/utils';
import { Stars, PopUp, AnimePageSkeleton } from '@/components';
import { FaHeart, FaRegHeart, LiaExpandArrowsAltSolid } from '@/utils/libs/reactIcons';
import { UserAnimeSettings } from './animeUserSettings';
import { AnimeInfo } from './animeContent';
import { useEffect, useState } from 'react';
import { getAnimeData } from './functions';
import { toast } from 'react-toastify';

export default function AnimePage({ params }: { params: { id: string } }) {
  const [fetchData, setFetchData] = useState<AnimeUserStatsInterface>({ status: '', score: 0, progress: 0, rewatches: 0, startDate: new Date(), finishDate: null });
  const [showAnimeSettings, setShowAnimeSettings] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);

  const [data, setData] = useState<SingleAnimeData | null>(null);
  const [dataLoad, setDataLoad] = useState<boolean>(true);
  const [dataFailed, setDataFailed] = useState<boolean>(false);
  const [trailerFullScreen, setTrailerFullScreen] = useState<boolean>(false);

  // const data: SingleAnimeData | any = await getAnimeData(params.id);

  // useEffect(() => {
  //   api.get('/animes/userlist').then((e) => {
  //     const response = e?.data.find((e: any) => e.anime_id === data.id);
  //     if (response) {
  //       response.favorite === true && setFavorite(true);
  //       setFetchData({ ...fetchData, status: response.status, score: response.score, progress: response.progress, rewatches: response.rewatches });
  //     }
  //   });
  // }, []);

  // ${!data.bannerImage ? 'mx-5' : ''}`}

  useEffect(() => {
    getAnimeData({ animeId: params.id, setData, setFailed: setDataFailed, setLoading: setDataLoad })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
            setFavorite={setFavorite}
            favorite={favorite}
            fetchData={fetchData}
            toast={toast}
            data={data}
          />
          <PopUp show={showAnimeSettings} setShow={setShowAnimeSettings} bg={true}>
            <UserAnimeSettings
              setShowAnimeSettings={setShowAnimeSettings}
              showAnimeSettings={showAnimeSettings}
              setFetchData={setFetchData}
              setFavorite={setFavorite}
              fetchData={fetchData}
              favorite={favorite}
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
                className='absolute right-3 bottom-4 p-3 rounded-full bg-fourth hover:cursor-pointer hover:bg-fifth'
                onClick={() => setTrailerFullScreen(!trailerFullScreen)}
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
