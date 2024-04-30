"use client";

import { ThemeProvider, TokenProvider } from "./utils/providers";
import { Inter } from "next/font/google";
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
      </body>
    </html>
  );
}
