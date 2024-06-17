/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-constant-condition */
'use client';

import { AddFriendsSkeleton, ChatBoxSkeleton, ErrorFeedback, GenericRowSkeleton } from '@/components';
import React, { useContext, useEffect, useState } from 'react';
import { getFriendList } from './functions';
import { FiUserPlus } from '@/utils/libs';
import { SendFrs } from './sendFrs';
import { Avatar } from '@chakra-ui/react';
import { TokenContext } from '@/utils';
import { FriendShip } from './types';
import { ChatBox } from './chatBox';
import { FriendShipAndFriendRequests } from './friendshipAndFrs';

export default function Friends() {
  const [showFriendRequests, setShowFriendRequests] = useState<boolean>(false);
  const [friendlistLoading, setFriendlistSetLoading] = useState<boolean>(true);
  const [friendlistFailed, setFriendlistFailed] = useState<boolean>(false);
  const [friendlist, setFriendlist] = useState<FriendShip[]>([]);
  const [showUsers, setShowUsers] = useState<boolean>(false);
  const [wsRoom, setWsRoom] = useState<string>('');
  const { user } = useContext(TokenContext);

  useEffect(() => {
    getFriendList({ setData: setFriendlist, setLoading: setFriendlistSetLoading, setFailed: setFriendlistFailed });
  }, []);

  useEffect(() => {
    if (user) setWsRoom(user.user_id);
  }, [user]);

  return (
    <div className="flex m-5 gap-5 h-[calc(100vh-6rem)]">
      <div id="friendlist" className="flex flex-col bg-third w-1/4 h-full rounded-xl p-5 gap-5">
        <div
          className={`flex justify-center items-center rounded-xl p-2 w-full ${wsRoom === user?.user_id ? 'bg-sixth' : 'bg-fourth'}`}
          onClick={() => setWsRoom(user?.user_id)}
        >
          <h1> Your notes </h1>
        </div>
        {!user ? (
          <div className="flex items-center justify-between">
            <h1 className="font-bold"> Friends </h1>
            <FiUserPlus className="text-signature text-2xl cursor-pointer" />
          </div>
        ) : (
          <FriendShipAndFriendRequests user={user} />
        )}
        <div className="h-[93%] w-full flex flex-col gap-3 overflow-auto rounded-xl">
          {friendlistLoading ? (
            <GenericRowSkeleton />
          ) : friendlistFailed ? (
            <div className="flex items-center h-1/2">
              <ErrorFeedback
                refreshFunction={() => getFriendList({ setData: setFriendlist, setLoading: setFriendlistSetLoading, setFailed: setFriendlistFailed })}
                loading={friendlistLoading}
                animeApi={false}
              />
            </div>
          ) : friendlist.length !== 0 ? (
            friendlist.map((friend: FriendShip, i: number) => (
              <div
                key={i}
                className={`flex items-center rounded-xl p-2 w-full ${friend.friendship_id === wsRoom ? 'bg-sixth' : 'bg-fourth'}`}
                onClick={() => setWsRoom(friend.friendship_id)}
              >
                <Avatar className="rounded-full mr-3" size="sm" src={friend.avatar ? friend.avatar : null} />
                <h1> {friend.username} </h1>
              </div>
            ))
          ) : (
            <div className="flex flex-col justify-center h-1/2 text-white text-center">
              <p> It looks a little empty, just like your kokoro :D </p>
              <br />
              <div className="flex text-md flex-wrap justify-center items-center">
                <p> Add some friends at the </p>
                <FiUserPlus className="mx-2 text-lg text-signature" />
                <p> button above! </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {wsRoom == '' ? <ChatBoxSkeleton /> : <ChatBox wsRoom={wsRoom} user={user} />}
    </div>
  );
}
