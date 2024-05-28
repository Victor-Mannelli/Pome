"use client";

import { Navbar } from "./components/elements/navbar";
import { ChakraProvider  } from '@chakra-ui/react';
import { TokenProvider } from "./utils/providers";
import { Inter } from "next/font/google";
import { theme } from './utils/themes';
import "react-datepicker/dist/react-datepicker.css";
import 'react-loading-skeleton/dist/skeleton.css'
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
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
            {children}
            {/* </ThemeProvider> */}
          </ChakraProvider>
        </TokenProvider>
      </body>
    </html>
  );
}
