'use client';

import { queryClient, TokenContext, useGetStrangersAndFRs } from '@/utils';
import { FaUserFriends, FiUserPlus } from '@/utils/libs';
import { useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { ReceivedFrs } from './receivedFrs';
import { FriendRequests } from './types';
import { SendFrs } from './sendFrs';
import React from 'react';

export function FriendShipAndFriendRequests() {
  const { data: strangersAndFRs, isLoading: strangersAndFRsLoading, isError: strangersAndFRsFailed, refetch } = useGetStrangersAndFRs();
  const [showFriendRequests, setShowFriendRequests] = useState<boolean>(false);
  const [showUsers, setShowUsers] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket>();
  const { user } = useContext(TokenContext);

  useEffect(() => {
    // getStrangersAndFRs({ setData: setStrangersAndFRs, setLoading: setStrangersAndFRsLoading, setFailed: setStrangersAndFRsFailed });

    const socketInstance = io(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/friendRequest`);
    setSocket(socketInstance);
  }, []);

  useEffect(() => {
    socket?.emit('joinFrRoom', user.user_id);
    // console.log('conected?');
    return () => {
      socket?.emit('leaveFrRoom', user.user_id);
    };
  }, [socket, user]);

  useEffect(() => {
    socket?.on('friendRequest', (response) => {
      console.log(response, 'friendRequest');
      refetch();
      // setStrangersAndFRs((prevState) => ({
      //   ...prevState,
      //   friendRequests: [...prevState.friendRequests, response.friendRequest],
      // }));
      // console.log(response.friendRequest, 'friendRequest');
    });

    socket?.on('deleteFR', (response) => {
      console.log(response, 'deleteFR');
      refetch();
      // setStrangersAndFRs((prevState) => ({
      //   ...prevState,
      //   friendRequests: prevState.friendRequests.filter((FR) => FR.friend_request_id !== response.deletedFR.friend_request_id),
      // }));
    });

    socket?.on('acceptFR', () => {
      queryClient.invalidateQueries({ queryKey: ['friendlist'] });
    });
  }, [refetch, socket]);

  const receivedFR = strangersAndFRs?.friendRequests.filter((e: FriendRequests) => e?.requested_id === user.user_id);

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
        {receivedFR?.length > 0 ? (
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
          strangersAndFRsLoading={strangersAndFRsLoading}
          strangersAndFRsFailed={strangersAndFRsFailed}
          strangersAndFRs={strangersAndFRs}
          refreshFunction={() => refetch()}
          setShowUsers={setShowUsers}
          showUsers={showUsers}
          socket={socket}
          user={user}
        />
      ) : null}
    </div>
  );
}
