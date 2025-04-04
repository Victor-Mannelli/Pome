'use client';

import { TokenContext, useGetFriendList, wsRoomAndFriendType } from '@/utils';
import { ErrorFeedback, GenericRowSkeleton } from '@/components';
import { FriendShipAndFriendRequests } from './friendshipAndFrs';
import { FriendElement } from './friendElement';
import { useContext, useState } from 'react';
import { FiUserPlus } from '@/utils/libs';
import { FriendShip } from './types';
import { ChatBox } from './chatBox';
import React from 'react';

export default function Friends() {
  const { data: friendlist, isError: friendlistFailed, isLoading: friendlistLoading, refetch: friendListRefetch } = useGetFriendList();
  const [wsRoomAndFriend, setWsRoomAndFriend] = useState<wsRoomAndFriendType>({
    friend_id: null,
    friend: null,
    wsRoom: null,
  });
  const { user } = useContext(TokenContext);
  // console.log(wsRoomAndFriend);
  // console.log(wsRoomAndFriend?.wsRoom);
  // console.log(wsRoomAndFriend.friend, 'wsRoomAndFriend: ' + wsRoomAndFriend.friend_id);

  return (
    <div className="flex sm:m-5 gap-5 sm:h-[calc(100vh-6rem)] h-[calc(100vh-3.5rem)]">
      <div
        id="friendlist"
        className={`${wsRoomAndFriend?.wsRoom ? 'hidden sm:flex' : 'flex'} flex-col bg-third w-full sm:w-1/4 h-full sm:rounded-xl p-5 gap-5`}
      >
        <div
          className={`flex justify-center items-center rounded-xl p-2 w-full cursor-pointer ${wsRoomAndFriend?.wsRoom === user?.user_id ? 'bg-sixth' : 'bg-fourth'}`}
          onClick={() => setWsRoomAndFriend({ wsRoom: user?.user_id, friend_id: user?.user_id, friend: null })}
        >
          <h1 className="cursor-pointer"> Your notes </h1>
        </div>
        {!user ? (
          <div className="flex items-center justify-between">
            <h1 className="font-bold"> Friends </h1>
            <FiUserPlus className="text-signature text-2xl cursor-pointer" />
          </div>
        ) : (
          <FriendShipAndFriendRequests />
        )}
        <div className="h-[93%] w-full flex flex-col gap-3 overflow-auto rounded-xl">
          {friendlistLoading ? (
            <GenericRowSkeleton />
          ) : friendlistFailed ? (
            <div className="flex items-center h-1/2">
              <ErrorFeedback refreshFunction={() => friendListRefetch()} loading={friendlistLoading} animeApi={false} />
            </div>
          ) : friendlist.length !== 0 ? (
            friendlist.map((friend: FriendShip, i: number) => (
              <FriendElement
                key={i}
                setWsRoomAndFriend={setWsRoomAndFriend}
                refreshFL={() => friendListRefetch()}
                wsRoomAndFriend={wsRoomAndFriend}
                friend={friend}
              />
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
      {!wsRoomAndFriend.wsRoom || !user ? (
        <div
          className={`${wsRoomAndFriend?.wsRoom ? 'flex' : 'hidden sm:flex'} flex-col justify-center items-center gap-3 sm:w-3/4 w-full h-full bg-third sm:rounded-xl`}
        >
          <h1 className="text-2xl"> PoMe Chat </h1>
          <p> Select a friend or your notes on the left! </p>
        </div>
      ) : (
        <ChatBox
          clearRoomId={() => setWsRoomAndFriend((prevState) => ({ ...prevState, wsRoom: null }))}
          wsRoomAndFriend={wsRoomAndFriend}
          user={user}
        />
      )}
    </div>
  );
}
