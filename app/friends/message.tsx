import { Avatar, CloseButton } from '@chakra-ui/react';
import { deleteMessage } from './functions';
import React from 'react';

export function Message({
  timestamp,
  messageId,
  username,
  sameUser,
  message,
  avatar,
  id,
}: {
  messageId: number;
  timestamp: string;
  sameUser: boolean;
  username: string;
  message: string;
  avatar: string;
  id?: string;
}) {
  const myDate = new Date(Number(timestamp));
  const month = myDate.getMonth() + 1;
  const day = myDate.getDate();
  const year = myDate.getFullYear();
  const hours = myDate.getHours();
  const minutes = myDate.getMinutes().toString().padStart(2, '0');
  const meridiem = hours >= 12 ? 'PM' : 'AM';
  return (
    <div id={id} className="flex flex-col p-3 gap-2 text-sixth bg-fourth rounded-md">
      {!sameUser ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="rounded-full" size="sm" src={avatar ? avatar : null} />
            <h1 className="font-bold text-lg"> {username} </h1>
          </div>
          <div className="flex items-center gap-3">
            <h3 className="text-sm">
              {month}/{day}/{year} {Number(hours) > 12 ? Number(hours) - 12 : hours}:{minutes} {meridiem}
            </h3>
            {Date.now() - Number(timestamp) < 3600000 ? (
              <CloseButton className="text-white" onClick={() => deleteMessage({ id: messageId })} />
            ) : null}
          </div>
        </div>
      ) : null}
      <p className="break-all text-lg whitespace-pre-line"> {message} </p>
    </div>
  );
}
