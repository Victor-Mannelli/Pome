'use client';

import { StrangersAndFRsType, StrangersListType } from './types';
import { Dispatch, SetStateAction, useMemo, useRef, useState } from 'react';
import { deleteFriendRequestWS, sendFriendRequestToWS } from './functions';
import { FiUserPlus, RiArrowLeftDoubleFill, RxCross2 } from '@/utils/libs';
import { GenericRowSkeleton, ErrorFeedback, Filter } from '@/components';
import { Avatar, CloseButton } from '@chakra-ui/react';
import { useOnClickOutside } from 'usehooks-ts';
import { bufferToBase64, User } from '@/utils';
import { Socket } from 'socket.io-client';
import React from 'react';

export function SendFrs({
  strangersAndFRsLoading,
  strangersAndFRsFailed,
  strangersAndFRs,
  refreshFunction,
  setShowUsers,
  showUsers,
  socket,
  user,
}: {
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
  const ref = useRef(null);
  useOnClickOutside(ref, () => setShowUsers(false));

  const strangersList: StrangersListType[] = useMemo(() => {
    if (!strangersAndFRs?.strangers) return [];

    return strangersAndFRs.strangers
      .reduce<StrangersListType[]>((acc, stranger) => {
        if (stranger.user_id !== user.user_id && stranger.username.toLowerCase().includes(addFriendFilter)) {
          const request = strangersAndFRs.friendRequests.find(
            (friendRequest) => friendRequest?.requester.user_id === user.user_id || friendRequest?.requested_id === user.user_id,
          );

          acc.push({
            ...stranger,
            request_id: request?.friend_request_id,
            requestSent: request?.requested_id === stranger.user_id || false,
            requestReceived: request?.requester.user_id === stranger.user_id || false,
          });
        }
        return acc;
      }, [])
      .slice(0, 10);
  }, [addFriendFilter, strangersAndFRs, user]);

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
            <ErrorFeedback loading={strangersAndFRsLoading} animeApi={false} refreshFunction={refreshFunction} />
          ) : strangersList.length > 0 ? (
            strangersList.map((stranger) => {
              return (
                <div
                  key={stranger.user_id}
                  className={`flex items-center justify-between p-2 w-full bg-fifth rounded-xl ${stranger.requestSent ? '' : 'hover:cursor-pointer hover:bg-sixth'}`}
                  onClick={() => (stranger.requestSent ? null : sendFriendRequestToWS({ stranger_id: stranger.user_id, socket, user }))}
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
                    {stranger.requestSent || stranger.requestReceived ? (
                      <div className="flex items-center">
                        <h3 className="text-signature pr-2"> {stranger.requestSent ? 'Friend Request Sent' : 'Friend Request Received'}</h3>
                        <CloseButton
                          className="text-white"
                          onClick={() => {
                            deleteFriendRequestWS({
                              friendRequestId: stranger.request_id,
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
