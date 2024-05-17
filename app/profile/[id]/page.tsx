/* eslint-disable @next/next/no-img-element */
"use client"

import { getUsersAnimeList, UseLogout } from '@/utils/functions';
import { Button, Filter, ProfileSkeleton } from '@/components';
import { useContext, useEffect, useState } from 'react';
import { TokenContext, UsersAnimeList } from '@/utils';
import { useRouter } from 'next/navigation';
import _ from 'underscore';

export default function Profile() {
  const [usersAnimeList, setUsersAnimeList] = useState<UsersAnimeList[] | null>(null);
  const [usersAnimeListFailed, setUsersAnimeListFailed] = useState<boolean>(false);
  const [usersAnimeListLoad, usersAnimeListSetLoad] = useState<boolean>(true);

  const [filter, setFilter] = useState<string>('Watching');
  const [sort, setSort] = useState<string>('');
  const router = useRouter();

  const { user } = useContext(TokenContext)
  if (user) {
    user.banner = '/dark_bg.jpg';
    user.profile_picture = 'https://icon2.cleanpng.com/20180319/row/kisspng-computer-icons-google-account-user-profile-iconfin-png-icons-download-profile-5ab0301d8907a6.3404305715214960935613.jpg';
  }

  useEffect(() => {
    getUsersAnimeList({ setData: setUsersAnimeList, setLoading: usersAnimeListSetLoad, setFailed: setUsersAnimeListFailed })
  }, [])


  const animeList = _.sortBy(usersAnimeList, sort).reverse()?.filter((e: any) => {
    if (sort.length > 0) {
      return e.anime.title.toLowerCase().includes(sort.toLowerCase())
    }
    return e.status === filter
  });

  return (
    usersAnimeListFailed ? UseLogout({ router }) : usersAnimeListLoad ?
      (
        <ProfileSkeleton />
      ) : usersAnimeList && (
        <div className="flex flex-col">
          <div className={'w-full h-60 flex items-end px-44'}
            style={{ backgroundImage: `url('${user?.banner}')` }}
          >
            <img
              className="h-40"
              src={user?.profile_picture}
              alt="profile_pic"
            />
            <h1 className="pl-10 pb-5 text-2xl"> {user?.username[0].toUpperCase() + user?.username.slice(1)} </h1>
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
                {animeList.length > 0 ?
                  animeList.map((e: UsersAnimeList) => (
                    <div
                      key={e.anime_id}
                      className="flex w-full items-center px-5 py-1 hover:bg-second rounded-xl cursor-pointer"
                      onClick={() => router.push(`/anime/${e.anime_id}`)}
                    >
                      <img alt='animeCover' src={e.anime.cover_image} className='w-fit h-16 rounded-sm' />
                      <h3 className="w-[66.5%] pl-5 break-all cursor-pointer"> {e.anime.title} </h3>
                      <h3 className="w-[11.5%] text-center cursor-pointer"> {e.score} </h3>
                      <h3 className="w-[11.5%] text-center cursor-pointer"> {e.progress} </h3>
                      <h3 className="w-[11.5%] text-center cursor-pointer"> {e.anime.status} </h3>
                    </div>
                  )) :
                  <div className='w-full h-fit p-5 rounded-md bg-third'>
                    <p className='text-center'> You are not following any anime yet < br /> open their pages and start following! </p>
                  </div >
                }
              </div>
            </div>
          </div>
        </div >
        // <UsersAnimeListView usersAnimeList={usersAnimeList} router={router} />
      )
  )
}
