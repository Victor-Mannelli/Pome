'use client';

import { deleteFriendRequestWS, sendFriendRequestToWS } from './functions';
import { FiUserPlus, RiArrowLeftDoubleFill, RxCross2 } from '@/utils/libs';
import { GenericRowSkeleton, ErrorFeedback, Filter } from '@/components';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { FriendType, StrangersAndFRsType } from './types';
import { Avatar, CloseButton } from '@chakra-ui/react';
import { useOnClickOutside } from 'usehooks-ts';
import { bufferToBase64, User } from '@/utils';
import { Socket } from 'socket.io-client';
import React from 'react';

export function SendFrs({
  setStrangersAndFRsFailed,
  strangersAndFRsLoading,
  strangersAndFRsFailed,
  strangersAndFRs,
  refreshFunction,
  setShowUsers,
  showUsers,
  socket,
  user,
}: {
  setStrangersAndFRsFailed: Dispatch<SetStateAction<boolean>>;
  setShowUsers: Dispatch<SetStateAction<boolean>>;
  strangersAndFRs: StrangersAndFRsType;
  strangersAndFRsLoading: boolean;
  strangersAndFRsFailed: boolean;
  refreshFunction: () => void;
  showUsers: boolean;
  socket: Socket;
  user: User;
}) {
  const [addFriendFilter, setAddFriendFilter] = useState<string>('');
  const strangersList = strangersAndFRs?.strangers.filter((e: FriendType, i: number) => e.username.toLowerCase().includes(addFriendFilter) && i < 10);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setShowUsers(false));

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center z-50 h-screen w-full pt-24 sm:p-0">
      <div
        className="relative lg:w-[60rem] md:w-[70%] w-full md:h-[70%] h-screen bg-second md:rounded-xl md:border border-sixth flex flex-col items-center gap-3 p-5"
        onClick={(e) => e.stopPropagation()}
        ref={ref}
      >
        <RxCross2
          className="absolute right-4 top-4 sm:block hidden text-white text-3xl cursor-pointer hover:text-sixth"
          onClick={() => setShowUsers(!showUsers)}
        />
        <RiArrowLeftDoubleFill className="absolute left-2 top-4 sm:hidden block text-white text-3xl" onClick={() => setShowUsers(!showUsers)} />
        <h1> Send a Friend Request! </h1>
        <Filter onChange={(e) => setAddFriendFilter(e.target.value)} />
        <div className="flex flex-col gap-3 w-full overflow-auto">
          {strangersAndFRsLoading ? (
            <GenericRowSkeleton />
          ) : strangersAndFRsFailed ? (
            <ErrorFeedback loading={strangersAndFRsLoading} setFailed={setStrangersAndFRsFailed} animeApi={false} refreshFunction={refreshFunction} />
          ) : strangersList.length > 0 ? (
            strangersList.map((stranger: FriendType) => {
              // console.log(strangersList);
              const requestSent = strangersAndFRs.friendRequests.find((friendRequest) => friendRequest?.requested_id === stranger.user_id);
              return (
                <div
                  key={stranger.user_id}
                  className={`flex items-center justify-between p-2 w-full bg-fifth rounded-xl ${requestSent ? '' : 'hover:cursor-pointer hover:bg-sixth'}`}
                  onClick={() => (requestSent ? null : sendFriendRequestToWS({ stranger_id: stranger.user_id, socket, user }))}
                >
                  <div className="flex items-center">
                    <Avatar
                      src={stranger.avatar ? `data:image/png;base64, ${bufferToBase64(stranger.avatar?.data)}` : null}
                      className="rounded-full mr-2"
                      size="sm"
                    />
                    <h1> {stranger.username} </h1>
                  </div>
                  <div className="flex items-center gap-3 h-7">
                    {requestSent ? (
                      <div className="flex items-center">
                        <h3 className="text-signature pr-2"> Friend Request Sent </h3>
                        <CloseButton
                          className="text-white"
                          onClick={() => {
                            deleteFriendRequestWS({
                              friendRequestId: requestSent.friend_request_id,
                              stranger_id: stranger.user_id,
                              userId: user.user_id,
                              socket,
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
