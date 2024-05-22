"use client";

import { createContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { User } from "../types";

export const TokenContext = createContext<any>({});

export function TokenProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const router = useRouter();

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

  useEffect(() => {
    if (token && pathname == "/login") router.push("/")
  }, [token, router, pathname])


  return (
    <TokenContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </TokenContext.Provider>
  )
}

