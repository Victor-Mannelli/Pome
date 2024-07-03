import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from 'react';
import { getDataFromIndexDB } from '../indexDB';
import { Buffer } from 'buffer';
import { User } from '../types';
import React from 'react';

interface TokenContextType {
  setToken: Dispatch<SetStateAction<string | null>>;
  setUser: Dispatch<SetStateAction<User | null>>;
  token: string | null;
  user: User | null;
}
const defaultTokenContext: TokenContextType = {
  setToken: () => {},
  setUser: () => {},
  token: null,
  user: null,
};

export const TokenContext = createContext<TokenContextType>(defaultTokenContext);

export function TokenProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const existingToken = localStorage.getItem('token');
    if (token !== existingToken) {
      setToken(existingToken || null);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const decoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        const banner = await getDataFromIndexDB('banner');
        const avatar = await getDataFromIndexDB('avatar');
        setUser({ ...decoded, avatar, banner });
      } catch (error) {
        setToken(null);
        setUser(null);
      }
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    console.log('User state updated:', user); // Debugging log
  }, [user]);

  return <TokenContext.Provider value={{ user, setUser, token, setToken }}>{children}</TokenContext.Provider>;
}
