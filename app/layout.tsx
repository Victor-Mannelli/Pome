"use client";

import { TokenContext, TokenProvider } from "./utils/providers";
import { usePathname, redirect } from "next/navigation";
import { Navbar } from "./components/elements/navbar";
import { ChakraProvider } from '@chakra-ui/react';
import { useContext, useEffect } from "react";
import { Inter } from "next/font/google";
import { theme } from './utils/themes';
import "react-datepicker/dist/react-datepicker.css";
import 'react-loading-skeleton/dist/skeleton.css'
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const { user } = useContext(TokenContext);
  const pathname = usePathname();

  useEffect(() => {
    if (!user && pathname.includes("/profile")) redirect("/")
  }, [])

  return (
    <html lang="en">
      <head>
        <title> Pome </title>
      </head>
      <body className={inter.className}>
        <TokenProvider>
          <ChakraProvider theme={theme} toastOptions={{ defaultOptions: { position: 'top', duration: 5000 } }}>
            {/* <ThemeProvider> */}
            {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */}
            <Navbar />
            {children}
            {/* </ThemeProvider> */}
          </ChakraProvider>
        </TokenProvider>
      </body>
    </html>
  );
}
