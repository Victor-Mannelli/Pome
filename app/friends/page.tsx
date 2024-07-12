/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ChatBoxSkeleton, ErrorFeedback, GenericRowSkeleton, Link } from '@/components';
import { FriendShipAndFriendRequests } from './friendshipAndFrs';
import { useContext, useEffect, useState } from 'react';
import { bufferToBase64, TokenContext } from '@/utils';
import { getFriendList } from './functions';
import { FiUserPlus } from '@/utils/libs';
import { Avatar } from '@chakra-ui/react';
import { FriendShip } from './types';
import { ChatBox } from './chatBox';
import React from 'react';

export default function Friends() {
  const [wsRoomAndFriend, setWsRoomAndFriend] = useState<{ wsRoom: string; friend_id: string; friend: any }>({
    friend_id: null,
    friend: null,
    wsRoom: null,
  });
  const [friendlistLoading, setFriendlistSetLoading] = useState<boolean>(true);
  const [friendlistFailed, setFriendlistFailed] = useState<boolean>(false);
  const [friendlist, setFriendlist] = useState<FriendShip[]>([]);
  const { user } = useContext(TokenContext);

  useEffect(() => {
    getFriendList({ setData: setFriendlist, setLoading: setFriendlistSetLoading, setFailed: setFriendlistFailed });
  }, []);

  console.log(wsRoomAndFriend);
  console.log(wsRoomAndFriend?.wsRoom);

  return (
    <div className="flex sm:m-5 gap-5 sm:h-[calc(100vh-6rem)] h-[calc(100vh-3.5rem)]">
      <div
        id="friendlist"
        className={`${wsRoomAndFriend?.wsRoom ? 'hidden sm:flex' : 'flex'} flex-col bg-third w-full sm:w-1/4 h-full sm:rounded-xl p-5 gap-5`}
      >
        <div
          className={`flex justify-center items-center rounded-xl p-2 w-full ${wsRoomAndFriend?.wsRoom === user?.user_id ? 'bg-sixth' : 'bg-fourth'}`}
          onClick={() => setWsRoomAndFriend({ wsRoom: user?.user_id, friend_id: user?.user_id, friend: null })}
        >
          <h1> Your notes </h1>
        </div>
        {!user ? (
          <div className="flex items-center justify-between">
            <h1 className="font-bold"> Friends </h1>
            <FiUserPlus className="text-signature text-2xl cursor-pointer" />
          </div>
        ) : (
          <FriendShipAndFriendRequests user={user} setFriendlist={setFriendlist} />
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
                className={`flex items-center rounded-xl p-2 w-full ${friend.friendship_id === wsRoomAndFriend?.wsRoom ? 'bg-sixth' : 'bg-fourth'}`}
                onClick={() => setWsRoomAndFriend({ wsRoom: friend.friendship_id, friend_id: friend.user_id, friend })}
              >
                <Link href={`profile/${friend.user_id}`}>
                  <Avatar
                    className="rounded-full mr-3"
                    size="sm"
                    src={friend.avatar ? `data:image/png;base64, ${bufferToBase64(friend.avatar.data)}` : null}
                  />
                </Link>
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
      {!wsRoomAndFriend || !user ? (
        <ChatBoxSkeleton wsRoomAndFriend={wsRoomAndFriend} user={user} />
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
