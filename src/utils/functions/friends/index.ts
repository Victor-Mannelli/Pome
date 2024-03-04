import { FriendRequests } from '@/utils/interfaces';
import { Dispatch, SetStateAction } from 'react';
import { api } from '@/utils/axios';

export function acceptFriendRequest({ friend_request_id, requested_id, requester_id }: FriendRequests) {
  api.post('/friends/acceptfriend', { friend_request_id, requested_id, requester_id });
}
export function sendFriendRequest(friend_id: number) {
  api.post('/friends/friendrequest', { friend_id });
}
export function getFriendRequests(setFriendRequests: Dispatch<SetStateAction<FriendRequests[]>>) {
  api.get('/friends/friendrequests').then((e) => { setFriendRequests(e.data); });
}