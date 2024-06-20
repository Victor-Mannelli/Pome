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

export function TokenProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const existingToken = localStorage.getItem('token');
    setToken(existingToken || null);
  }, []);

  useEffect(() => {
    try {
      if (!token) return;
      const decoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
      // console.log(decoded, 'decoded');
      setUser(decoded);
    } catch (error) {
      setToken(null);
      setUser(null);
    }
  }, [token]);

  return <TokenContext.Provider value={{ user, setUser, token, setToken }}>{children}</TokenContext.Provider>;
}
