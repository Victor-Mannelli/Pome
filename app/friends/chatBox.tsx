'use client';

import React, { useEffect, useRef, useState } from 'react';
import Textarea, { TextAreaRef } from 'rc-textarea';
import { GenericRowSkeleton } from '@/components';
import { sendMessageToWS } from './functions';
import { Socket, io } from 'socket.io-client';
import { ChatMessagetype } from './types';
import { Message } from './message';
import { User } from '@/utils';

export function ChatBox({ wsRoomAndFriendId, user }: { wsRoomAndFriendId: { wsRoom: string; friend_id: string }; user: User }) {
  const [chatMessages, setChatMessages] = useState<ChatMessagetype[]>([]);
  const [chatLoading, setChatLoading] = useState<boolean>(true);
  const [socket, setSocket] = useState<Socket>();
  const [message, setMessage] = useState('');
  const textArea = useRef<TextAreaRef>(null);

  useEffect(() => {
    const socketInstance = io(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/messages`);
    setSocket(socketInstance);
  }, [setSocket]);

  useEffect(() => {
    socket?.emit('joinRoom', { room: wsRoomAndFriendId.wsRoom, user_id: user.user_id });

    return () => {
      socket?.emit('leaveRoom', wsRoomAndFriendId.wsRoom);
    };
  }, [socket, wsRoomAndFriendId, user]);

  useEffect(() => {
    socket?.on('joinedRoom', (response) => {
      setChatMessages(response.storedMessages);
      setChatLoading(false);
    });
  }, [socket]);

  useEffect(() => {
    socket?.on('message', (chatMessage) => {
      setChatMessages((prevState) => [...prevState, chatMessage.message]);
    });

    return () => {
      socket?.off('message', (chatMessage) => {
        setChatMessages((prevState) => [...prevState, chatMessage.message]);
      });
    };
  }, [socket]);

  useEffect(() => {
    document.getElementById('last')?.scrollIntoView(false);
  }, [chatMessages]);

  return (
    <div id="chat" className="bg-third w-3/4 h-full rounded-xl py-5 pl-5 flex flex-col justify-between">
      <div className="w-full flex flex-col gap-1 overflow-auto rounded-md pr-5">
        {chatLoading ? (
          <GenericRowSkeleton rows={13} lineHeight="h-[2.9rem]" />
        ) : (
          chatMessages.map((e, i: number) => (
            <Message
              sameUser={i > 0 ? (chatMessages[i - 1].author.username === chatMessages[i].author.username ? true : false) : false}
              id={i === chatMessages.length - 1 ? 'last' : e.message_id.toString()}
              username={e.author.username}
              timestamp={e.created_at}
              messageId={e.message_id}
              avatar={e.author.avatar}
              message={e.message}
              key={e.message_id}
              user={user}
              index={i}
            />
          ))
        )}
      </div>
      <div className="relative w-full bg-third rounded-md pt-5 pr-5">
        <Textarea
          ref={textArea}
          onKeyDown={(event) =>
            sendMessageToWS({
              wsRoomAndFriendId,
              setMessage,
              message,
              socket,
              event,
              user,
            })
          }
          value={message}
          autoSize={true}
          placeholder="Message"
          onChange={(e) => setMessage(e.target.value)}
          className="w-[100%] outline-none border-none bg-fifth placeholder:text-white text-white rounded-lg pl-4 pr-9 py-3 min-h-12 resize-none"
        />
      </div>
    </div>
  );
}
