"use client"

import { UsersAnimeListView } from './usersAnimelistView';
import { FollowedAnimeSkeleton } from '@/components';
import { UsersAnimelist } from '@/utils/types';
import { useEffect, useState } from 'react';
import { getUsersAnimeList } from '@/utils';
import { useRouter } from 'next/navigation';
import { Animelist } from './animelist';

export default function Home() {
  const [usersAnimeList, setUsersAnimeList] = useState<UsersAnimelist[] | null>(null);
  const [usersAnimeListFailed, setUsersAnimeListFailed] = useState<boolean>(false);
  const [usersAnimeListLoad, usersAnimeListSetLoad] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    getUsersAnimeList({
      setData: setUsersAnimeList,
      setLoading: usersAnimeListSetLoad,
      setFailed: setUsersAnimeListFailed,
    })
  }, [])

  return (
    <div className="flex flex-col-reverse justify-center items-center lg:items-start lg:flex-row m-5 gap-10">
      <Animelist usersAnimeListFailed={usersAnimeListFailed} usersAnimeList={usersAnimeList} />
      {usersAnimeListFailed ? null : usersAnimeListLoad ? (
        <FollowedAnimeSkeleton />
      ) : (
        <UsersAnimeListView usersAnimeList={usersAnimeList} router={router} />
      )}
    </div>
  )
}
