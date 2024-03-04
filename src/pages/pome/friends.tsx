
import { FriendsData, UsersList, FriendRequests, ChatMessagesInterface, FriendAsFData, FriendAsUData, User } from '@/utils/interfaces';
import { Message, Friend, FriendRequestsWindow, UsersListWindow } from '@/components';
import { FaUserFriends, FiUserPlus } from '@/utils/libs';
import { getFriendRequests, sendMessages } from '@/utils/functions';
import { useEffect, useRef, useState } from 'react';
import { parseCookies } from 'nookies';
import { NextPageContext } from 'next';
import Textarea from 'rc-textarea';
import axios from 'axios';
// import { getMessagesHook } from '@/utils/hooks/useGetMessages';
// import WebSocket from 'ws';

export default function Friends(data: FriendsData) {

  const [showUsers, setShowUsers] = useState<boolean>(false);
  const [allUsers, setAllUsers] = useState<UsersList[]>([]);
  const [showFriendRequests, setShowFriendRequests] = useState<boolean>(false);
  const [friendRequests, setFriendRequests] = useState<FriendRequests[]>([]);
  const [addFriendFilter, setAddFriendFilter] = useState<string>('');
  const [userChat, setUserChat] = useState<number>(data.userData.user_id);
  const [chatMessages, setChatMessages] = useState<ChatMessagesInterface[]>([]);

  const textArea: any = useRef();
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

  // console.log(data);

  // useEffect(() => {
  //   const chatMessages = getMessagesHook(userChat);
  //   console.log(chatMessages);
  //   if (userChat !== -1) {
  //     api
  //       .get(`/messages/${userChat}`, config)
  //       .then((e) => setChatMessages(e.data));
  //   }
  // }, [userChat]);

  useEffect(() => {
    getFriendRequests(setFriendRequests)
  }, [])

  const friends = [
    ...data.friendList.friendshipsAsUser.map((friendship: FriendAsFData) => friendship.friend),
    ...data.friendList.friendshipsAsFriend.map((friendship: FriendAsUData) => friendship.user),
  ].sort();
  const usersList = allUsers.filter((e: User, i: number) => {
    e.username.includes(addFriendFilter) && e.username !== data.userData.username
      && !friends.some(friend => friend.username === e.username)
      && i < 10
  });
  const receivedFR = friendRequests.filter((e: FriendRequests) => e.requested_id === data.userData.user_id);

  // console.log(receivedFR, "received FR");
  // console.log(data.friendList, "friend list");
  // console.log(usersList, "all users");

  return (
    <div className="flex m-5 gap-5 h-[calc(100vh-6.5rem)]">
      <div className="flex flex-col bg-third w-1/4 h-full rounded-xl p-5">
        <div
          className={`flex justify-center items-center rounded-xl p-2 mb-5 w-[98%] ${userChat === data.userData.user_id ? 'bg-sixth' : 'bg-fourth'}`}
          onClick={() => setUserChat(data.userData.user_id)}
        >
          <h1> Your notes </h1>
        </div>
        <div className='flex items-center justify-between pb-3'>
          <div className='relative flex items-center gap-3'>
            <h1 className="font-bold"> Friends </h1>
            {receivedFR.length > 0 ?
              <>
                <FaUserFriends
                  className='relative text-white text-2xl cursor-pointer'
                  onClick={() => setShowFriendRequests(!showFriendRequests)}
                />
                <FriendRequestsWindow
                  setShowFriendRequests={setShowFriendRequests}
                  showFriendRequests={showFriendRequests}
                  receivedFR={receivedFR}
                  usersList={usersList}
                />
                <p className='absolute text-white text-sm -top-2 -right-2'> {receivedFR.length} </p>
              </> : null
            }
          </div>
          <FiUserPlus
            className="text-signature text-2xl cursor-pointer"
            onClick={() => {
              setShowUsers(true);
            }}
          />
          <UsersListWindow
            showUsers={showUsers}
            setShowUsers={setShowUsers}
            friendRequests={friendRequests}
            data={data}
          />
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
          {chatMessages.map((e: ChatMessagesInterface, i: number) => (
            <Message
              id={i === chatMessages.length - 1 ? 'last' : ''}
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
            ref={textArea}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onPressEnter={(e: any) => { e.target.value === '' ? null : sendMessages({ message: e.target.value, userChat }); return e.target.value = null; }}
            autoSize={true}
            placeholder="Message"
            className="w-full outline-none border-none bg-fifth placeholder:text-white text-white rounded-lg pl-4 pr-9 py-3 resize-none"
          />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const cookies = parseCookies(context);
  const config = { headers: { Authorization: `Bearer ${cookies.token}` } };
  try {
    const [userData, friendList] = await Promise.all([
      axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, config).then(e => e.data),
      axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/friends/friendlist`, config).then(e => e.data),
    ]);

    const data = {
      userData,
      friendList,
    };
    if (!data) return {
      redirect: { destination: '/', permanent: false },
    };

    return { props: data };
  } catch (error) {
    return { redirect: { destination: '/', permanent: false } };
  }
}