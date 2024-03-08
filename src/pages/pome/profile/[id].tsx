// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserFollowingAnime } from '@/utils/interfaces';
import { Button, Filter } from '@/components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';
import { parseCookies } from 'nookies';
import axios from 'axios';
import _ from 'underscore';
import { getAnimesUserList } from '@/utils/functions';

export default function Profile(data: any) {
  const [filter, setFilter] = useState<string>('Watching');
  const [sort, setSort] = useState<string>('');
  const router = useRouter();

  const user = {
    banner: '/assets/dark_bg.jpg',
    profile_picture: 'https://icon2.cleanpng.com/20180319/row/kisspng-computer-icons-google-account-user-profile-iconfin-png-icons-download-profile-5ab0301d8907a6.3404305715214960935613.jpg',
  };

  // data = _.sortBy(data, sort).reverse();
  const animeList = data?.userAnimeList?.filter((e: any) => {
    if(sort.length > 0 ){
      return e.anime.title.toLowerCase().includes(sort.toLowerCase())
    }
    return e.status === filter
  });

  console.log(data?.userAnimeList)
  return (
    <div className="flex flex-col">
      <div className={'w-full h-60 flex items-end px-44'}
        style={{ backgroundImage: `url('${user.banner}')` }}
      >
        <img
          className="h-40"
          src={user.profile_picture}
          alt="profile_pic"
        />
        <h1 className="pl-10 pb-5 text-2xl"> {data.userData.username[0].toUpperCase() + data.userData.username.slice(1)} </h1>
      </div>
      <div className="flex h-screen w-full">
        <div className="w-1/4 h-screen bg-second flex p-10">
          <Filter onChange={(e) => setSort(e.target.value)} />
        </div>
        <div className="w-3/4 h-screen flex flex-col">
          <div className="flex justify-center">
            {['Finished', 'Watching', 'Planning', 'Dropped', 'Rewatching'].map((e, i) =>
              <Button
                key={i}
                text={e}
                className={`ml-5 mt-5 ${filter === e ? 'border bg-second' : 'bg-third'}`}
                onClick={() => setFilter(e)}
              />
            )}
          </div>
          <div className="bg-third rounded-2xl m-5 pb-5">
            <div className="w-full flex p-5">
              <h3 className="w-[67%] pl-1 break-all font-bold"> Title </h3>
              <h3 className="w-[11%] text-center font-bold"> Score </h3>
              <h3 className="w-[11%] text-center font-bold"> Progress </h3>
              <h3 className="w-[11%] text-center font-bold"> Status </h3>
            </div>
            {animeList.map((e: UserFollowingAnime) => (
              <div
                key={e.anime_id}
                className="flex w-full items-center px-5 py-1 hover:bg-second rounded-xl cursor-pointer"
                onClick={() => router.push(`/pome/animes/${e.anime_id}`)}
              >
                <img src={e.anime.cover_image} className='w-fit h-16 rounded-sm' />
                <h3 className="w-[66.5%] pl-5 break-all cursor-pointer"> {e.anime.title} </h3>
                <h3 className="w-[11.5%] text-center cursor-pointer"> {e.score} </h3>
                <h3 className="w-[11.5%] text-center cursor-pointer"> {e.progress} </h3>
                <h3 className="w-[11.5%] text-center cursor-pointer"> {e.anime.status} </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const cookies = parseCookies(context);
  const config = { headers: { Authorization: `Bearer ${cookies.token}` } };
  try {
    const [userData, userAnimeList] = await Promise.all([
      axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, config).then(e => e.data),
      axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/animes/userlist`, config).then(e => e.data),
    ]);

    const data = {
      userData,
      userAnimeList,
    };
    console.log(data, 'server')
    // if (!data) return {
    //   redirect: { destination: '/', permanent: false },
    // };

    return { props: data };
  } catch (error) {
    return {
      redirect: { destination: '/pome/login', permanent: false }
    };
  }
}
