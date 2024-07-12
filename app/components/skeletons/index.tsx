import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import React, { Dispatch, SetStateAction } from 'react';
import { FaRegHeart, RxCross2 } from '@/utils/libs';
import Textarea from 'rc-textarea';
import { Filter } from '../tools';
import { FriendShip } from '@/friends/types';
import { User } from '@/utils';

export function FollowedAnimeSkeleton() {
  return (
    <div className="flex flex-col bg-third rounded-md xl:w-[34rem] lg:w-[17.75rem] md:w-[42.125rem] sm:w-[25.875rem] w-[17.75rem]">
      <div className="flex flex-wrap gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div className="flex flex-col justify-end w-[7.125rem] h-40 bg-fifth animate-pulse rounded-md bg-cover cursor-pointer" key={i}></div>
        ))}
      </div>
    </div>
  );
}

export function HomePageAnimesSkeleton({ page }: { page: number }) {
  return (
    // <div className="flex flex-col items-center h-full xl:w-[62.6rem] lg:w-[52rem] md:w-[41.4rem] sm:w-[30.8rem] w-[20.2rem]">
    <>
      <div className="flex flex-wrap gap-4 py-5 w-[20.2rem] sm:w-full">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            className="flex flex-col justify-end w-[9.6rem] h-64 rounded-md cursor-pointer hover:brightness-90 bg-cover animate-pulse bg-fifth"
            key={i}
          ></div>
        ))}
      </div>
      <PageHandlerSkeleton page={page} />
    </>
    // </div>
  );
}

export function PageHandlerSkeleton({ page }: { page?: number }) {
  return (
    <div className="flex justify-center items-center w-full">
      <button className="p-5 text-xl font-bold text-eigth rounded-xl hover:bg-second animate-pulse bg-third"> Back</button>
      <h3 className="font-bold px-5 animate-pulse"> {page ? page : '-'} </h3>
      <button className="p-5 text-xl font-bold text-eigth rounded-xl hover:bg-second animate-pulse bg-third"> Next</button>
    </div>
  );
}

//! using: lg: '1080px',
export function AnimePageSkeleton() {
  return (
    <SkeletonTheme baseColor="#2c2e2f" highlightColor="#3a3d3e">
      <div className="flex flex-col items-center w-full mb-5">
        <div id="banner" className="w-full">
          <Skeleton className="h-56 sm:h-80" />
        </div>
        <div id="animeInfo" className="relative flex justify-start w-full min-h-72 h-fit">
          <FaRegHeart className="absolute right-1 top-3 my-3 mr-2 text-2xl text-second" />
          <div id="coverImage" className="absolute -top-5 h-64 sm:flex hidden flex-col justify-end items-center w-[19rem]">
            <Skeleton key="coverImage" className="w-60 h-[23rem] rounded-lg shadow-fifth shadow" />
            <Skeleton key="coverImageButton" className="w-60 h-9 rounded-lg shadow-fifth shadow" />
          </div>
          <div id="animeDescription" className="flex flex-col w-full p-5 sm:pl-0">
            <div id="title" className="w-full sm:pl-[19rem] pr-7">
              <Skeleton className="h-6" />
            </div>
            <div className="flex flex-col lg:flex-row justify-between pt-3 gap-3 ">
              <div className="flex flex-col min-h-48 max-w-[32.75rem] sm:ml-[19rem]">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={'animeStats' + i} className="w-72 h-5 my-1" />
                ))}
                <div className="flex flex-wrap pt-2 gap-1">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={'animeGenre' + i} className="w-32 h-9 my-1 rounded-lg" />
                  ))}
                </div>
              </div>
              <div id="tags" className="flex flex-wrap gap-2 lg:w-2/5 sm:pl-5 lg:pl-0 sm:min-w-[22.5rem] overflow-auto">
                {Array.from({ length: 12 }).map((_, i) => (
                  <Skeleton key={'animeTags' + i} className="w-[10.5rem] sm:w-44 h-5" />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div id="sinopse" className="w-[calc(100%-40px)]">
          <Skeleton className="h-72 ms:h-48" />
        </div>
        <div id="trailer" className="w-[calc(100%-40px)] mt-5">
          <Skeleton className="h-96" />
        </div>
      </div>
    </SkeletonTheme>
  );
}

export function ProfileSkeleton() {
  return (
    <SkeletonTheme baseColor="#2c2e2f" highlightColor="#3a3d3e">
      <div className="flex flex-col items-center h-full">
        <div className="relative flex items-end w-full h-52 sm:h-60">
          <Skeleton key="banner" className="absolute inset-0" />
          <Skeleton key="pfp" className="w-[100px] sm:w-[137px] h-[130px] sm:h-40 ml-5 shadow-fifth shadow" />
          <Skeleton key="userName" className="w-24 h-6 ml-5 sm:ml-7 mb-3 shadow-fifth shadow" />
        </div>
        <div className="flex flex-col gap-[0.3rem] xl:w-[62.6rem] lg:w-[52rem] md:w-[41.4rem] sm:w-[30.8rem]">
          <div className="flex flex-wrap items-center justify-center md:flex-row gap-3 py-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={'filter' + i} className="w-[10.5rem] h-9 rounded-sm" />
            ))}
          </div>
          <div className="grid grid-cols-[9%_55.72%_11%_11%_13.28%] p-3 w-full hover:bg-second rounded-md cursor-pointer">
            <Skeleton className="h-8" />
            <div></div>
            <Skeleton className="h-8" />
            <Skeleton className="h-8" />
            <Skeleton className="h-8" />
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={'animeRow' + i} className="grid grid-cols-[9%_55.72%_11%_11%_13.28%] px-3 w-full hover:bg-second rounded-md cursor-pointer">
              <Skeleton className="h-16" />
              <Skeleton className="h-16 pl-5" />
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
            </div>
          ))}
        </div>
      </div>
    </SkeletonTheme>
  );
}

export function ChatBoxSkeleton({
  wsRoomAndFriend,
  user,
}: {
  wsRoomAndFriend: { wsRoom: string; friend_id: string; friend: FriendShip };
  user: User;
}) {
  return (
    <div
      id="chat"
      className={`${wsRoomAndFriend?.wsRoom === user?.user_id ? 'hidden sm:flex' : 'flex'} flex-col justify-between sm:w-3/4 w-full h-full bg-third sm:rounded-xl`}
    >
      <GenericRowSkeleton rows={15} />
      <Textarea
        disabled
        value={''}
        placeholder="Message"
        className="w-full outline-none border-none bg-fifth placeholder:text-white text-white rounded-lg pl-4 pr-9 py-3 resize-none h-12"
      />
    </div>
  );
}

export function AddFriendsSkeleton({ setShowUsers }: { setShowUsers: Dispatch<SetStateAction<boolean>> }) {
  return (
    <div className="fixed top-0 left-0 flex justify-center items-center z-50 h-screen w-full">
      <div className="relative lg:w-[60rem] md:w-[70%] w-full md:h-[70%] h-screen bg-second md:rounded-xl md:border border-sixth flex flex-col items-center gap-3 p-5">
        <RxCross2
          className="absolute right-4 top-4 text-white text-3xl cursor-pointer hover:text-sixth"
          onClick={() => setShowUsers((prevState) => !prevState)}
        />
        <h1> Send a Friend Request! </h1>
        <Filter onChange={null} />
        <GenericRowSkeleton />
      </div>
    </div>
  );
}

//* GENERIC

export function GenericRowSkeleton({ rows, lineHeight }: { rows?: number; lineHeight?: string }) {
  return (
    <SkeletonTheme baseColor="#3a3d3e" highlightColor="#797776">
      <div className="flex flex-col gap-3 w-full overflow-auto">
        {Array.from({ length: rows ? rows : 10 }).map((_, i) => (
          <Skeleton className={`p-2 ${lineHeight ? lineHeight : 'h-10'} w-full hover:cursor-pointer`} key={i} />
        ))}
      </div>
    </SkeletonTheme>
  );
}
