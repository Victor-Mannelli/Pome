"use client";

import { ThemeProvider, TokenProvider } from "./utils/providers";
import { ToastContainer } from "react-toastify";
import { Inter } from "next/font/google";
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title> Pome </title>
      </head>
      <body className={inter.className}>
        <TokenProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </TokenProvider>
        <ToastContainer position="top-center" theme="dark" />
      </body>
    </html>
  );
}
