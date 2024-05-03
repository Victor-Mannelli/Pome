/* eslint-disable @next/next/no-img-element */
"use client"

import { api, animeApi, monthNames, token, AnimeUserStatsInterface, SingleAnimeData } from '@/utils';
import { Stars, PopUp, AnimePageSkeleton } from '@/components';
import { FaHeart, FaRegHeart } from '@/utils/libs/reactIcons';
import { UserAnimeSettings } from './userAnimeSettings';
import { useEffect, useState } from 'react';
import { getAnimeData } from './functions';
import { toast } from 'react-toastify';
import { AnimeContent } from './animeContent';

export default function AnimePage({ params }: { params: { id: string } }) {
  const [fetchData, setFetchData] = useState<AnimeUserStatsInterface>({ status: '', score: 0, progress: 0, rewatches: 0, startDate: new Date(), finishDate: null });
  const [showAnimeSettings, setShowAnimeSettings] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);

  const [data, setData] = useState<SingleAnimeData | null>(null);
  const [dataLoad, setDataLoad] = useState<boolean>(true);
  const [dataFailed, setDataFailed] = useState<boolean>(false);

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
    // getAnimeData({ animeId: params.id, setData, setFailed: setDataFailed, setLoading: setDataLoad })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <>
      {!data ? (
        <AnimePageSkeleton />
      ) : (
        <div className={`flex flex-col gap-5 pb-5 `}>
          <div className={`flex flex-col gap-5 pb-5 ${!data.bannerImage ? 'mx-5' : ''}`}>
            {data.bannerImage ? (
              <div
                className={'w-full h-80 bg-cover bg-center'}
                style={{ backgroundImage: `url(${data.bannerImage})` }}
              > </div>
            ) : null}
          </div>
          <div className={`relative flex justify-start w-full gap-2 ${!data.bannerImage ? 'mt-20' : 'h-1/2'} `}>
            {favorite
              ? <FaHeart
                className='absolute right-1 top-0 mr-3 text-2xl text-red-500 hover:cursor-pointer'
                onClick={() => token ? setFavorite(!favorite) : toast.error('Log in first!')}
              />
              : <FaRegHeart
                className='absolute right-1 top-0 mr-3 text-2xl text-white hover:cursor-pointer'
                onClick={() => token ? setFavorite(!favorite) : toast.error('Log in first!')}
              />
            }
            <div
              // className="flex flex-col gap-3"
              className={`relative ${!data.bannerImage ? 'w-64' : 'h-64 w-[19rem]'} flex flex-col justify-end items-center`}
            >
              <img
                // className="rounded-md w-fit h-72"
                className={`absolute ${!data.bannerImage ? 'top-0 left-0 w-[95%] h-[25.5rem]' : 'top-[-10rem]'} rounded-xl w-[80%] h-[23rem]`}
                src={data.coverImage.extraLarge}
                alt="animeCoverImage"
              />
              <div
                // className="flex justify-center items-center h-9 w-full rounded-md hover:cursor-pointer hover:bg-fifth bg-fourthAndAHalf"
                className={`${!data.bannerImage ? 'absolute top-[26.5rem] left-0 w-[95%]' : 'w-[80%]'} flex justify-center items-center h-9 rounded-md hover:cursor-pointer hover:bg-fifth bg-fourthAndAHalf`}
                onClick={() => {
                  if (token) {
                    setShowAnimeSettings(!showAnimeSettings);
                  } else {
                    toast.error('Log in first!')
                  }
                  // api.post('/animes/populate', { id: data.id });
                }}
              >
                <h3 className='hover:cursor-pointer text-h-signature font-bold text-lg'>
                  {fetchData.status === '' ? 'Follow' : fetchData.status}
                </h3>
              </div>
            </div>
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
            {/* <div className="flex flex-col min-w-fit gap-3"> */}
            <AnimeContent data={data} />
          </div>
          <div className={`${!data.bannerImage ? 'pl-[16.5rem] w-full min-h-[13.5rem]' : 'mx-5'}`}>
            <p className="text-xl bg-fourthAndAHalf rounded-xl p-5">
              <span className="text-2xl font-bold"> Sinopse </span> <br /> <br />
              {data.description.replace(/(<([^>]+)>)/ig, ' ').replace(/(\r\n|\n|\r)/gm, ' ')}
            </p>
          </div>
          {data.trailer && data.trailer.site === 'youtube' ? (
            <div className={`bg-fourthAndAHalf rounded-xl p-5 ${!data.bannerImage ? '' : 'mx-5'}`}>
              <h1 className="text-2xl font-bold pb-3"> Trailer </h1>
              <div className="flex justify-center">
                <iframe
                  className="h-[25rem] w-[40rem]"
                  src={`https://www.youtube.com/embed/${data.trailer.id}`}
                  allowFullScreen
                />
              </div>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}
