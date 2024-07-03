'use client';

import { LoadingOverlay, Navbar } from './components/elements';
import { redirect, usePathname } from 'next/navigation';
import { Providers } from './utils/providers';
import { Inter } from 'next/font/google';
import React, { useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-loading-skeleton/dist/skeleton.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap', adjustFontFallback: false });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && pathname == '/login') redirect('/');
    if (!token && (pathname.includes('/profile') || pathname.includes('/friends'))) redirect('/');
  }, [pathname]);

  return (
    <html lang="en">
      <head>
        <title> Pome </title>
      </head>
      <body className={inter.className}>
        <Providers>
          <LoadingOverlay />
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
