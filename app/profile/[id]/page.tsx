'use client';

import { AnimeData, FilterType, TokenContext, UsersAnimeData, getAnimelistQuery, ProfilePageSlugObject } from '@/utils';
import { applyUnderscoreFilter, getUserProfileById, getUsersAnimelist, sortFunction } from './functions';
import { FaSort, FaSortAmountDown, FaSortAmountUpAlt } from '@/utils/libs';
import { AnimeFilter, ProfileSkeleton } from '@/components';
import { bufferToBase64, logout } from '@/utils/functions';
import { useContext, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Avatar, useToast } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { AnimeRow } from './animeRow';
import _ from 'underscore';
import React from 'react';

export default function Profile() {
  const [profileData, setProfileData] = useState<ProfilePageSlugObject | null>(null);
  const [profileDataFailed, setProfileDataFailed] = useState<boolean>(false);
  const [profileDataLoad, setProfileDataLoad] = useState<boolean>(true);
  const [sortScore, setSortScore] = useState<'up' | 'down' | 'none'>('none');
  const { user, setToken, setUser } = useContext(TokenContext);
  const [filter, setFilter] = useState<FilterType>({
    search: null,
    status: null,
    genres: null,
    year: null,
  });
  const { loading, error, data } = useQuery<AnimeData>(getAnimelistQuery, {
    variables: {
      quantity: profileData ? profileData?.usersAnimelist?.length : 0,
      id_in: profileData ? profileData?.usersAnimelist?.map((anime: UsersAnimeData) => anime.anime_id) : [],
    },
  });
  const { id } = useParams();
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (user?.user_id === id) {
      getUsersAnimelist({ setData: setProfileData, setLoading: setProfileDataLoad, setFailed: setProfileDataFailed });
    } else {
      getUserProfileById({ setData: setProfileData, setLoading: setProfileDataLoad, setFailed: setProfileDataFailed, userId: id });
    }
  }, [user, id]);

  const filteredAnimelist = _.filter(profileData?.usersAnimelist, (item: UsersAnimeData) => data && applyUnderscoreFilter(data, item, filter));
  const animelist = _.sortBy(filteredAnimelist, (item) => sortFunction(item, sortScore, data));
  const userProfile = user?.user_id === id;

  if (profileDataFailed || error) {
    logout({ setToken, setUser, toast });
    router.push('/');
  }

  return profileDataLoad || loading || !profileData ? (
    <ProfileSkeleton />
  ) : profileData ? (
    <div className="flex flex-col items-center">
      <div
        className={'flex items-end w-full h-60 bg-cover'}
        style={
          userProfile
            ? user?.banner
              ? { backgroundImage: `url('data:image/png;base64, ${bufferToBase64(user?.banner)}')` }
              : { backgroundColor: '#1e1e1e' }
            : profileData.banner
              ? { backgroundImage: `url('data:image/png;base64, ${bufferToBase64(profileData.banner?.data)}')` }
              : { backgroundColor: '#1e1e1e' }
        }
      >
        <div className="flex justify-end w-1/4">
          <Avatar
            borderRadius={2}
            h={160}
            w={137}
            className="cursor-pointer"
            src={user ? `data:image/png;base64, ${bufferToBase64(userProfile ? user.avatar : profileData.avatar.data)}` : null}
          />
        </div>
        <h1 className="w-3/4 pl-7 pb-3 text-2xl">
          {userProfile
            ? user?.username?.[0]?.toUpperCase() + user?.username?.slice(1)
            : profileData?.username?.[0]?.toUpperCase() + profileData?.username?.slice(1)}
        </h1>
      </div>
      <div className="flex flex-col gap-[0.3rem] xl:w-[62.6rem] lg:w-[52rem] md:w-[41.4rem] sm:w-[30.8rem]">
        <AnimeFilter setFilter={setFilter} showFollowedAnime={true} filter={filter} />
        <div className="grid grid-cols-[6%_58.72%_11%_11%_13.28%] w-full p-3">
          <h3 className="text-center break-all font-bold"> Title </h3>
          <div></div>
          <div
            className="flex items-center justify-center gap-1 cursor-pointer [&>*]:cursor-pointer [&>h3]:hover:text-signature"
            onClick={() => setSortScore((prevState) => (prevState === 'none' ? 'up' : prevState === 'up' ? 'down' : 'none'))}
          >
            <h3 className="text-center font-bold">Score</h3>
            {sortScore === 'down' ? (
              <FaSortAmountUpAlt className="text-white" />
            ) : sortScore === 'up' ? (
              <FaSortAmountDown className="text-white" />
            ) : (
              <FaSort className="text-white" />
            )}
          </div>
          <h3 className="text-center font-bold"> Progress </h3>
          <h3 className="text-center font-bold"> Status </h3>
        </div>
        {profileData.usersAnimelist && profileData.usersAnimelist.length > 0 ? (
          animelist.map((anime: UsersAnimeData) => {
            const animeData = data.Page.media;
            return <AnimeRow key={anime.anime_id} animeData={animeData} anime={anime} />;
          })
        ) : (
          <div className="w-full h-fit p-5 rounded-md bg-third">
            <p className="text-center">
              You are not following any anime yet <br /> open their pages and start following!
            </p>
          </div>
        )}
      </div>
    </div>
  ) : null;
}
