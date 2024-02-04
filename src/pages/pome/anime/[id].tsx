import { animeApi, api, FaHeart, FaRegHeart, SingleAnimeData, addAnimeUserStatus, AnimeUserStatsInterface, RxCross2 } from '@/utils';
import { Stars, PopUp, AnimeUserStats } from '@/components';
import { useEffect, useState } from 'react';
import { NextPageContext } from 'next';
import nookies from 'nookies';

export default function AnimePage({ data }: { data: SingleAnimeData }) {
  const [favorite, setFavorite] = useState<boolean>(false);
  const [showAnimeSettings, setShowAnimeSettings] = useState<boolean>(false);
  const [fetchData, setFetchData] = useState<AnimeUserStatsInterface>({ status: '', score: 0, progress: 0, rewatches: 0, startDate: new Date(), finishDate: null });
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const config = { headers: { Authorization: `Bearer ${nookies.get(null, 'token').token}` } };

  function handleAnimeUserStatus(fetchData: AnimeUserStatsInterface) {
    const body = { ...fetchData, animeId: data.id, favorite: favorite };
    addAnimeUserStatus({ body, setShowAnimeSettings });
  }
  function populateDb() {
    api.post('/anime/populate', { animeId: data.id }, config);
  }

  useEffect(() => {
    api.get('/anime/userlist', config).then((e) => {
      const response = e.data.find((e: any) => e.anime_id === data.id);
      if (response) {
        response.favorite === true && setFavorite(true);
        setFetchData({ ...fetchData, status: response.status, score: response.score, progress: response.progress, rewatches: response.rewatches });
      }
    });
  }, []);

  return (
    <div className='flex flex-col items-center gap-5 pb-7'>
      {data.bannerImage ? (
        <div
          className={'w-full h-[22rem] bg-cover'}
          style={{ backgroundImage: `url(${data.bannerImage})` }}
        > </div>
      ) : null}
      <div className={`relative ${!data.bannerImage ? 'mt-20' : 'h-1/2'} w-full rounded-xl flex gap-2 px-5 `}>
        {favorite
          ? <FaHeart className='absolute right-1 top-0 mr-3 text-2xl text-red-500 hover:cursor-pointer' onClick={() => setFavorite(!favorite)} />
          : <FaRegHeart className='absolute right-1 top-0 mr-3 text-2xl text-white hover:cursor-pointer' onClick={() => setFavorite(!favorite)} />
        }
        <div className={`relative ${!data.bannerImage ? 'w-64' : 'h-64 w-[19rem]'} flex flex-col justify-end items-center`}>
          <img
            className={`absolute ${!data.bannerImage ? 'top-0 left-0 w-[95%] h-[25.5rem]' : 'top-[-10rem]'} rounded-xl w-[80%] h-[23rem]`}
            src={data.coverImage.extraLarge}
            alt="pfp"
          />
          <div onClick={() => (setShowAnimeSettings(!showAnimeSettings), populateDb())}
            className={`${!data.bannerImage ? 'absolute top-[26.5rem] left-0 w-[95%]' : 'w-[80%]'} flex justify-center items-center h-9 rounded-md hover:cursor-pointer hover:bg-fifth bg-fourthAndAHalf`}
          >
            <h3 className='hover:cursor-pointer text-h-signature'>
              Did you like it?
            </h3>
          </div>
          <PopUp show={showAnimeSettings} setShow={setShowAnimeSettings} bg={true}>
            <div
              className='relative lg:w-[60rem] md:w-[70%] w-full md:h-[70%] h-screen bg-second md:rounded-xl md:border border-sixth flex flex-col gap-3'
              onClick={(e) => e.stopPropagation()}
            >
              <RxCross2
                className='absolute z-20 right-4 top-4 text-white text-3xl cursor-pointer hover:text-sixth'
                onClick={() => setShowAnimeSettings(!showAnimeSettings)}
              />
              {/* <div>
                <img className='rounded-t-xl h-[13.1rem]' src={data.bannerImage} alt='banner' />
              </div> */}
              <div
                className={'relative rounded-t-xl h-[13.1rem] bg-cover flex flex-wrap items-end p-3'}
                style={{ backgroundImage: `url(${data.bannerImage})`, boxShadow: 'inset 0 0 200px black' }}
              >
                <h3 className='font-bold'> {data.title.romaji} </h3>
                {favorite
                  ? <FaHeart className='absolute right-1 bottom-4 mr-3 text-2xl text-red-500 hover:cursor-pointer' onClick={() => setFavorite(!favorite)} />
                  : <FaRegHeart className='absolute right-1 bottom-4 mr-3 text-2xl text-white hover:cursor-pointer' onClick={() => setFavorite(!favorite)} />
                }
              </div>
              <AnimeUserStats maxEpisodes={data.episodes} fetchData={fetchData} setFetchData={setFetchData} />
              <div
                className='absolute bottom-4 right-4 rounded-xl px-7 py-3 bg-fourth hover:bg-fourthAndAHalf cursor-pointer'
                onClick={() => handleAnimeUserStatus(fetchData)}
              >
                <h3 className='cursor-pointer'> Save </h3>
              </div>
            </div>
          </PopUp>
        </div>
        <div className="w-[75%] flex flex-col gap-3">
          <h1 className="font-bold text-3xl"> {data.title.romaji} </h1>
          <div className={`w-full flex ${!data.bannerImage ? 'h-36' : ''} pr-24 gap-10 overflow-auto`}>
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
                <div className="flex h-full gap-[0.35rem] overflow-auto">
                  {data.genres.map((e: string, i: number) => (
                    <h3 key={i} className="text-eigth text-xl border h-fit mt-5 p-2 rounded-xl"> {e} </h3>
                  ))}
                </div>
                : null
              }
            </div>
            <div className={`flex flex-col w-auto ${!data.bannerImage ? 'h-36' : 'h-56'}  ml-2 pr-2 gap-[0.35rem] flex-wrap`}>
              {data.tags ? data.tags.map((e: any,) => (
                <li key={e.id} className="text-eigth text-xl pr-10"> {e.name} </li>
              )) : null}
            </div>
          </div>
        </div>
      </div >
      <div className={`bg-fourthAndAHalf ${!data.bannerImage ? 'ml-[17.8rem] mr-3 w-fit' : 'w-[98%]'} rounded-xl p-5`}>
        <h1 className="text-3xl font-bold pb-3"> Sinopse </h1>
        <p className="text-2xl"> {data.description.replace(/(<([^>]+)>)/ig, ' ').replace(/(\r\n|\n|\r)/gm, ' ')} </p>
      </div>
      {
        data.trailer && data.trailer.site === 'youtube' ? (
          <div className="bg-fourthAndAHalf rounded-xl w-[98%] p-5">
            <h1 className="text-3xl font-bold pb-3"> Trailer </h1>
            <div className="flex justify-center">
              <iframe
                className="h-[25rem] w-[40rem]"
                src={`https://www.youtube.com/embed/${data.trailer.id}`}
                allowFullScreen
              />
            </div>
          </div>
        ) : null
      }
    </div >
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const variables = {
    id: Number(context.query.id)
  };
  const query = `
    query ($id: Int) {
      Media (id: $id) {
        id
        title {
          romaji
          english
          native
        }
        type
        format
        status
        description
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        season
        episodes
        duration
        chapters
        volumes
        source
        hashtag
        trailer {
          id
          site
          thumbnail
        }
        updatedAt
        coverImage {
          extraLarge
          large
          medium
        }
        bannerImage
        genres
        synonyms 
        averageScore
        meanScore
        popularity
        trending
        favourites
        tags {
          id
          name
          description
          category
          isAdult
        }
        characters {
          nodes {
            id
            name {
              full
            }
            image {
              large
              medium
            }
            gender
            description
            dateOfBirth {
              year
              month
              day
            }
            age
            bloodType
            isFavourite
            favourites
          }
        }
        isAdult
        nextAiringEpisode {
          id
          timeUntilAiring
          episode
        }
      }
    }
  `;
  try {
    let { data } = await animeApi.post('', { query, variables }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    data = data.data.Media;

    return {
      props: {
        data
      },
    };
  } catch (error) {
    return {
      redirect: { destination: '/', permanent: false }
    };
  }
}
