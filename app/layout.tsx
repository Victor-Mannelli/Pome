"use client";

import { ChakraProvider, ColorModeScript  } from '@chakra-ui/react';
import { ThemeProvider, TokenProvider } from "./utils/providers";
import { Navbar } from "./components/elements/navbar";
import { Loading } from "./components/utilities";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { theme } from './utils/themes';
import router from "next/router";
import "react-datepicker/dist/react-datepicker.css";
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

  const [loading, setLoading] = useState<boolean>(false);
  // const { pathname } = useRouter();
  // const router = useRouter();

  // useEffect(() => { checkToken(); }, []);

  useEffect(() => {
    router.events.on("routeChangeStart", () => setLoading(true));
    router.events.on("routeChangeComplete", () => setLoading(false));
    router.events.on("routeChangeError", () => setLoading(false));
    // const userData = localStorage.getItem("userData");
    // const userName = userData ? JSON.parse(userData).username : "";

    return () => {
      router.events.off("routeChangeStart", () => setLoading(true));
      router.events.off("routeChangeComplete", () => setLoading(false));
      router.events.off("routeChangeError", () => setLoading(false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <html lang="en">
      <head>
        <title> Pome </title>
      </head>
      <body className={inter.className}>
        <TokenProvider>
          <ChakraProvider theme={theme}>
            {/* <ThemeProvider> */}
            {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */}
            <Navbar />
            {loading ? <Loading /> : null}
            {children}
            {/* </ThemeProvider> */}
          </ChakraProvider>
        </TokenProvider>
        <ToastContainer position="top-center" theme="dark" />
      </body>
    </html>
  );
}
