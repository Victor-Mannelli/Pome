/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { MdKeyboardArrowDown, User, wsRoomAndFriendType } from '@/utils';
import { deleteMessageWS, editMessageWS } from './functions';
import { useOnClickOutside } from 'usehooks-ts';
import { CustomModal, SignatureInput } from '@/components';
import { ChatMessagetype } from './types';
import { Avatar } from '@chakra-ui/react';
import { Socket } from 'socket.io-client';
import { useRef, useState } from 'react';
import Textarea from 'rc-textarea';
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
  const [editedMessage, setEditedMessage] = useState<string>(chatMessage.message);
  const [showMessageConfig, setShowMessageConfig] = useState<boolean>(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [showEditMessage, setShowEditMessage] = useState<boolean>(false);
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
        {
          // Date.now() - Number(chatMessage.created_at) < 1000 * 60 * 60 &&
          (chatMessage.author_id || chatMessage.author.id) === user.user_id && chatMessage.message !== 'Deleted Message' ? (
            <MdKeyboardArrowDown className="text-xl font-bold text-white cursor-pointer" onClick={() => setShowMessageConfig(!showMessageConfig)} />
          ) : null
        }
      </div>
      <div
        ref={messageConfigRef}
        className={`${showMessageConfig ? 'block' : 'hidden'} absolute z-10 right-2 -bottom-24 flex flex-col py-3 bg-second rounded-md`}
      >
        <p
          className="hover:bg-fourthAndAHalf w-full pl-5 pr-12 py-2 cursor-pointer"
          onClick={() => {
            // setShowMessageConfig(false);
            setShowEditMessage(true);
          }}
        >
          Edit
        </p>
        <p className="hover:bg-fourthAndAHalf w-full pl-5 pr-12 py-2 cursor-pointer" onClick={() => setShowConfirmDelete(true)}>
          Delete
        </p>
      </div>
      <CustomModal show={showConfirmDelete} setShow={setShowConfirmDelete}>
        <div className="flex flex-col gap-3 bg-fourth rounded-md cursor-default">
          <div className="flex flex-col gap-3 px-5 py-3">
            <h1> Delete Message </h1>
            <p className="text-sm text-center">
              Are you sure you want to <span className="font-bold text-signature">delete</span> this message?
            </p>
          </div>
          <div className="flex justify-end w-full h-fit rounded-b-md bg-third p-3 gap-3">
            <button
              className="text-sm px-3 py-2 text-white bg-fourthAndAHalf rounded-md hover:brightness-110 hover:shadow-[0px_0px_3px_#fff]"
              onClick={() => setShowConfirmDelete(false)}
            >
              Cancel
            </button>
            <button
              className="text-sm px-3 py-2 text-white bg-red-500 rounded-md hover:brightness-110 hover:shadow-[0px_0px_3px_#fff]"
              onClick={() => {
                setShowConfirmDelete(false);
                deleteMessageWS({ room: wsRoomAndFriend.wsRoom, message_id: chatMessage.message_id, user_id: user.user_id, socket });
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </CustomModal>
      <CustomModal show={showEditMessage} setShow={setShowEditMessage}>
        {/* <div onClick={(e) => e.stopPropagation()} className="flex flex-col gap-5 max-w-[66%] bg-fourth rounded-md cursor-default">
          <div className="flex flex-col gap-3 pt-5 px-5">
            <h1> Edit Message </h1>
          </div>
          <div className="bg-third mx-5 p-3 rounded-md">
            <p className="break-all whitespace-pre-line">{chatMessage.message}</p>
          </div>
          <div className="flex justify-end w-full h-fit rounded-b-md bg-third p-3 gap-3">
            <button
              className="text-sm px-3 py-2 text-white bg-fourthAndAHalf rounded-md hover:brightness-110 hover:shadow-[0px_0px_3px_#fff]"
              onClick={() => setShowEditMessage(false)}
            >
              Cancel
            </button>
            <button
              className="text-sm px-3 py-2 text-black bg-signature rounded-md hover:brightness-110 hover:shadow-[0px_0px_3px_#fff]"
              onClick={() => {
                setShowEditMessage(false);
                editMessageWS({
                  message_id: chatMessage.message_id,
                  room: wsRoomAndFriend.wsRoom,
                  newMessage: editedMessage,
                  user_id: user.user_id,
                  socket,
                });
              }}
            >
              Confirm
            </button>
          </div>
        </div> */}
        <div onClick={(e) => e.stopPropagation()} className="flex flex-col gap-3 bg-fourth rounded-md cursor-default">
          <div className="flex flex-col gap-5 px-5 py-3">
            <h1> Edit Message </h1>
            {/* <p className="text-sm text-center">Is this how you want your message to be?</p> */}
            <SignatureInput onChange={(e) => setEditedMessage(e.target.value)} placeholder={editedMessage} label={'New Message'} id={'newMessage'} />
          </div>
          <div className="flex justify-end w-full h-fit rounded-b-md bg-third p-3 gap-3">
            <button
              className="text-sm px-3 py-2 text-white bg-fourthAndAHalf rounded-md hover:brightness-110 hover:shadow-[0px_0px_3px_#fff]"
              onClick={() => setShowEditMessage(false)}
            >
              Cancel
            </button>
            <button
              className="text-sm px-3 py-2 text-black bg-signature rounded-md hover:brightness-110 hover:shadow-[0px_0px_3px_#fff]"
              onClick={() => {
                setShowEditMessage(false);
                editMessageWS({
                  message_id: chatMessage.message_id,
                  room: wsRoomAndFriend.wsRoom,
                  newMessage: editedMessage,
                  user_id: user.user_id,
                  socket,
                });
              }}
            >
              Edit
            </button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
}
