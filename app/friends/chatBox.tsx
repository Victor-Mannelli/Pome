'use client';

import { getMessages, sendMessageToWS } from './functions';
import React, { useEffect, useRef, useState } from 'react';
import Textarea, { TextAreaRef } from 'rc-textarea';
import { GenericRowSkeleton } from '@/components';
import { Socket, io } from 'socket.io-client';
import { ChatMessagetype } from './types';
import { Message } from './message';
import { User } from '@/utils';

export function ChatBox({ wsRoom, user }: { wsRoom: string; user: User }) {
  const [chatMessages, setChatMessages] = useState<ChatMessagetype[]>([]);
  const [chatLoading, setChatLoading] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket>();
  const [message, setMessage] = useState('');
  const textArea = useRef<TextAreaRef>(null);

  useEffect(() => {
    const socketInstance = io(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/messages`);
    setSocket(socketInstance);
  }, [setSocket]);

  useEffect(() => {
    socket?.emit('joinRoom', wsRoom);
    getMessages({ setData: setChatMessages, setLoading: setChatLoading, room_id: wsRoom });

    return () => {
      socket?.emit('leaveRoom', wsRoom);
    };
  }, [socket, wsRoom]);

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
    <div id="chat" className="bg-third w-3/4 h-full rounded-xl p-5 pb-3 flex flex-col justify-between">
      <div className="w-full flex flex-col gap-3 overflow-auto rounded-md">
        {chatLoading ? (
          <GenericRowSkeleton rows={13} lineHeight="h-[2.9rem]" />
        ) : (
          chatMessages.map((e, i: number) => (
            <Message
              id={i === chatMessages.length - 1 ? 'last' : e.message_id.toString()}
              avatar={e.author.avatar}
              timestamp={e.created_at}
              username={e.author.username}
              messageId={e.message_id}
              message={e.message}
              key={e.message_id}
              sameUser={false}
            />
          ))
        )}
      </div>
      <div className="relative w-full bg-third rounded-md pt-5">
        <Textarea
          ref={textArea}
          onKeyDown={(event) =>
            sendMessageToWS({
              setMessage,
              message,
              socket,
              wsRoom,
              event,
              user,
            })
          }
          value={message}
          autoSize={true}
          placeholder="Message"
          onChange={(e) => setMessage(e.target.value)}
          className="w-full outline-none border-none bg-fifth placeholder:text-white text-white rounded-lg pl-4 pr-9 py-3 resize-none"
        />
      </div>
    </div>
  );
}
