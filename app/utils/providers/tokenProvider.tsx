"use client";

import { createContext, useEffect, useState } from "react";
import { parseCookies } from "nookies";

export const TokenContext = createContext<any>({});

export function TokenProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const existingToken = parseCookies(null).token;
    setToken(existingToken || null);
  }, []);

  useEffect(() => {
    try {
      if (!token) return
      const decoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
      console.log(decoded, 'decoded')
      setUser(decoded);
    } catch (error) {
      setToken(null);
      setUser(null)
    }
  }, [token]);

  return (
    <TokenContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </TokenContext.Provider>
  )
}

interface User {
  user_id: string,
  username: string,
  email: string;
}