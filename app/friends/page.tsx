/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useContext, useEffect, useState } from 'react';
import { FriendRequestsElement } from './friendRequest';
import { ChatBoxSkeleton, GenericRowSkeleton } from '@/components';
import { FriendShip, FriendType } from './types';
import { getFriendList } from './functions';
import { FiUserPlus } from '@/utils/libs';
import { AddFriends } from './addFriends';
import { Avatar } from '@chakra-ui/react';
import { TokenContext } from '@/utils';
import { ChatBox } from './chatBox';

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
        <div className="flex items-center justify-between">
          <FriendRequestsElement setShowFriendRequests={setShowFriendRequests} showFriendRequests={showFriendRequests} data={friendlist} />
          <FiUserPlus className="text-signature text-2xl cursor-pointer" onClick={() => setShowUsers(true)} />
          {showUsers ? <AddFriends showUsers={showUsers} setShowUsers={setShowUsers} /> : null}
        </div>
        <div className="h-[93%] w-full flex flex-col gap-3 overflow-auto rounded-xl">
          {friendlistLoading ? (
            <GenericRowSkeleton />
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
            <div className="flex flex-col text-white pt-10 text-center">
              <h3> It looks a little empty, just like you on the inside :D </h3>
              <br />
              <h3> Add some friends at the green button above!</h3>
            </div>
          )}
        </div>
      </div>
      {wsRoom == '' ? <ChatBoxSkeleton /> : <ChatBox wsRoom={wsRoom} user={user} />}
    </div>
  );
}
