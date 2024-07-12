'use client';

import { bufferToBase64, RiArrowLeftDoubleFill, User } from '@/utils';
import { ChatMessagetype, FriendShip } from './types';
import { useEffect, useRef, useState } from 'react';
import Textarea, { TextAreaRef } from 'rc-textarea';
import { GenericRowSkeleton, Link } from '@/components';
import { sendMessageToWS } from './functions';
import { Socket, io } from 'socket.io-client';
import { Avatar } from '@chakra-ui/react';
import { Message } from './message';
import React from 'react';

export function ChatBox({
  wsRoomAndFriend,
  clearRoomId,
  user,
}: {
  wsRoomAndFriend: { wsRoom: string; friend_id: string; friend: FriendShip };
  clearRoomId: () => void;
  user: User;
}) {
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
    socket?.emit('joinRoom', { room: wsRoomAndFriend.wsRoom, user_id: user.user_id });

    return () => {
      socket?.emit('leaveRoom', wsRoomAndFriend.wsRoom);
    };
  }, [socket, wsRoomAndFriend, user]);

  useEffect(() => {
    socket?.on('joinedRoom', (response) => {
      setChatMessages(response.storedMessages);
      setChatLoading(false);
    });

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
    <div
      id="chat"
      className={`${!wsRoomAndFriend?.friend ? 'hidden sm:flex' : 'flex'} flex-col justify-between sm:w-3/4 w-full h-full bg-third sm:rounded-xl`}
    >
      <div className="w-full flex flex-col gap-1 overflow-auto rounded-md">
        {wsRoomAndFriend.friend ? (
          <div className="sm:hidden flex items-center gap-1 py-2 pl-1" style={{ boxShadow: 'rgba(85, 89, 94, 1) 0px 7px 7px -4px' }}>
            <RiArrowLeftDoubleFill className="text-white text-2xl" onClick={() => clearRoomId()} />
            <Link href={`/profile/${wsRoomAndFriend.friend.user_id}`}>
              <div className="flex items-center gap-1">
                <Avatar className="mr-1" size={'sm'} src={`data:image/png;base64, ${bufferToBase64(wsRoomAndFriend.friend.avatar?.data)}`} />
                <h1> {wsRoomAndFriend.friend.username}</h1>
              </div>
            </Link>
          </div>
        ) : null}
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
      <div className="relative w-full bg-third rounded-md px-4 py-3">
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
