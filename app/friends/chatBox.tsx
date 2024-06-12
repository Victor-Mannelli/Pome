'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import Textarea, { TextAreaRef } from 'rc-textarea';
import { GenericRowSkeleton } from '@/components';
import { Socket, io } from 'socket.io-client';
import { ChatMessagetype } from './types';
import { getMessages } from './functions';
import { TokenContext } from '@/utils';
import { v4 as uuidv4 } from 'uuid';
import { Message } from './message';

export function ChatBox({ userChat, userId }: { userChat: string; userId: string }) {
  const [chatMessages, setChatMessages] = useState<ChatMessagetype[]>([]);
  const [chatLoading, setChatLoading] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket>();
  const [message, setMessage] = useState('');
  const textArea = useRef<TextAreaRef>(null);
  const { user } = useContext(TokenContext);

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
    socket?.on('message', (chatMessage) => {
      setChatMessages([...chatMessages, chatMessage]);
    });

    return () => {
      socket?.off('message', (chatMessage) => {
        setChatMessages([...chatMessages, chatMessage]);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim() !== '') {
        if (userId === userChat) {
          socket?.emit('message', {
            message_id: uuidv4(),
            message,
            author_id: user.user_id,
            author: {
              username: user.username,
              avatar: user.avatar,
            },
            receiver_id: user.user_id,
            created_at: Date.now().toString(),
          });
        } else {
          socket?.emit('message', {
            message_id: uuidv4(),
            message,
            author_id: user.user_id,
            author: {
              username: user.username,
              avatar: user.avatar,
            },
            receiver_id: userChat,
            created_at: Date.now().toString(),
          });
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
