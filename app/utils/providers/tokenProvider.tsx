import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from 'react';
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

//! I Suspect the first use effect is not doing anything
export function TokenProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const existingToken = localStorage.getItem('token');
    // console.log('First useEffect - existingToken:', existingToken); // Debugging log
    setToken(existingToken || null);
  }, []);

  useEffect(() => {
    // console.log('Token state updated:', token); // Debugging log
    if (!token) return;

    try {
      const decoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
      const avatar = localStorage.getItem('avatar');
      const banner = localStorage.getItem('banner');
      // console.log('Second useEffect - decoded:', decoded); // Debugging log
      // console.log('Second useEffect - avatar:', avatar); // Debugging log
      // console.log('Second useEffect - banner:', banner); // Debugging log
      setUser({ ...decoded, avatar, banner });
    } catch (error) {
      // console.error('Error decoding token:', error); // Debugging log
      setToken(null);
      setUser(null);
    }
  }, [token]);

  useEffect(() => {
    console.log('User state updated:', user); // Debugging log
  }, [user]);

  return <TokenContext.Provider value={{ user, setUser, token, setToken }}>{children}</TokenContext.Provider>;
}
