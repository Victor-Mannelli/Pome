import Textarea from 'rc-textarea';
import { IoSendSharp } from 'react-icons/io5';
import { BsPlusSquare } from 'react-icons/bs';
import { FiUserPlus } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';
import { Message } from '@/components/models/message';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ChatMessages, User } from '@/utils/Interfaces';
import WebSocket from 'ws';
import nookies, { parseCookies } from 'nookies';
import { api } from '@/utils/axios';
import PopUp from '@/components/models/popup';
import Filter from '@/components/models/filter';
import { NextPageContext } from 'next';

export default function Friends(data: any) {
  // const router = useRouter();
  const [show, setShow] = useState<boolean>(false);
  const [addFriendFilter, setAddFriendFilter] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<string>('');
  const [friendList, setFriendList] = useState<object[]>([]);
  const [userChat, setUserChat] = useState<number>();
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

  // useEffect(() => {
  //   api
  //     .post('/users/friendlist', {
  //       headers: {
  //         Authorization: `Bearer ${nookies.get(null, 'token').token}`,
  //       },
  //     })
  //     .then((e) => console.log(e.data));
  // }, []);

  console.log(data);

  function sendFriendRequest(user_id: number) {
    console.log(user_id);
  }

  function handleMessages(message: string) {
    console.log(message);
  }

  const userList = data.data.usersList.filter((e: User, i: number) => e.username.includes(addFriendFilter) && e.username !== data.data.userData.username && i < 10);
  return (
    <div className="flex m-5 gap-5 h-[calc(100vh-6.5rem)]">
      <div className="bg-third w-1/4 h-full rounded-xl p-5">
        <div className='flex items-center justify-between pb-3'>
          <h1 className="font-bold"> Friends </h1>
          <BsPlusSquare
            className="text-white text-2xl cursor-pointer"
            onClick={() => setShow(true)}
          />
          <PopUp show={show} setShow={setShow}>
            <div
              className='relative md:w-[70%] w-full md:h-[70%] h-screen bg-second md:rounded-xl md:border border-sixth flex flex-col items-center gap-3 p-5'
              onClick={(e) => e.stopPropagation()}
            >
              <RxCross2
                className='absolute right-4 top-4 text-white text-3xl cursor-pointer hover:text-sixth'
                onClick={() => setShow(!show)}
              />
              <h1> Send a friend Request!</h1>
              <Filter onChange={(e) => setAddFriendFilter(e.target.value)} />
              <div className='overflow-auto w-full flex flex-col gap-3'>
                {userList.map((e: User) => (
                  <div
                    key={e.user_id}
                    className="bg-fifth rounded-xl p-2 w-full flex items-center justify-between"
                  >
                    <div className='flex items-center'>
                      <img
                        className="rounded-full h-6 w-6 mr-2"
                        src="/assets/dark_bg.jpg"
                        alt="profile_pic"
                      />
                      <h1> {e.username} </h1>
                    </div>
                    <FiUserPlus
                      className="text-white text-2xl cursor-pointer hover:text-third pr-1"
                      onClick={() => sendFriendRequest(e.user_id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </PopUp>
        </div>
        <div className='h-[93%] w-full flex flex-col gap-3 overflow-auto rounded-xl'>
          {data?.data?.friendList?.friendshipsAsUser.length !== 0 ? (
            data.data.friendList.friendshipsAsUser.map((e: any) => (
              <div
                key={e.friend.user_id}
                className={` rounded-xl p-2 w-[95%] flex items-center 
                  ${typeof window !== 'undefined' && window?.location.pathname.split('/')[3] === e.friend.user_id ? 'bg-red-500' : 'bg-fourth'}`
                }
                // className='rounded-xl p-2 w-[95%] flex items-center bg-fourth'
                onClick={() => window.history.pushState({}, '', `/pome/friends/${e.friend.user_id}`)}
              >
                <img
                  className="rounded-full h-6 w-6 mr-2"
                  src="/assets/dark_bg.jpg"
                  alt="profile_pic"
                />
                <h1> {e.friend.username} </h1>
              </div>
            ))) : (
            <div className='flex-col text-white pt-10'>
              <h3> It looks a little empty, just like you on the inside :D</h3>
              <br />
              <h3> Add some friends at the plus button above!</h3>
            </div>
          )}
        </div>
      </div>
      <div className="bg-third w-3/4 h-full rounded-xl p-5 flex flex-col justify-between">
        <div
          className="h-[92%] w-full flex flex-col gap-3 overflow-auto rounded-md"
          id='chatBox'
        >
          {/* {chatMessages.map((e: any, i: number) => (
            <Message
              key={e.id}
              id={i}
              profile_picture={e.profile_picture}
              username={e.username}
              timestamp={e.timestamp}
              message={e.message}
            />
          ))} */}
        </div>
        <Textarea
          onPressEnter={() => { message === '' ? null : handleMessages(message); }}
          onChange={(e) => setMessage(e.target.value)}
          autoSize={true}
          value={message}
          placeholder="Message"
          className="w-full min-h-[3rem] outline-none border-none bg-fifth placeholder:text-white text-white rounded-lg pl-4 pr-9 py-3 resize-none"
        />
        <IoSendSharp
          onClick={() => { message === '' ? null : handleMessages(message); }}
          className="fixed z-20 bottom-[3.5rem] right-14 text-seventh hover:cursor-pointer"
        />
      </div>
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  // const id = context.query.id;
  const cookies = parseCookies(context);
  try {
    const [usersList, userData, friendList] = await Promise.all([
      api.get('users/allusers', {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      }).then(e => e.data), 
      api.get('users/userdata', {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      }).then(e => e.data),
      api.get('users/friendlist', {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      }).then(e => e.data),
    ]);

    const data = {
      usersList,
      friendList,
      userData,
      // messages,
    };

    if (!data) return {
      redirect: { destination: '/', permanent: false },
    };

    return { props: { data } };
  } catch (error) {
    return { redirect: { destination: '/', permanent: false } };
  }
}
