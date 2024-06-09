/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Textarea, { TextAreaRef } from 'rc-textarea';
import { FriendsSkeleton } from '@/components';
import { getFriendList } from './functions';
import { FiUserPlus } from '@/utils/libs';
import { AddFriends } from './addFriends';
import { FriendType } from './types';
import { Message } from './message';

export default function Friends() {
  const [showFriendRequests, setShowFriendRequests] = useState<boolean>(false);
  const [showUsers, setShowUsers] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [userChat, setUserChat] = useState<number>();
  const textArea = useRef<TextAreaRef>(null);

  const [friendlist, setFriendlist] = useState<FriendType[] | null>(null);
  const [friendlistLoading, setFriendlistSetLoading] = useState<boolean>(true);
  const [friendlistFailed, setFriendlistFailed] = useState<boolean>(false);

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
          // ${userChat === data.userData.user_id ? 'bg-sixth' : 'bg-fourth'}
          className={`flex justify-center items-center rounded-xl p-2 mb-5 w-full
          `}
          // onClick={() => setUserChat(data.userData.user_id)}
        >
          <h1> Your notes </h1>
        </div>
        <div className="flex items-center justify-between pb-3">
          {/* <FriendRequestsElement setShowFriendRequests={setShowFriendRequests} showFriendRequests={showFriendRequests} data={friendlist} /> */}
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
                <img className="rounded-full h-6 w-6 mr-2" src="/assets/dark_bg.jpg" alt="profile_pic" />
                <h1> {friend.username} </h1>
              </div>
            ))
          ) : (
            <div className="flex flex-col text-white pt-10">
              <h3> It looks a little empty, just like you on the inside :D </h3>
              <br />
              <h3> Add some friends at the green button above!</h3>
            </div>
          )}
        </div>
      </div>
      <div id="chat" className="bg-third w-3/4 h-full rounded-xl p-5 pb-3 flex flex-col justify-between">
        <div className="w-full flex flex-col gap-3 overflow-auto rounded-md">
          {chatMessages.map((e, i: number) => (
            <Message
              id={i === chatMessages.length - 1 ? 'last' : ''}
              key={e.message_id}
              // profile_picture={e.profile_picture}
              username={e.author.username}
              timestamp={new Date(e.created_at)}
              message={e.message}
            />
          ))}
        </div>
        <div className="relative w-full bg-third rounded-md pt-5">
          <Textarea
            ref={textArea}
            onPressEnter={(e) => {
              const target = e.target as HTMLTextAreaElement;
              if (target.value !== '') {
                // sendMessages({ message: e.target.value, userChat });
                console.log(target.value);
              }
            }}
            autoSize={true}
            placeholder="Message"
            className="w-full outline-none border-none bg-fifth placeholder:text-white text-white rounded-lg pl-4 pr-9 py-3 resize-none"
          />
        </div>
      </div>
    </div>
  );
}
