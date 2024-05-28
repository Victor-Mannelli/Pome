"use client"

import { getUsersAnimeList, UseLogout } from '@/utils/functions';
import { DefaultButton, Filter, ProfileSkeleton } from '@/components';
import { useContext, useEffect, useState } from 'react';
import { TokenContext, UsersAnimelist } from '@/utils';
import { Avatar, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import _ from 'underscore';

export default function Profile() {
  const [usersAnimeList, setUsersAnimeList] = useState<UsersAnimelist[] | null>(null);
  const [usersAnimeListFailed, setUsersAnimeListFailed] = useState<boolean>(false);
  const [usersAnimeListLoad, usersAnimeListSetLoad] = useState<boolean>(true);
  const { user, setToken, setUser } = useContext(TokenContext)

  const [filter, setFilter] = useState<string>('Watching');
  const [sort, setSort] = useState<string>('');
  const router = useRouter();
  const toast = useToast();

  if (user) {
    user.banner = '/dark_bg.jpg';
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
    usersAnimeListFailed ? UseLogout({ setToken, setUser, toast }) : usersAnimeListLoad ? (
      <ProfileSkeleton />
    ) : usersAnimeList ? (
      <div className="flex flex-col">
        <div className={'flex items-end w-full h-60 '}
          style={{ backgroundImage: `url('${user?.banner}')` }}
        >
          <div className='flex justify-end w-1/4'>
            <Avatar
              borderRadius={2}
              h={160}
              w={137}
              className='cursor-pointer'
              src={user ? user.avatar : null}
            />
          </div>
          <h1 className="w-3/4 pl-10 pb-5 text-2xl"> {user?.username[0].toUpperCase() + user?.username.slice(1)} </h1>
        </div>
        <div className="flex h-screen w-full">
          <div className="w-1/4 h-screen bg-second flex p-10">
            {/* <Filter onChange={(e) => setSort(e.target.value)} /> */}
          </div>
          <div className="w-3/4 h-screen flex flex-col">
            <div className="flex justify-center">
              {['Finished', 'Watching', 'Planning', 'Dropped', 'Rewatching'].map((e, i) =>
                <DefaultButton
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
                animeList.map((e: UsersAnimelist) => (
                  <div
                    key={e.anime_id}
                    className="flex w-full items-center px-5 py-1 hover:bg-second rounded-xl cursor-pointer"
                    onClick={() => router.push(`/anime/${e.anime_id}`)}
                  >
                    <Image
                      alt='animeCover'
                      src={e.anime.coverImage.medium}
                      className='w-fit h-16 rounded-sm'
                      width={1920}
                      height={1080}
                    />
                    <h3 className="w-[66.5%] pl-5 break-all cursor-pointer"> {e.anime.title.romaji} </h3>
                    <h3 className="w-[11.5%] text-center cursor-pointer"> {e.score} </h3>
                    <h3 className="w-[11.5%] text-center cursor-pointer"> {e.progress} </h3>
                    <h3 className="w-[11.5%] text-center cursor-pointer"> {e.status} </h3>
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
    ) : null
  )
}
