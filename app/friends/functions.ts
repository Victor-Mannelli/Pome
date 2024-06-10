import { FriendRequests, FriendType, StrangersAndFRsType } from './types';
import { Dispatch, SetStateAction } from 'react';
import { api } from '@/utils';

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
    .get('/friends/friendList')
    .then((e) => {
      setData(e.data);
    })
    .catch(() => {
      setFailed(true);
    })
    .finally(() => setLoading(false));
}

export function acceptFriendRequest(friend_request_id: number) {
  api.post(`/friends/friendRequest/accept/${friend_request_id}`);
}
export function sendFriendRequest({ friend_id, setData }: { friend_id: string; setData: Dispatch<SetStateAction<StrangersAndFRsType>> }) {
  api
    .post('/friends/friendrequest', { friend_id })
    .then((e) => setData((prevState) => ({ ...prevState, friendRequests: [...prevState.friendRequests, e.data] })))
    .finally(() => {
      // setLoading(false)
    });
}
export function getFriendRequests({ setData }: { setData: Dispatch<SetStateAction<FriendRequests[]>> }) {
  api.get('/friends/friendrequests').then((e) => {
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
    .get('/friends/strangersAndFRs')
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
    .delete(`/friends/friendRequest/${friendRequestId}`)
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
