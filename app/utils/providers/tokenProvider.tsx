"use client";

import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Buffer } from "buffer";
import { User } from "../types";
import React from "react";

interface TokenContextType {
  setToken: Dispatch<SetStateAction<string | null>>;
  setUser: Dispatch<SetStateAction<User | null>>;
  token: string | null;
  user: User | null;
}
const defaultTokenContext: TokenContextType = {
  setToken: () => { },
  setUser: () => { },
  token: null,
  user: null,
};

export const TokenContext = createContext<TokenContextType>(defaultTokenContext);

export function TokenProvider({ children }: { children: ReactNode; }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // const existingToken = parseCookies(null).token;
    const existingToken = JSON.parse(localStorage.getItem("token") || "{}");
    setToken(existingToken || null);
  }, []);

  useEffect(() => {
    try {
      console.log(token, "token");
      if (!token) return;
      const decoded = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
      // console.log(decoded, "decoded");
      setUser(decoded);
    } catch (error) {
      setToken(null);
      setUser(null);
    }
  }, [token]);

  useEffect(() => {
    if (token && pathname == "/login") router.push("/");
  }, [token, router, pathname]);


  return (
    <TokenContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
}

