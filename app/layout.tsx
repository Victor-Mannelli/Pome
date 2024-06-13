'use client';

import { Navbar } from './components/elements/navbar';
import { Providers } from './utils/providers';
import { Inter } from 'next/font/google';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-loading-skeleton/dist/skeleton.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap', adjustFontFallback: false });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
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
