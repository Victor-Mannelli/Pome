import Navbar from '@/components/navbar';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { lato } from '@/utils/fonts';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';

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
        <ToastContainer
          theme="dark"
          position="top-center"
          autoClose={1200}
        />
      </main>
    </>
  );
}
