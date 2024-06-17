import { ChatMessagetype, FriendRequests, FriendType, StrangersAndFRsType } from './types';
import { Dispatch, SetStateAction } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { api, User } from '@/utils';
import { Socket } from 'socket.io-client';

//* FRIEND LIST

export function getFriendList({
  setData,
  setLoading,
  setFailed,
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

export function acceptFriendRequest(friend_request_id: number) {
  api.post(`/friendRequest/accept/${friend_request_id}`);
}
export function sendFriendRequest({ friend_id, setData }: { friend_id: string; setData: Dispatch<SetStateAction<StrangersAndFRsType>> }) {
  api
    .post('/friendRequest', { friend_id })
    .then((e) => setData((prevState) => ({ ...prevState, friendRequests: [...prevState.friendRequests, e.data] })))
    .finally(() => {
      // setLoading(false)
    });
}
export function getFriendRequests({ setData }: { setData: Dispatch<SetStateAction<FriendRequests[]>> }) {
  api.get('/friendRequest').then((e) => {
    setData(e.data);
  });
}
export function getStrangersAndFRs({
  setData,
  setLoading,
  setFailed,
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

export function deleteFriendRequest({
  friendRequestId,
  setData,
}: {
  friendRequestId: number;
  setData: Dispatch<SetStateAction<StrangersAndFRsType>>;
}) {
  // setLoading(true);
  api
    .delete(`/friendRequest/${friendRequestId}`)
    .then((e) => {
      setData((prevState) => ({ ...prevState, friendRequests: e.data }));
      // setData(e.data);
    })
    .catch(() => {
      // setFailed(true);
    })
    .finally(() => {
      // setLoading(false)
    });
}

//* MESSAGES

export function getMessages({
  setLoading,
  setData,
  room_id,
}: {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setData: Dispatch<SetStateAction<ChatMessagetype[]>>;
  room_id: string;
}) {
  setLoading(true);

  api
    .get(`/messages/${room_id}`)
    .then((e) => {
      setData(e.data);
    })
    .catch(() => {
      // setFailed(true);
    })
    .finally(() => {
      setLoading(false);
    });
}

export function sendMessage({
  authorId,
  message,
  setChatMessages,
}: {
  authorId: string;
  message: string;
  setChatMessages?: Dispatch<SetStateAction<ChatMessagetype[]>>;
}) {
  api
    .post(`/messages/${authorId}`, { message })
    .then((e) => {
      setChatMessages && setChatMessages((prevState) => [...prevState, e.data]);
      // setData((prevState) => ({ ...prevState, friendRequests: e.data }));
      // setData(e.data);
    })
    .catch(() => {
      // setFailed(true);
    })
    .finally(() => {
      // setLoading(false);
    });
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

export function sendMessageToWS({
  setMessage,
  message,
  socket,
  wsRoom,
  event,
  user,
}: {
  event: React.KeyboardEvent<HTMLTextAreaElement>;
  setMessage: Dispatch<SetStateAction<string>>;
  message: string;
  socket: Socket;
  wsRoom: string;
  user: User;
}) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    if (message.trim() !== '') {
      if (user.user_id === wsRoom) {
        socket?.emit('message', {
          message: {
            message_id: uuidv4(),
            message,
            author_id: user.user_id,
            author: {
              username: user.username,
              avatar: user.avatar,
            },
            receiver_id: user.user_id === wsRoom ? user.user_id : wsRoom,
            created_at: Date.now().toString(),
          },
          room: wsRoom,
        });
      }
      setMessage('');
    }
  }
}

//* FRIEND REQUESTS

export function sendFriendRequestToWS({ stranger_id, socket, user }: { stranger_id: string; socket: Socket; user: User }) {
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
    userId,
    friendRequestId,
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
  socket?.emit('acceptFR', {
    room: stranger_id,
    userId,
    friendRequestId,
  });
}
