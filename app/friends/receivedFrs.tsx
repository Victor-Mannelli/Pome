'use client';

import { FiUserPlus, GiCakeSlice, RiArrowLeftDoubleFill, RxCross2 } from '@/utils/libs';
import { acceptFriendRequestWS, deleteFriendRequestWS } from './functions';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { Avatar } from '@chakra-ui/react';
import { Socket } from 'socket.io-client';
import { FriendRequests } from './types';
import { bufferToBase64 } from '@/utils';
import { Filter } from '@/components';

export function ReceivedFrs({
  setShowFriendRequests,
  friendRequests,
  socket,
}: {
  setShowFriendRequests: Dispatch<SetStateAction<boolean>>;
  friendRequests: FriendRequests[];
  socket: Socket;
}) {
  const [acceptFriendFilter, setAcceptFriendFilter] = useState<string>('');
  const filteredFRs = friendRequests.filter((e, i: number) => e.requester.username.toLowerCase().includes(acceptFriendFilter) && i < 10);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setShowFriendRequests(false));

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center z-50 h-screen w-full pt-24 sm:p-0">
      <div
        className="relative lg:w-[60rem] md:w-[70%] w-full md:h-[70%] h-screen bg-second md:rounded-xl md:border border-sixth flex flex-col items-center gap-3 p-5"
        onClick={(e) => e.stopPropagation()}
        ref={ref}
      >
        <RxCross2
          className="absolute right-4 top-4 sm:block hidden text-white text-3xl cursor-pointer hover:text-sixth"
          onClick={() => setShowFriendRequests((prev: boolean) => !prev)}
        />
        <RiArrowLeftDoubleFill
          className="absolute left-2 top-4 block sm:hidden text-white text-3xl"
          onClick={() => setShowFriendRequests((prev: boolean) => !prev)}
        />
        <h1> These people want to be your friend! </h1>
        <Filter onChange={(e) => setAcceptFriendFilter(e.target.value)} />
        <div className="overflow-auto w-full flex flex-col gap-3">
          {friendRequests.length === 0 ? (
            <div className="flex justify-center items-center gap-2 text-white p-2">
              <h3> Yeah, I didn&#39;t think so either, have a cake instead</h3>
              <GiCakeSlice className="text-3xl" />
            </div>
          ) : (
            filteredFRs.map((FR: FriendRequests) => {
              // console.log(typeof e?.requester.avatar);
              // console.log(FR);
              return (
                <div
                  key={FR.friend_request_id}
                  className="bg-fifth rounded-xl p-2 w-full flex items-center justify-between hover:bg-sixth hover:cursor-pointer"
                  onClick={() => {
                    acceptFriendRequestWS({
                      friendRequestId: FR.friend_request_id,
                      stranger_id: FR.requester.user_id,
                      socket,
                      userId: FR.requested_id,
                    });
                    setShowFriendRequests(false);
                  }}
                >
                  <div className="flex items-center">
                    <Avatar
                      size="sm"
                      className="rounded-full mr-2"
                      src={`data:image/png;base64, ${bufferToBase64(FR.requester?.avatar?.data)}`}
                      // src={`data:image/png;base64, ${bufferToBase64(typeof FR.requester.avatar === 'object' ? FR.requester.avatar.data : FR.requester.avatar)}`}
                    />
                    <h1 className="cursor-pointer text-lg">{FR.requester.username}</h1>
                  </div>
                  <div className="z-10 flex items-center gap-4 text-white hover:text-signature cursor-pointer">
                    <FiUserPlus className="text-[2rem] rounded-full p-1 text-signature bg-fourth" />
                    <RxCross2
                      className="text-[2rem] pr-1 text-red-500 rounded-full p-1 bg-fourth hover:bg-fourthAndAHalf"
                      onClick={(clickEvent) => {
                        clickEvent.stopPropagation();
                        deleteFriendRequestWS({
                          friendRequestId: FR.friend_request_id,
                          stranger_id: FR.requested_id,
                          userId: FR.requester.user_id,
                          socket,
                        });
                      }}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
