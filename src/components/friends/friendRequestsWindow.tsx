
import { FiUserPlus, GiCakeSlice, RxCross2 } from '@/utils/libs';
import { FriendRequests, UsersList } from '@/utils/interfaces';
import { acceptFriendRequest } from '@/utils/functions';
import { Dispatch, SetStateAction } from 'react';
import { PopUp } from '../popup';

export function FriendRequestsWindow({ setShowFriendRequests, showFriendRequests, receivedFR, usersList }: {
  setShowFriendRequests: Dispatch<SetStateAction<boolean>>,
  showFriendRequests: boolean,
  receivedFR: FriendRequests[],
  usersList: UsersList[]
}) {
  
  return (
    <PopUp show={showFriendRequests} setShow={setShowFriendRequests}>
      <div
        className='relative lg:w-[60rem] md:w-[70%] w-full md:h-[70%] h-screen bg-second md:rounded-xl md:border border-sixth flex flex-col items-center gap-3 p-5'
        onClick={(e) => e.stopPropagation()}
      >
        <RxCross2
          className='absolute right-4 top-4 text-white text-3xl cursor-pointer hover:text-sixth'
          onClick={() => setShowFriendRequests(!showFriendRequests)}
        />
        <h1> These people want to be your friend! </h1>
        <div className='overflow-auto w-full flex flex-col gap-3'>
          {receivedFR.length === 0 ?
            <div className='flex justify-center items-center gap-2 text-white pt-16'>
              <h3> Yeah, I didn't think so either, have a cake instead</h3>
              <GiCakeSlice className='text-3xl' />
            </div>
            : receivedFR.map((e: FriendRequests) => (
              <div
                key={e.friend_request_id}
                className="bg-fifth rounded-xl p-2 w-full flex items-center justify-between hover:bg-fourth hover:cursor-pointer"
                onClick={() => acceptFriendRequest({ friend_request_id: e.friend_request_id, requested_id: e.requested_id, requester_id: e.requester_id })}
              >
                <div className='flex items-center'>
                  <img
                    className="rounded-full h-6 w-6 mr-2"
                    src="/assets/dark_bg.jpg"
                    alt="profile_pic"
                  />
                  <h1 className='cursor-pointer text-2xl'>
                    {usersList.find(user => user.user_id === e.requester_id)?.username}
                  </h1>
                </div>
                <div className='flex items-center gap-3'>
                  {/* {data.friendRequests.some((friendRequest) => friendRequest.requested_id === e.user_id)
                    ? <h3 className='text-signature'> Friend Request Sent </h3>
                    : null
                  } */}
                  <FiUserPlus
                    className="text-white text-2xl cursor-pointer hover:text-sixth pr-1"
                  // onClick={() => sendFriendRequest(e.user_id)}
                  />
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </PopUp>
  )
}