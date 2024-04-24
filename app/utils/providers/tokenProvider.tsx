"use client";

import { createContext, useEffect, useState } from "react";
// import * as jwt from "jsonwebtoken";

export const TokenContext = createContext<any>({});

export function TokenProvider({ children }: { children: React.ReactNode }) {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const existingToken = localStorage.getItem("userToken");
    setUserToken(existingToken || null);
  }, []);

  useEffect(() => {
    try {
      if (!userToken) return
      const decoded = JSON.parse(Buffer.from(userToken.split('.')[1], 'base64').toString());
      console.log(decoded, 'decoded')
      setUser(decoded);
    } catch (error) {
      setUserToken(null);
      setUser(null)
      localStorage.removeItem("userToken");
    }
  }, [userToken]);

  return (
    <TokenContext.Provider value={{ user, setUser, userToken, setUserToken }}>
      {children}
    </TokenContext.Provider>
  )
}

interface User {
  id: string,
  name: string,
  email: string;
  role: string;
}