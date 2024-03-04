import { FriendAsFData, FriendAsUData, FriendRequests, FriendsData, User, UsersList } from '@/utils/interfaces';
import { getAllUsers, getFriendRequests, sendFriendRequest } from '@/utils/functions';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FiUserPlus, RxCross2 } from '@/utils/libs';
import { Filter } from '../models';

export function AddFriends({ showUsers, setShowUsers, data }: {
  setShowUsers: Dispatch<SetStateAction<boolean>>;
  showUsers: boolean;
  data: FriendsData;
}) {
  const [friendRequests, setFriendRequests] = useState<FriendRequests[]>([]);
  const [addFriendFilter, setAddFriendFilter] = useState<string>('');
  const [allUsers, setAllUsers] = useState<UsersList[]>([]);
  const [update, setUpdate] = useState<boolean>(false)

  useEffect(() => {
    getAllUsers(setAllUsers)
    getFriendRequests(setFriendRequests)
  }, [update])

  const friends = [
    ...data.friendList.friendshipsAsUser.map((friendship: FriendAsFData) => friendship.friend),
    ...data.friendList.friendshipsAsFriend.map((friendship: FriendAsUData) => friendship.user),
  ].sort();
  const usersList = allUsers.filter((e: User, i: number) =>
    e.username.includes(addFriendFilter)
    && e.username !== data.userData.username
    && !friends.some(friend => friend.username === e.username)
    && i < 10
  );

  return (
    <div className='fixed top-0 left-0 flex justify-center items-center z-50 h-screen w-full'>
      <div
        className='relative lg:w-[60rem] md:w-[70%] w-full md:h-[70%] h-screen bg-second md:rounded-xl md:border border-sixth flex flex-col items-center gap-3 p-5'
        onClick={(e) => e.stopPropagation()}
      >
        <RxCross2
          className='absolute right-4 top-4 text-white text-3xl cursor-pointer hover:text-sixth'
          onClick={() => setShowUsers(!showUsers)}
        />
        <h1> Send a friend Request! </h1>
        <Filter onChange={(e) => setAddFriendFilter(e.target.value)} />
        <div className='overflow-auto w-full flex flex-col gap-3'>
          {usersList.map((e: User) => {
            const requestSent = friendRequests.some((friendRequest) => friendRequest.requested_id === e.user_id);
            return (
              <div
                key={e.user_id}
                className={`bg-fifth rounded-xl p-2 w-full flex items-center justify-between ${requestSent ? '' : 'hover:cursor-pointer hover:bg-sixth'}`}
                onClick={() => requestSent ? null : sendFriendRequest(e.user_id, update, setUpdate)}
              >
                <div className='flex items-center'>
                  <img
                    className="rounded-full h-6 w-6 mr-2"
                    src="/assets/dark_bg.jpg"
                    alt="profile_pic"
                  />
                  <h1> {e.username} </h1>
                </div>
                <div className='flex items-center gap-3'>
                  {requestSent
                    ? <h3 className='text-signature pr-2'> Friend Request Sent </h3>
                    : <FiUserPlus className="text-white text-2xl pr-1" />
                  }
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}