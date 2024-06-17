'use client';

import { FriendRequests, FriendShip, StrangersAndFRsType } from './types';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getStrangersAndFRs } from './functions';
import { io, Socket } from 'socket.io-client';
import { FaUserFriends } from '@/utils/libs';
import { ReceivedFrs } from './receivedFrs';
import { FiUserPlus } from 'react-icons/fi';
import { SendFrs } from './sendFrs';
import { User } from '@/utils';

export function FriendShipAndFriendRequests({ user, setFriendlist }: { user: User; setFriendlist: Dispatch<SetStateAction<FriendShip[]>> }) {
  const [strangersAndFRsLoading, setStrangersAndFRsLoading] = useState<boolean>(true);
  const [strangersAndFRsFailed, setStrangersAndFRsFailed] = useState<boolean>(false);
  const [strangersAndFRs, setStrangersAndFRs] = useState<StrangersAndFRsType>(null);
  const [showFriendRequests, setShowFriendRequests] = useState<boolean>(false);
  const [showUsers, setShowUsers] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    getStrangersAndFRs({ setData: setStrangersAndFRs, setLoading: setStrangersAndFRsLoading, setFailed: setStrangersAndFRsFailed });
  }, []);

  useEffect(() => {
    const socketInstance = io(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/friendRequest`);
    setSocket(socketInstance);
  }, [setSocket]);

  useEffect(() => {
    socket?.emit('joinFrRoom', user.user_id);

    return () => {
      socket?.emit('leaveFrRoom', user.user_id);
    };
  }, [socket, user]);

  useEffect(() => {
    socket?.on('friendRequest', (response) => {
      setStrangersAndFRs((prevState) => ({ ...prevState, friendRequests: [...prevState.friendRequests, response.friendRequest] }));
    });
  }, [socket]);

  useEffect(() => {
    socket?.on('deleteFR', (response) => {
      setStrangersAndFRs((prevState) => ({
        ...prevState,
        friendRequests: prevState.friendRequests.filter((FR) => FR.friend_request_id !== response.deletedFR.friend_request_id),
      }));
    });
  }, [socket]);

  useEffect(() => {
    socket?.on('acceptFR', (response) => {
      setFriendlist((prevState) => [...prevState, response.acceptedFR]);
    });
  }, [socket, setFriendlist]);

  const receivedFR = strangersAndFRs?.friendRequests.filter((e: FriendRequests) => e.requested_id === user.user_id);

  if (strangersAndFRsLoading) {
    return (
      <div className="flex items-center justify-between">
        <h1 className="font-bold"> Friends </h1>
        <FiUserPlus className="text-signature text-2xl cursor-pointer" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between">
      <div className="relative flex items-center gap-3">
        <h1 className="font-bold"> Friends </h1>
        {receivedFR.length > 0 ? (
          <>
            <FaUserFriends
              className="text-white text-2xl cursor-pointer animate-pulse"
              onClick={() => {
                setShowFriendRequests((prev) => !prev);
              }}
            />
            <p className="absolute text-white text-sm -top-2 -right-2"> {receivedFR.length} </p>
          </>
        ) : null}
      </div>
      {showFriendRequests ? <ReceivedFrs socket={socket} friendRequests={receivedFR} setShowFriendRequests={setShowFriendRequests} /> : null}
      <FiUserPlus
        className="text-signature text-2xl cursor-pointer"
        onClick={() => {
          setShowUsers(true);
        }}
      />
      {showUsers ? (
        <SendFrs
          setStrangersAndFRsFailed={setStrangersAndFRsFailed}
          strangersAndFRsLoading={strangersAndFRsLoading}
          strangersAndFRsFailed={strangersAndFRsFailed}
          strangersAndFRs={strangersAndFRs}
          setShowUsers={setShowUsers}
          showUsers={showUsers}
          socket={socket}
          user={user}
          refreshFunction={() =>
            getStrangersAndFRs({ setData: setStrangersAndFRs, setLoading: setStrangersAndFRsLoading, setFailed: setStrangersAndFRsFailed })
          }
        />
      ) : null}
    </div>
  );
}
