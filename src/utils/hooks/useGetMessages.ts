import nookies from 'nookies';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../axios';
import { ChatMessagesInterface } from '../Interfaces';

export function getMessagesHook(userChat: number) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [token, _] = useState<string>(nookies.get(null, 'token').token);
  const [messages, setMessages] = useState<ChatMessagesInterface[]>([]);
  const { data: response, isError, isFetching } : any = useGetMessages(token, userChat);

  useEffect(() => {
    if (response && response.data) {
      setMessages(response.data);
    }
  }, [response]);

  return {
    messages,
    isFetching,
    isError,
  };
}

async function getMessages(token: string, userChat: number) {
  try {
    const response = await api.get(`/messages/${userChat}`, {
      headers: { 
        Authorization: `Bearer ${token}`
      },
    });
    return response;
  } catch (error) {
    return console.log(error, 'error');
  }
}

function useGetMessages(token: string, userChat: number) {
  return useQuery(['messages'], async () => {
    const response = await getMessages(token, userChat);
    return response;
  }, {
    staleTime: 1000,
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 60,
  });
}
