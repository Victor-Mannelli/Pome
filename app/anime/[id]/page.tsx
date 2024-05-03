import { api, animeApi, monthNames, token, AnimeUserStatsInterface, SingleAnimeData } from '@/utils';
import { FaHeart, FaRegHeart } from '@/utils/libs/reactIcons';
import { UserAnimeSettings } from './userAnimeSettings';
import { useEffect, useState } from 'react';
import { Stars, PopUp } from '@/components';
import { getAnimeData } from './functions';
import { toast } from 'react-toastify';

export default async function AnimePage({ params }: { params: { id: string } }) {
  const [fetchData, setFetchData] = useState<AnimeUserStatsInterface>({ status: '', score: 0, progress: 0, rewatches: 0, startDate: new Date(), finishDate: null });
  const [showAnimeSettings, setShowAnimeSettings] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);
  const data: SingleAnimeData | any = await getAnimeData(params.id);

  useEffect(() => {
    api.get('/animes/userlist').then((e) => {
      const response = e?.data.find((e: any) => e.anime_id === data.id);
      if (response) {
        response.favorite === true && setFavorite(true);
        setFetchData({ ...fetchData, status: response.status, score: response.score, progress: response.progress, rewatches: response.rewatches });
      }
    });
  }, []);

  return (
    <div className={`flex flex-col gap-5 pb-5 ${!data.bannerImage ? 'mx-5' : ''}`}>
      {data.bannerImage ? (
        <div
          className={'w-full h-80 bg-cover bg-center'}
          style={{ backgroundImage: `url(${data.bannerImage})` }}
        > </div>
      ) : null}
      {/* <div className={`relative ${!data.bannerImage ? 'mt-20' : 'h-1/2'} flex w-full gap-6 `}> */}
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
            alt="pfp"
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
              api.post('/animes/populate', { id: data.id });
            }}
          >
            <h3 className='hover:cursor-pointer text-h-signature font-bold text-lg'>
              {fetchData.status === '' ? 'Follow' : fetchData.status}
            </h3>
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
        </div>
        {/* <div className="flex flex-col min-w-fit gap-3"> */}
        <div className="w-[75%] flex flex-col gap-3 ">
          <h1 className="font-bold text-2xl"> {data.title.romaji} </h1>
          <div className="w-full flex pr-24 gap-10 overflow-auto">
            <div className='flex flex-col w-fit'>
              <div className='flex'>
                <h3 className='pr-2'> <span className='font-bold italic pr-1'> {data.status[0] + data.status.slice(1).toLocaleLowerCase()} </span> {data.averageScore ? 'with' : ''} </h3>
                {data.averageScore ? <Stars className='' score={data.averageScore} /> : null}
              </div>
              {data.status === 'RELEASING' ?
                <div className='flex flex-col gap-1 pt-2'>
                  <h3> Current Episode: {data.nextAiringEpisode.episode - 1} </h3>
                  <h3 className='text-h-signature'>
                    Next Episode in {Math.floor(data.nextAiringEpisode.timeUntilAiring / 86400)}d {Math.floor((data.nextAiringEpisode.timeUntilAiring % 86400) / 3600)}h {Math.floor((data.nextAiringEpisode.timeUntilAiring % 3600) / 60)}m
                  </h3>
                  <h3> Total Episodes: {data.episodes} </h3>
                </div>
                : data.status === 'NOT_YET_RELEASED' ?
                  <div className='flex flex-col gap-1 pt-2'>
                    <h3 className='text-h-signature'> Start Date: {data.startDate.day && data.startDate.day + ' of'} {monthNames[data.startDate.month - 1] + ', '}{data.startDate.year} </h3>
                    {data.episodes ? <h3> Total Episodes: {data.episodes} </h3> : null}
                  </div>
                  : null
              }
              {data.genres ?
                <div id='genres'
                  className="flex h-full gap-[0.35rem] mt-5 overflow-auto"
                >
                  {data.genres.map((e: string, i: number) => (
                    <h3 key={i} className="text-eigth text-md border h-fit p-2 rounded-xl"> {e} </h3>
                  ))}
                </div>
                : null
              }
            </div>
            {data.tags ?
              <div id='tags'
                className={`flex flex-col flex-wrap w-auto ${!data.bannerImage ? 'h-36' : 'h-56'} `}
              >
                {data.tags.map((e: any,) => (
                  <li key={e.id} className="text-eigth text-lg pr-10"> {e.name} </li>
                ))}
              </div>
              : null
            }
          </div>
        </div>
      </div >
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
    </div >
  );
}
