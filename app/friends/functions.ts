/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChatMessagetype, FriendRequests, FriendShip, FriendType, StrangersAndFRsType } from './types';
import { api, bufferToBase64, User } from '@/utils';
import { Dispatch, SetStateAction } from 'react';
import { Socket } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

//? FRIEND LIST

// export function acceptFriendRequest(friend_request_id: number) {
//   api.post(`/friendRequest/accept/${friend_request_id}`);
// }
// export function sendFriendRequest({ friend_id, setData }: { friend_id: string; setData: Dispatch<SetStateAction<StrangersAndFRsType>> }) {
//   api
//     .post('/friendRequest', { friend_id })
//     .then((e) => setData((prevState) => ({ ...prevState, friendRequests: [...prevState.friendRequests, e.data] })))
//     .finally(() => {
//       // setLoading(false)
//     });
// }
// export function deleteFriendRequest({
//   friendRequestId,
//   setData,
// }: {
//   friendRequestId: number;
//   setData: Dispatch<SetStateAction<StrangersAndFRsType>>;
// }) {
//   // setLoading(true);
//   api
//     .delete(`/friendRequest/${friendRequestId}`)
//     .then((e) => {
//       setData((prevState) => ({ ...prevState, friendRequests: e.data }));
//       // setData(e.data);
//     })
//     .catch(() => {
//       // setFailed(true);
//     })
//     .finally(() => {
//       // setLoading(false)
//     });
// }

export function getFriendList({
  setLoading,
  setFailed,
  setData,
}: {
  setData: Dispatch<SetStateAction<FriendType[] | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setFailed: Dispatch<SetStateAction<boolean>>;
}) {
  api
    .get('/friendship/friendList')
    .then((e) => {
      setData(e.data);
    })
    .catch(() => {
      setFailed(true);
    })
    .finally(() => setLoading(false));
}

//? MESSAGES

// export function getMessages({
//   setLoading,
//   setData,
//   room_id,
// }: {
//   setLoading: Dispatch<SetStateAction<boolean>>;
//   setData: Dispatch<SetStateAction<ChatMessagetype[]>>;
//   room_id: string;
// }) {
//   setLoading(true);
//
//   api
//     .get(`/messages/${room_id}`)
//     .then((e) => {
//       setData(e.data);
//     })
//     .catch(() => {
//       // setFailed(true);
//     })
//     .finally(() => {
//       setLoading(false);
//     });
// }
//
// export function sendMessage({
//   authorId,
//   message,
//   setChatMessages,
// }: {
//   authorId: string;
//   message: string;
//   setChatMessages?: Dispatch<SetStateAction<ChatMessagetype[]>>;
// }) {
//   api
//     .post(`/messages/${authorId}`, { message })
//     .then((e) => {
//       setChatMessages && setChatMessages((prevState) => [...prevState, e.data]);
//       // setData((prevState) => ({ ...prevState, friendRequests: e.data }));
//       // setData(e.data);
//     })
//     .catch(() => {
//       // setFailed(true);
//     })
//     .finally(() => {
//       // setLoading(false);
//     });
// }

export function getStrangersAndFRs({
  setLoading,
  setFailed,
  setData,
}: {
  setData: Dispatch<SetStateAction<StrangersAndFRsType | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setFailed: Dispatch<SetStateAction<boolean>>;
}) {
  setLoading(true);
  api
    .get('/users/strangersAndFRs')
    .then((e) => {
      setData(e.data);
    })
    .catch(() => {
      setFailed(true);
    })
    .finally(() => setLoading(false));
}

export function deleteMessage({ id, setChatMessages }: { id: number; setChatMessages?: Dispatch<SetStateAction<ChatMessagetype[]>> }) {
  api
    .delete(`/messages/${id}`)
    .then((e) => {
      setChatMessages && setChatMessages((prevState) => [...prevState, e.data]);
    })
    .finally(() => {
      // setLoading(false);
    });
}

//TODO FRIEND REQUESTS

export function getFriendRequests({ setData }: { setData: Dispatch<SetStateAction<FriendRequests[]>> }) {
  api.get('/friendRequest').then((e) => {
    setData(e.data);
  });
}

//TODO FRIENDSHIP

export function deleteFriend(friendship_id: string, refreshFL: () => void) {
  api.delete(`/friendship/${friendship_id}`).then(() => refreshFL());
}

//* MESSAGES WS

export function sendMessageToWS({
  wsRoomAndFriend,
  setMessage,
  message,
  socket,
  event,
  user,
}: {
  wsRoomAndFriend: { wsRoom: string; friend_id: string; friend: FriendShip | User };
  event: React.KeyboardEvent<HTMLTextAreaElement>;
  setMessage: Dispatch<SetStateAction<string>>;
  message: string;
  socket: Socket;
  user: User;
}) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    if (message.trim() !== '') {
      socket?.emit('message', {
        message: {
          message_id: uuidv4(),
          message,
          author_id: user.user_id,
          author: {
            username: user.username,
            avatar: bufferToBase64(user.avatar),
          },
          receiver_id: wsRoomAndFriend.friend_id,
          created_at: Date.now().toString(),
        },
        room: wsRoomAndFriend.wsRoom,
      });
      setMessage('');
    }
  }
}

export function deleteMessageWS({ message_id, user_id, socket, room }: { message_id: string; user_id: string; socket: Socket; room: string }) {
  socket?.emit('deleteMessage', {
    message_id,
    user_id,
    room,
  });
}

//* FRIEND REQUESTS WS

export function sendFriendRequestToWS({ stranger_id, socket, user }: { stranger_id: string; socket: Socket; user: User }) {
  console.log('friendRequest sent');
  socket?.emit('friendRequest', {
    room: stranger_id,
    user_id: user.user_id,
    friend_id: stranger_id,
  });
}

export function deleteFriendRequestWS({
  friendRequestId,
  stranger_id,
  socket,
  userId,
}: {
  friendRequestId: number;
  stranger_id: string;
  socket: Socket;
  userId: string;
}) {
  socket?.emit('deleteFR', {
    room: stranger_id,
    friendRequestId,
    userId,
  });
}

export function acceptFriendRequestWS({
  friendRequestId,
  stranger_id,
  socket,
  userId,
}: {
  friendRequestId: number;
  stranger_id: string;
  socket: Socket;
  userId: string;
}) {
  console.log('acceptedFriendRequestWS');
  socket?.emit('acceptFR', {
    room: stranger_id,
    userId,
    friendRequestId,
  });
}
