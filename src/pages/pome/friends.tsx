import { IoSendSharp } from 'react-icons/io5';
import { BsPlusSquare } from 'react-icons/bs';
import { FiUserPlus } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';
import { GiCakeSlice } from 'react-icons/gi';
import { Message } from '@/components/models/message';
import { useEffect, useState } from 'react';
import { NextPageContext } from 'next';
import { ChatMessagesInterface, FriendAsFData, FriendAsUData, FriendsData, User, friendRequests } from '@/utils/Interfaces';
import { api } from '@/utils/axios';
import nookies, { parseCookies } from 'nookies';
import Textarea from 'rc-textarea';
import PopUp from '@/components/models/popup';
import Filter from '@/components/models/filter';
import Friend from '@/components/friend';
// import WebSocket from 'ws';

export default function Friends(data: FriendsData) {
  const [showUsers, setShowUsers] = useState<boolean>(false);
  const [showFriendRequests, setShowFriendRequests] = useState<boolean>(false);
  const [addFriendFilter, setAddFriendFilter] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [userChat, setUserChat] = useState<number>(-1);
  const [chatMessages, setChatMessages] = useState<ChatMessagesInterface[]>([]);

  // const ws = new WebSocket('ws://localhost:8080');

  // ws.addEventListener('open', function () {
  //   console.log('Connected to WebSocket server');
  // });

  // ws.addEventListener('message', function(event) {
  //   const blob = event.data;
  //   blob.text().then(function(data: any) {
  //     const json = JSON.parse(data);
  //     console.log('Received message:', json);
  //   });
  // });

  console.log(data);
  useEffect(() => {
    if (userChat !== -1) {
      api
        .get(`/messages/${userChat}`, {
          headers: {
            Authorization: `Bearer ${nookies.get(null, 'token').token}`,
          },
        })
        .then((e) => setChatMessages(e.data));
    }
  }, [userChat]);

  function acceptFriendRequest({
    friend_request_id,
    requested_id,
    requester_id
  }: {
    friend_request_id: number,
    requested_id: number,
    requester_id: number
  }) {
    api.post('/friends/acceptfriend', { friend_request_id, requested_id, requester_id }, {
      headers: {
        Authorization: `Bearer ${nookies.get(null, 'token').token}`,
      },
    });
  }
  function sendFriendRequest(friend_id: number) {
    api.post('/friends/friendrequest', friend_id, {
      headers: {
        Authorization: `Bearer ${nookies.get(null, 'token').token}`,
      },
    });
  }
  function sendMessages(message: string) {
    if (userChat !== -1) {
      api.post(`/messages/${userChat}`, { message: message }, {
        headers: {
          Authorization: `Bearer ${nookies.get(null, 'token').token}`,
        },
      });
    }
  }
  const friends = [
    ...data.friendList.friendshipsAsUser.map((friendship: FriendAsFData) => friendship.friend),
    ...data.friendList.friendshipsAsFriend.map((friendship: FriendAsUData) => friendship.user),
  ].sort();
  const userList = data.usersList.filter((e: User, i: number) => e.username.includes(addFriendFilter) && e.username !== data.userData.username && i < 10 && !friends.some(friend => friend.username === e.username));
  const receivedFR = data.friendRequests.filter((e: friendRequests) => e.requested_id === data.userData.user_id);
  return (
    <div className="flex m-5 gap-5 h-[calc(100vh-6.5rem)]">
      <div className="bg-third w-1/4 h-full rounded-xl p-5">
        <div className='flex items-center justify-between pb-3'>
          <div className='flex items-center gap-3'>
            <h1 className="font-bold"> Friends </h1>
            <FiUserPlus
              className='text-signature text-2xl cursor-pointer'
              onClick={() => setShowFriendRequests(!showFriendRequests)}
            />
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
                    : receivedFR.map((e: friendRequests) => (
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
                            {data.usersList.find(user => user.user_id === e.requester_id)?.username}
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
          </div>
          <BsPlusSquare
            className="text-white text-2xl cursor-pointer"
            onClick={() => setShowUsers(true)}
          />
          <PopUp show={showUsers} setShow={setShowUsers}>
            <div
              className='relative lg:w-[60rem] md:w-[70%] w-full md:h-[70%] h-screen bg-second md:rounded-xl md:border border-sixth flex flex-col items-center gap-3 p-5'
              onClick={(e) => e.stopPropagation()}
            >
              <RxCross2
                className='absolute right-4 top-4 text-white text-3xl cursor-pointer hover:text-sixth'
                onClick={() => setShowUsers(!showUsers)}
              />
              <h1> Send a friend Request!</h1>
              <Filter onChange={(e) => setAddFriendFilter(e.target.value)} />
              <div className='overflow-auto w-full flex flex-col gap-3'>
                {userList.map((e: User) => (
                  <div
                    key={e.user_id}
                    className="bg-fifth rounded-xl p-2 w-full flex items-center justify-between hover:bg-fourth hover:cursor-pointer"
                    onClick={() => sendFriendRequest(e.user_id)}
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
                      {data.friendRequests.some((friendRequest) => friendRequest.requested_id === e.user_id)
                        ?
                        <>
                          <h3 className='text-signature cursor-pointer'> Friend Request Sent </h3>
                          <FiUserPlus className="text-white text-2xl cursor-pointer pr-1" />
                        </>
                        :
                        <FiUserPlus
                          className="text-white text-2xl cursor-pointer hover:text-sixth pr-1"
                          onClick={() => sendFriendRequest(e.user_id)}
                        />
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </PopUp>
        </div>
        <div className='h-[93%] w-full flex flex-col gap-3 overflow-auto rounded-xl'>
          {data.friendList.friendshipsAsUser.length !== 0 || data.friendList.friendshipsAsFriend.length !== 0
            ?
            friends.map((e: User) => <Friend key={e.user_id} friend={e} userChat={userChat} setUserChat={setUserChat} />)
            : (
              <div className='flex flex-col text-white pt-10'>
                <h3> It looks a little empty, just like you on the inside :D </h3>
                <br />
                <h3> Add some friends at the plus button above!</h3>
              </div>
            )
          }
        </div>
      </div>
      <div className="bg-third w-3/4 h-full rounded-xl p-5 pb-3 flex flex-col justify-between">
        <div className='w-full flex flex-col gap-3 overflow-auto rounded-md'>
          {chatMessages.map((e: ChatMessagesInterface) => (
            <Message
              key={e.message_id}
              // profile_picture={e.profile_picture}
              username={e.author.username}
              timestamp={new Date(e.created_at)}
              message={e.message}
            />
          ))}
        </div>
        <div className="relative w-full bg-third rounded-md pt-5">
          <Textarea
            onPressEnter={() => { message === '' ? null : sendMessages(message), setMessage(''); }}
            onChange={(e) => setMessage(e.target.value)}
            autoSize={true}
            value={message}
            placeholder="Message"
            className="w-full outline-none border-none bg-fifth placeholder:text-white text-white rounded-lg pl-4 pr-9 py-3 resize-none"
          />
          <IoSendSharp
            onClick={() => { message === '' ? null : sendMessages(message); }}
            className="absolute right-3 bottom-5 text-seventh hover:cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const cookies = parseCookies(context);
  const config = {
    headers: {
      Authorization: `Bearer ${cookies.token}`,
    },
  };
  try {
    const [usersList, userData, friendList, friendRequests] = await Promise.all([
      api.get('/users/allusers', config).then(e => e.data),
      api.get('/users/userdata', config).then(e => e.data),
      api.get('/friends/friendlist', config).then(e => e.data),
      api.get('/friends/friendrequest', config).then(e => e.data),
    ]);

    const data = {
      usersList,
      friendList,
      userData,
      friendRequests,
    };

    if (!data) return {
      redirect: { destination: '/', permanent: false },
    };

    return { props: data };
  } catch (error) {
    return { redirect: { destination: '/', permanent: false } };
  }
}