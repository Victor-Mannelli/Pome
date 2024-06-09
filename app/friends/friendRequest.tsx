/* eslint-disable @typescript-eslint/no-unused-vars */
import { FriendsData, FriendAsFData, FriendAsUData, User, FriendRequests, UsersList } from './types';
import { acceptFriendRequest, getAllUsers, getFriendRequests } from './functions';
import { FaUserFriends, FiUserPlus, GiCakeSlice, RxCross2 } from '@/utils/libs';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Filter, PopUp } from '@/components';

export function FriendRequestsElement({
  setShowFriendRequests,
  showFriendRequests,
  data,
}: {
  setShowFriendRequests: Dispatch<SetStateAction<boolean>>;
  showFriendRequests: boolean;
  data: FriendsData;
}) {
  const [friendRequests, setFriendRequests] = useState<FriendRequests[]>([]);
  const [acceptFriendFilter, setAcceptFriendFilter] = useState<string>('');
  const [allUsers, setAllUsers] = useState<UsersList[]>([]);
  const [update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    getAllUsers(setAllUsers);
    getFriendRequests(setFriendRequests);
  }, [update]);

  const receivedFR = friendRequests.filter((e: FriendRequests) => e.requested_id === data.userId);
  const friends = [
    ...data.friendList.friendshipsAsUser.map((friendship: FriendAsFData) => friendship.friend),
    ...data.friendList.friendshipsAsFriend.map((friendship: FriendAsUData) => friendship.user),
  ].sort();
  console.log(friends, 'friends');

  const usersList = allUsers.filter((e: User, i: number) => {
    return [];
    // e.username.includes(acceptFriendFilter) &&
    // e.username !== data.userData.username &&
    // !friends.some((friend) => friend.username === e.username) &&
    // i < 10,
  });

  return (
    <div className="relative flex items-center gap-3">
      <h1 className="font-bold"> Friends </h1>
      {receivedFR.length > 0 ? (
        <>
          <FaUserFriends
            className="text-white text-2xl cursor-pointer animate-pulse"
            onClick={() => {
              setShowFriendRequests(!showFriendRequests);
              setUpdate(!update);
            }}
          />
          <p className="absolute text-white text-sm -top-2 -right-2"> {receivedFR.length} </p>
          <PopUp show={showFriendRequests} setShow={setShowFriendRequests}>
            <div
              className="relative lg:w-[60rem] md:w-[70%] w-full md:h-[70%] h-screen bg-second md:rounded-xl md:border border-sixth flex flex-col items-center gap-3 p-5"
              onClick={(e) => e.stopPropagation()}
            >
              <RxCross2
                className="absolute right-4 top-4 text-white text-3xl cursor-pointer hover:text-sixth"
                onClick={() => setShowFriendRequests(!showFriendRequests)}
              />
              <h1> These people want to be your friend! </h1>
              <Filter onChange={(e) => setAcceptFriendFilter(e.target.value)} />
              <div className="overflow-auto w-full flex flex-col gap-3">
                {receivedFR.length === 0 ? (
                  <div className="flex justify-center items-center gap-2 text-white pt-16">
                    <h3> Yeah, I didn&#39;t think so either, have a cake instead</h3>
                    <GiCakeSlice className="text-3xl" />
                  </div>
                ) : (
                  receivedFR.map((e: FriendRequests) => (
                    <div
                      key={e.friend_request_id}
                      className="bg-fifth rounded-xl p-2 w-full flex items-center justify-between hover:bg-sixth hover:cursor-pointer"
                      onClick={() =>
                        acceptFriendRequest({
                          friend_request_id: e.friend_request_id,
                          requested_id: e.requested_id,
                          requester_id: e.requester_id,
                        })
                      }
                    >
                      <div className="flex items-center">
                        <img className="rounded-full h-6 w-6 mr-2" src="/assets/dark_bg.jpg" alt="profile_pic" />
                        <h1 className="cursor-pointer text-2xl">{usersList.find((user) => user.user_id === e.requester_id)?.username}</h1>
                      </div>
                      <div className="flex items-center gap-3">
                        {/* {data.friendRequests.some((friendRequest) => friendRequest.requested_id === e.user_id)
                              ? <h3 className='text-signature'> Friend Request Sent </h3>
                              : null
                            } */}
                        <FiUserPlus className="text-white text-2xl cursor-pointer hover:text-sixth pr-1" />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </PopUp>
        </>
      ) : null}
    </div>
  );
}
