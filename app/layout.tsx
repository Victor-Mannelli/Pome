"use client";

import { Providers, TokenContext } from "./utils/providers";
import { usePathname, redirect } from "next/navigation";
import { Navbar } from "./components/elements/navbar";
import { useContext, useEffect } from "react";
import { Inter } from "next/font/google";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import "react-loading-skeleton/dist/skeleton.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const { user } = useContext(TokenContext);
  const pathname = usePathname();

  useEffect(() => {
    if (!user && pathname.includes("/profile")) redirect("/");
  }, [pathname, user]);

  return (
    <html lang="en">
      <head>
        <title> Pome </title>
      </head>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
