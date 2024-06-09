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

export function acceptFriendRequest({ friend_request_id, requested_id, requester_id }: FriendRequests) {
  api.post('/friends/acceptfriend', { friend_request_id, requested_id, requester_id });
}
export function sendFriendRequest(friend_id: number, update: boolean, setUpdate: Dispatch<SetStateAction<boolean>>) {
  api.post('/friends/friendrequest', { friend_id }).then(() => setUpdate(!update));
}
export function getFriendRequests(setFriendRequests: Dispatch<SetStateAction<FriendRequests[]>>) {
  api.get('/friends/friendrequests').then((e) => {
    setFriendRequests(e.data);
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

export function deleteFriendRequest(friendRequestId: number) {
  // setLoading(true);
  api
    .delete(`/friends/friendRequest/${friendRequestId}`)
    .then(() => {
      // setData(e.data);
    })
    .catch(() => {
      // setFailed(true);
    })
    .finally(() => {
      // setLoading(false)
    });
}
