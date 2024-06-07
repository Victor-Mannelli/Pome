'use client';
// import { FriendsData, ChatMessagesInterface, FriendAsFData, FriendAsUData, User } from "./types";
// import { Message, Friend, FriendRequestsElement, AddFriends } from '@/components';
// import { sendMessages } from '@/utils/functions';
// import { FiUserPlus } from "@/utils/libs";
// import { useRef, useState } from "react";
// import { Message } from "./message";
// import Textarea from "rc-textarea";
import React from 'react';
// import { getMessagesHook } from '@/utils/hooks/useGetMessages';
// import WebSocket from 'ws';

export default function Friends() {
  // export default function Friends(data) {
  // const [showUsers, setShowUsers] = useState<boolean>(false);
  // const [showFriendRequests, setShowFriendRequests] = useState<boolean>(false);
  // const [userChat, setUserChat] = useState<number>();
  // const [chatMessages, setChatMessages] = useState<any[]>([]);
  // const textArea: any = useRef();
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

  // const friends = [
  //   ...data.friendList.friendshipsAsUser.map((friendship: any) => friendship.friend),
  //   ...data.friendList.friendshipsAsFriend.map((friendship: any) => friendship.user),
  // ].sort();

  return (
    <></>
    // <div className="flex m-5 gap-5 h-[calc(100vh-6.5rem)]">
    //   <div className="flex flex-col bg-third w-1/4 h-full rounded-xl p-5">
    //     <div
    //       // ${userChat === data.userData.user_id ? 'bg-sixth' : 'bg-fourth'}
    //       className={`flex justify-center items-center rounded-xl p-2 mb-5 w-full
    //       `}
    //       onClick={() => setUserChat(data.userData.user_id)}
    //     >
    //       <h1> Your notes </h1>
    //     </div>
    //     <div className='flex items-center justify-between pb-3'>
    //       {/* <FriendRequestsElement
    //         setShowFriendRequests={setShowFriendRequests}
    //         showFriendRequests={showFriendRequests}
    //         userId={data.userData.user_id}
    //         data={data}
    //       /> */}
    //       <FiUserPlus
    //         className="text-signature text-2xl cursor-pointer"
    //         onClick={() => setShowUsers(true)}
    //       />
    //       {/* {showUsers ?
    //         <AddFriends
    //           showUsers={showUsers}
    //           setShowUsers={setShowUsers}
    //           data={data}
    //         /> : null
    //       } */}
    //     </div>
    //     <div className='h-[93%] w-full flex flex-col gap-3 overflow-auto rounded-xl'>
    //       {/* {data.friendList.friendshipsAsUser.length !== 0 || data.friendList.friendshipsAsFriend.length !== 0 ?
    //         friends.map((e: User) =>
    //           <Friend key={e.user_id} friend={e} userChat={userChat} setUserChat={setUserChat} />
    //         ) : (
    //           <div className='flex flex-col text-white pt-10'>
    //             <h3> It looks a little empty, just like you on the inside :D </h3>
    //             <br />
    //             <h3> Add some friends at the green button above!</h3>
    //           </div>
    //         )
    //       } */}
    //     </div>
    //   </div>
    //   <div className="bg-third w-3/4 h-full rounded-xl p-5 pb-3 flex flex-col justify-between">
    //     <div className='w-full flex flex-col gap-3 overflow-auto rounded-md'>
    //       {chatMessages.map((e: any, i: number) => (
    //         <Message
    //           id={i === chatMessages.length - 1 ? "last" : ""}
    //           key={e.message_id}
    //           // profile_picture={e.profile_picture}
    //           username={e.author.username}
    //           timestamp={new Date(e.created_at)}
    //           message={e.message}
    //         />
    //       ))}
    //     </div>
    //     <div className="relative w-full bg-third rounded-md pt-5">
    //       <Textarea
    //         ref={textArea}
    //         onPressEnter={(e: any) => {
    //           e.target.value === ""
    //             ? null : null;
    //           // sendMessages({ message: e.target.value, userChat });
    //           return e.target.value = null;
    //         }}
    //         autoSize={true}
    //         placeholder="Message"
    //         className="w-full outline-none border-none bg-fifth placeholder:text-white text-white rounded-lg pl-4 pr-9 py-3 resize-none"
    //       />
    //     </div>
    //   </div>
    // </div>
  );
}

// export async function getServerSideProps(context: NextPageContext) {
//   const cookies = parseCookies(context);
//   const config = { headers: { Authorization: `Bearer ${cookies.token}` } };
//   try {
//     const [userData, friendList] = await Promise.all([
//       axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, config).then(e => e.data),
//       axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/friends/friendlist`, config).then(e => e.data),
//     ]);

//     const data = {
//       userData,
//       friendList,
//     };
//     if (!data) return {
//       redirect: { destination: '/', permanent: false },
//     };

//     return { props: data };
//   } catch (error) {
//     return { redirect: { destination: '/', permanent: false } };
//   }
// }
