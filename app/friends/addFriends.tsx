'use client';

import { deleteFriendRequest, getStrangersAndFRs, sendFriendRequest } from './functions';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { GenericRowSkeleton, ErrorFeedback, Filter } from '@/components';
import { FriendType, StrangersAndFRsType } from './types';
import { FiUserPlus, RxCross2 } from '@/utils/libs';
import { useOnClickOutside } from 'usehooks-ts';
import { CloseButton } from '@chakra-ui/react';
import Image from 'next/image';

export function AddFriends({ showUsers, setShowUsers }: { setShowUsers: Dispatch<SetStateAction<boolean>>; showUsers: boolean }) {
  const [strangersAndFRsLoading, setStrangersAndFRsLoading] = useState<boolean>(true);
  const [strangersAndFRsFailed, setStrangersAndFRsFailed] = useState<boolean>(false);
  const [strangersAndFRs, setStrangersAndFRs] = useState<StrangersAndFRsType>(null);
  const [addFriendFilter, setAddFriendFilter] = useState<string>('');
  const ref = useRef(null);

  useOnClickOutside(ref, () => setShowUsers(false));
  useEffect(() => {
    getStrangersAndFRs({ setData: setStrangersAndFRs, setLoading: setStrangersAndFRsLoading, setFailed: setStrangersAndFRsFailed });
  }, []);

  const strangersList = strangersAndFRs?.strangers.filter((e: FriendType, i: number) => e.username.includes(addFriendFilter) && i < 10);

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center z-50 h-screen w-full">
      <div
        className="relative lg:w-[60rem] md:w-[70%] w-full md:h-[70%] h-screen bg-second md:rounded-xl md:border border-sixth flex flex-col items-center gap-3 p-5"
        onClick={(e) => e.stopPropagation()}
        ref={ref}
      >
        <RxCross2 className="absolute right-4 top-4 text-white text-3xl cursor-pointer hover:text-sixth" onClick={() => setShowUsers(!showUsers)} />
        <h1> Send a Friend Request! </h1>
        <Filter onChange={(e) => setAddFriendFilter(e.target.value)} />
        <div className="flex flex-col gap-3 w-full overflow-auto">
          {strangersAndFRsLoading ? (
            <GenericRowSkeleton />
          ) : strangersAndFRsFailed ? (
            <ErrorFeedback
              loading={strangersAndFRsLoading}
              setFailed={setStrangersAndFRsFailed}
              animeApi={false}
              refreshFunction={() =>
                getStrangersAndFRs({ setData: setStrangersAndFRs, setLoading: setStrangersAndFRsLoading, setFailed: setStrangersAndFRsFailed })
              }
            />
          ) : strangersList.length > 0 ? (
            strangersList.map((stranger: FriendType) => {
              const requestSent = strangersAndFRs.friendRequests.find((friendRequest) => friendRequest.requested_id === stranger.user_id);
              return (
                <div
                  key={stranger.user_id}
                  className={`flex items-center justify-between p-2 w-full bg-fifth rounded-xl ${requestSent ? '' : 'hover:cursor-pointer hover:bg-sixth'}`}
                  onClick={() => (requestSent ? null : sendFriendRequest({ friend_id: stranger.user_id, setData: setStrangersAndFRs }))}
                >
                  <div className="flex items-center">
                    <Image className="rounded-full h-6 w-6 mr-2" width={1920} height={1080} src="/assets/dark_bg.jpg" alt="profile_pic" />
                    <h1> {stranger.username} </h1>
                  </div>
                  <div className="flex items-center gap-3 h-7">
                    {requestSent ? (
                      <div className="flex items-center">
                        <h3 className="text-signature pr-2"> Friend Request Sent </h3>
                        <CloseButton
                          className="text-white"
                          onClick={() => {
                            deleteFriendRequest({
                              friendRequestId: requestSent.friend_request_id,
                              setData: setStrangersAndFRs,
                            });
                          }}
                        />
                      </div>
                    ) : (
                      <FiUserPlus className="text-white text-2xl pr-1" />
                    )}
                  </div>
                </div>
              );
            })
          ) : null}
        </div>
      </div>
    </div>
  );
}
