/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { MdKeyboardArrowDown, User } from '@/utils';
import { deleteMessage } from './functions';
import { Avatar } from '@chakra-ui/react';
import React from 'react';

export function Message({
  timestamp,
  messageId,
  username,
  sameUser,
  message,
  avatar,
  index,
  user,
  id,
}: {
  messageId: number;
  timestamp: string;
  sameUser: boolean;
  username: string;
  message: string;
  avatar: string;
  index: number;
  user: User;
  id: string;
}) {
  const myDate = new Date(Number(timestamp));
  const month = myDate.getMonth() + 1;
  const day = myDate.getDate();
  const year = myDate.getFullYear();
  const hours = myDate.getHours();
  const minutes = myDate.getMinutes().toString().padStart(2, '0');
  const meridiem = hours >= 12 ? 'PM' : 'AM';
  return (
    <div
      id={id}
      className={`flex flex-col pl-3 w-4/5 text-sixth bg-fourth rounded-md
        ${username === user.username ? 'ml-auto' : ''}
        ${sameUser || index === 0 ? '' : 'mt-2'}
      `}
    >
      {!sameUser ? (
        <div className={`flex ${username === user.username ? 'flex-row-reverse' : ''} items-center justify-between py-2 pr-3`}>
          <div className={`flex ${username === user.username ? 'flex-row-reverse' : ''} items-center gap-3`}>
            <Avatar className="rounded-full" size="sm" src={avatar ? `data:image/png;base64, ${avatar}` : null} />
            <h1 className="font-bold"> {username} </h1>
          </div>
          <div className="flex items-center gap-3">
            <h3 className="text-sm">
              {month}/{day}/{year} {Number(hours) > 12 ? Number(hours) - 12 : hours}:{minutes} {meridiem}
            </h3>
          </div>
        </div>
      ) : null}
      <div className="flex justify-between gap-2 py-1 pr-2">
        <p className="break-all whitespace-pre-line"> {message} </p>
        {/* {Date.now() - Number(timestamp) < 3600000 ? ( */}
        <MdKeyboardArrowDown
          className="text-xl font-bold text-white cursor-pointer"
          // onClick={() => deleteMessageWS({ id: messageId })}
        />
        {/* ) : null} */}
      </div>
    </div>
  );
}
