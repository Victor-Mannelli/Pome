import { AuthRedirect } from '@/components/tools/authRedirect';
import { Navbar } from './components/elements';
import { Providers } from './utils/providers';
import { Inter } from 'next/font/google';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-loading-skeleton/dist/skeleton.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap', adjustFontFallback: false });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Pome</title>
      </head>
      <body className={inter.className}>
        <Providers>
          <AuthRedirect />
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
