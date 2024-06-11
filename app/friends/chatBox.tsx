/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { getMessages, sendMessage } from './functions';
import Textarea, { TextAreaRef } from 'rc-textarea';
import { GenericRowSkeleton } from '@/components';
import { Socket, io } from 'socket.io-client';
import { ChatMessagetype } from './types';
import { Message } from './message';

export function ChatBox({ userChat, userId }: { userChat: string; userId: string }) {
  const [chatMessages, setChatMessages] = useState<ChatMessagetype[]>([]);
  const [chatLoading, setChatLoading] = useState<boolean>(true);
  const textArea = useRef<TextAreaRef>(null);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState<Socket>();

  function sendToWebsocket(message: string) {
    socket?.emit('message', message);
  }
  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL);
    setSocket(socketInstance);
  }, [setSocket]);

  useEffect(() => {
    getMessages({ setData: setChatMessages, authorId: userChat, setLoading: setChatLoading });
  }, [userChat]);

  useEffect(() => {
    document.getElementById('last')?.scrollIntoView(false);
  }, [chatMessages]);

  useEffect(() => {
    socket?.on('message', messageListener);

    return () => {
      socket?.off('message', messageListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageListener]);

  function messageListener(message: string) {
    setChatMessages([
      ...chatMessages,
      {
        message_id: 1111111,
        message,
        author: {
          username: 'cliff',
          avatar: 'string',
        },
        created_at: 'string',
      },
    ]);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim() !== '') {
        if (userId === userChat) {
          sendMessage({ message: message, authorId: userChat, setChatMessages });
        } else {
          sendMessage({ message: message, authorId: userChat });
        }
        setMessage('');
      }
    }
  }

  return (
    <div id="chat" className="bg-third w-3/4 h-full rounded-xl p-5 pb-3 flex flex-col justify-between">
      <div className="w-full flex flex-col gap-3 overflow-auto rounded-md">
        {chatLoading ? (
          <GenericRowSkeleton rows={13} lineHeight="h-[2.9rem]" />
        ) : (
          chatMessages.map((e, i: number) => (
            <Message
              id={i === chatMessages.length - 1 ? 'last' : e.message_id.toString()}
              // profile_picture={e.profile_picture}
              timestamp={new Date(e.created_at)}
              username={e.author.username}
              messageId={e.message_id}
              message={e.message}
              key={e.message_id}
            />
          ))
        )}
      </div>
      <div className="relative w-full bg-third rounded-md pt-5">
        <Textarea
          ref={textArea}
          onKeyDown={handleKeyDown}
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
