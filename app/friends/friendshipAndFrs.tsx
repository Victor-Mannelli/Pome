'use client';

import { getStrangersAndFRs } from './functions';
import { FriendRequests, StrangersAndFRsType } from './types';
import { io, Socket } from 'socket.io-client';
import { FaUserFriends } from '@/utils/libs';
import { FiUserPlus } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { ReceivedFrs } from './receivedFrs';
import { SendFrs } from './sendFrs';
import { User } from '@/utils';

export function FriendShipAndFriendRequests({ user }: { user: User }) {
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

    return () => {
      socket?.off('friendRequest', () => {
        socket?.emit('leaveFrRoom', user.user_id);
      });
    };
  }, [socket, user]);

  if (strangersAndFRsLoading) return;
  const receivedFR = strangersAndFRs.friendRequests.filter((e: FriendRequests) => e.requested_id === user.user_id);

  //! maybe refactor strangersAndFRs to also send the only received FRS array

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
      {showFriendRequests ? <ReceivedFrs friendRequests={receivedFR} setShowFriendRequests={setShowFriendRequests} /> : null}
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
          setStrangersAndFRs={setStrangersAndFRs}
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
