/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChatMessagetype, FriendRequests, FriendType, StrangersAndFRsType } from './types';
import { Dispatch, SetStateAction } from 'react';
import { api } from '@/utils';

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
  authorId,
  setData,
  setLoading,
}: {
  authorId: string;
  setData: Dispatch<SetStateAction<any>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) {
  if (!authorId) return;
  setLoading(true);

  api
    .get(`/messages/${authorId}`)
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
