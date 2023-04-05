import Navbar from '@/components/navbar';
import '@/styles/globals.css';
import { lato } from '@/utils/fonts';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>P.o.Me</title>
      </Head>
      <main className={`${lato.variable} font-sans`}>
        {/* {
        router.pathname !== "/" && router.pathname !== "/PoMe/signup" 
        ? <Navbar/>
        : <></>
      } */}
        <Navbar/>
        <Component {...pageProps} />
      </main>
    </>
  );
}
