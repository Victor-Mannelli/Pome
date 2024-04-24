"use client";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider, TokenProvider } from "./utils/providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <header>
        <title> Pome </title>
      </header>
      <body className={inter.className}>
        <TokenProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </TokenProvider>
      </body>
    </html>
  );
}
