import { ChatMessagesInterface } from '@/utils/interfaces';
import { Dispatch, SetStateAction } from 'react';
import { api } from '@/utils/axios';
import nookies from 'nookies';

const config = { headers: { Authorization: `Bearer ${nookies.get(null, 'token').token}` } };

export function sendMessages({ message, userChat }: { message: string, userChat: number }) {
  api.post(`/messages/${userChat}`, { message: message }, config);
}

export async function getMessages(userChat: number, setChatMessages: Dispatch<SetStateAction<ChatMessagesInterface[]>>) {
  return await api
    .get(`/messages/${userChat}`, config)
    .then((response) => setChatMessages(response.data))
    .catch((error) => console.log(error));
}

