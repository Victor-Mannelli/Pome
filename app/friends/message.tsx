'use client';

import { MdKeyboardArrowDown, User, wsRoomAndFriendType } from '@/utils';
import { useOnClickOutside } from 'usehooks-ts';
import { deleteMessageWS } from './functions';
import { ChatMessagetype } from './types';
import { Avatar } from '@chakra-ui/react';
import { Socket } from 'socket.io-client';
import { useRef, useState } from 'react';
import React from 'react';

export function Message({
  wsRoomAndFriend,
  chatMessage,
  sameUser,
  socket,
  index,
  user,
  id,
}: {
  wsRoomAndFriend: wsRoomAndFriendType;
  chatMessage: ChatMessagetype;
  sameUser: boolean;
  socket: Socket;
  index: number;
  user: User;
  id: string;
}) {
  const [showMessageConfig, setShowMessageConfig] = useState<boolean>(false);
  const messageConfigRef = useRef<HTMLDivElement>();

  const myDate = new Date(Number(chatMessage.created_at));
  const month = myDate.getMonth() + 1;
  const day = myDate.getDate();
  const year = myDate.getFullYear();
  const hours = myDate.getHours();
  const minutes = myDate.getMinutes().toString().padStart(2, '0');
  const meridiem = hours >= 12 ? 'PM' : 'AM';

  useOnClickOutside(messageConfigRef, () => setShowMessageConfig(false));

  return (
    <div
      id={id}
      className={`relative flex flex-col pl-3 w-4/5 text-sixth bg-fourth rounded-md
        ${chatMessage.author.username === user.username ? 'ml-auto' : ''}
        ${sameUser || index === 0 ? '' : 'mt-2'}
      `}
    >
      {!sameUser ? (
        <div className={`flex ${chatMessage.author.username === user.username ? 'flex-row-reverse' : ''} items-center justify-between py-2 pr-3`}>
          <div className={`hidden sm:flex ${chatMessage.author.username === user.username ? 'flex-row-reverse' : ''} items-center gap-3`}>
            <Avatar
              size="sm"
              className="rounded-full"
              src={chatMessage.author.avatar ? `data:image/png;base64, ${chatMessage.author.avatar}` : null}
            />
            <h1 className="font-bold"> {chatMessage.author.username} </h1>
          </div>
          <div className="flex items-center gap-3">
            <h3 className="text-sm">
              {month}/{day}/{year} {Number(hours) > 12 ? Number(hours) - 12 : hours}:{minutes} {meridiem}
            </h3>
          </div>
        </div>
      ) : null}
      <div className="flex justify-between gap-2 py-1 pr-2">
        <p className={`break-all whitespace-pre-line ${chatMessage.message === 'Deleted Message' ? 'italic brightness-[65%]' : null}`}>
          {chatMessage.message}
        </p>
        {/* {Date.now() - Number(chatMessage.created_at) < 1000 * 60 * 60 ? ( */}
        <MdKeyboardArrowDown className="text-xl font-bold text-white cursor-pointer" onClick={() => setShowMessageConfig(!showMessageConfig)} />
        {/* ) : null} */}
      </div>
      <div
        ref={messageConfigRef}
        className={`${showMessageConfig ? 'block' : 'hidden'} absolute right-2 -bottom-24 flex flex-col py-3 bg-second rounded-md`}
      >
        <p
          className="hover:bg-fourthAndAHalf w-full pl-5 pr-12 py-2 cursor-pointer"
          onClick={() => {
            null;
            setShowMessageConfig(false);
          }}
        >
          Edit
        </p>
        <p
          className="hover:bg-fourthAndAHalf w-full pl-5 pr-12 py-2 cursor-pointer"
          onClick={() => {
            deleteMessageWS({ room: wsRoomAndFriend.wsRoom, message_id: chatMessage.message_id, user_id: user.user_id, socket });
            setShowMessageConfig(false);
          }}
        >
          Delete
        </p>
      </div>
    </div>
  );
}
