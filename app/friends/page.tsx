/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useContext, useEffect, useState } from 'react';
import { FriendsSkeleton } from '@/components';
import { getFriendList } from './functions';
import { FiUserPlus } from '@/utils/libs';
import { AddFriends } from './addFriends';
import { TokenContext } from '@/utils';
import { FriendType } from './types';
import { ChatBox } from './chatBox';
import { FriendRequestsElement } from './friendRequest';
import Image from 'next/image';

export default function Friends() {
  const [showFriendRequests, setShowFriendRequests] = useState<boolean>(false);
  const [showUsers, setShowUsers] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [userChat, setUserChat] = useState<string>();

  const [friendlist, setFriendlist] = useState<FriendType[] | null>(null);
  const [friendlistLoading, setFriendlistSetLoading] = useState<boolean>(true);
  const [friendlistFailed, setFriendlistFailed] = useState<boolean>(false);
  const { user } = useContext(TokenContext);

  useEffect(() => {
    getFriendList({ setData: setFriendlist, setLoading: setFriendlistSetLoading, setFailed: setFriendlistFailed });
  }, []);

  // useEffect(() => {
  //   const chatMessages = getMessagesHook(userChat);
  //   console.log(chatMessages);
  //   if (userChat !== -1) {
  //     api
  //       .get(`/messages/${userChat}`, config)
  //       .then((e) => setChatMessages(e.data));
  //   }
  // }, [userChat]);

  return (
    <div className="flex m-5 gap-5 h-[calc(100vh-6.5rem)]">
      <div id="friendlist" className="flex flex-col bg-third w-1/4 h-full rounded-xl p-5">
        <div
          className={`flex justify-center items-center rounded-xl p-2 mb-5 w-full ${userChat === user?.user_id ? 'bg-sixth' : 'bg-fourth'}`}
          onClick={() => setUserChat(user?.user_id)}
        >
          <h1> Your notes </h1>
        </div>
        <div className="flex items-center justify-between pb-3">
          <FriendRequestsElement setShowFriendRequests={setShowFriendRequests} showFriendRequests={showFriendRequests} data={friendlist} />
          <FiUserPlus className="text-signature text-2xl cursor-pointer" onClick={() => setShowUsers(true)} />
          {showUsers ? <AddFriends showUsers={showUsers} setShowUsers={setShowUsers} /> : null}
        </div>
        <div className="h-[93%] w-full flex flex-col gap-3 overflow-auto rounded-xl">
          {friendlistLoading ? (
            <FriendsSkeleton />
          ) : friendlist.length !== 0 ? (
            friendlist.map((friend: FriendType, i: number) => (
              <div
                key={i}
                className={`rounded-xl p-2 w-[98%] flex items-center ${friend.user_id === userChat ? 'bg-sixth' : 'bg-fourth'}`}
                onClick={() => setUserChat(friend.user_id)}
              >
                <Image className="rounded-full h-6 w-6 mr-2" src="/assets/dark_bg.jpg" alt="profile_pic" width={1920} height={1080} />
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
      <ChatBox />
    </div>
  );
}
