'use client';

import { bufferToBase64, RiArrowLeftDoubleFill, User, wsRoomAndFriendType } from '@/utils';
import { GenericRowSkeleton, Link } from '@/components';
import { useEffect, useRef, useState } from 'react';
import { sendMessageToWS } from './functions';
import { Socket, io } from 'socket.io-client';
import { ChatMessagetype } from './types';
import { TextAreaRef } from 'rc-textarea';
import { Avatar } from '@chakra-ui/react';
import { Message } from './message';
import Textarea from 'rc-textarea';
import React from 'react';

export function ChatBox({ wsRoomAndFriend, clearRoomId, user }: { wsRoomAndFriend: wsRoomAndFriendType; clearRoomId: () => void; user: User }) {
  const [chatMessages, setChatMessages] = useState<ChatMessagetype[]>([]);
  const [chatLoading, setChatLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');
  const [socket, setSocket] = useState<Socket>();
  const textArea = useRef<TextAreaRef>(null);

  useEffect(() => {
    const socketInstance = io(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/messages`);
    setSocket(socketInstance);
  }, [setSocket]);

  useEffect(() => {
    socket?.emit('joinRoom', { room: wsRoomAndFriend.wsRoom, user_id: user.user_id });

    return () => {
      socket?.emit('leaveRoom', wsRoomAndFriend.wsRoom);
    };
  }, [socket, wsRoomAndFriend, user]);

  useEffect(() => {
    socket?.on('joinedRoom', (response) => {
      setChatMessages(response);
      setChatLoading(false);
    });

    socket?.on('message', (chatMessage) => {
      setChatMessages((prevState) => [...prevState, chatMessage.message]);
    });
    return () => {
      socket?.off('message', (chatMessage) => {
        setChatMessages((prevState) => [...prevState, chatMessage.message]);
      });

      socket?.off('joinedRoom');
    };
  }, [socket]);

  useEffect(() => {
    document.getElementById('last')?.scrollIntoView(false);
  }, [chatMessages]);

  return (
    <div
      id="chat"
      className={`${wsRoomAndFriend?.wsRoom ? 'flex' : 'hidden sm:flex'} flex-col justify-between sm:w-3/4 w-full h-full bg-third sm:rounded-xl`}
    >
      <div className="flex flex-col w-full h-full overflow-auto rounded-md">
        <div id="identification" className="sm:hidden flex items-center gap-1 py-2 pl-1 mb-2 shadow-[0px_2px_7px_0px] shadow-fourth">
          <RiArrowLeftDoubleFill className="text-white text-2xl" onClick={() => clearRoomId()} />
          {wsRoomAndFriend.friend ? (
            <Link href={`/profile/${wsRoomAndFriend.friend.user_id}`}>
              <div className="flex items-center gap-1">
                <Avatar className="mr-1" size={'sm'} src={`data:image/png;base64, ${bufferToBase64(wsRoomAndFriend.friend.avatar?.data)}`} />
                <h1> {wsRoomAndFriend.friend.username}</h1>
              </div>
            </Link>
          ) : (
            <h1 className="text-center "> Your notes </h1>
          )}
        </div>
        <div className="flex flex-col gap-1 w-full h-full overflow-auto rounded-md sm:p-4 px-1">
          {chatLoading ? (
            <GenericRowSkeleton rows={13} lineHeight="h-[2.9rem]" />
          ) : (
            <>
              {chatMessages.map((message, i: number) => (
                <Message
                  sameUser={i > 0 ? (chatMessages[i - 1].author.username === chatMessages[i].author.username ? true : false) : false}
                  id={i === chatMessages.length - 1 ? 'last' : message.message_id.toString()}
                  wsRoomAndFriend={wsRoomAndFriend}
                  key={message.message_id}
                  chatMessage={message}
                  socket={socket}
                  user={user}
                  index={i}
                />
              ))}
            </>
          )}
        </div>
      </div>
      <div className="relative w-full bg-third rounded-md sm:px-4 sm:py-3 px-1 pt-3">
        <Textarea
          ref={textArea}
          onKeyDown={(event) =>
            sendMessageToWS({
              wsRoomAndFriend,
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
          className="w-full outline-none border-none bg-fifth placeholder:text-white text-white rounded-lg pl-3 pr-9 py-3 min-h-12 resize-none"
        />
      </div>
    </div>
  );
}
