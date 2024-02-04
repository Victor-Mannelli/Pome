import { QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { queryClient, lato } from '@/utils';
import { Navbar } from '@/components';
import type { AppProps } from 'next/app';
import Head from 'next/head';
// import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  // const router = useRouter();
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>P.o.Me</title>
      </Head>
      <main className={`${lato.variable} font-sans`}>
        {/* {
        router.pathname !== "/" && router.pathname !== "/PoMe/signup" 
        ? <Navbar/>
        : <></>
      } */}
        <Navbar />
        <Component {...pageProps} />
        <ToastContainer
          theme="dark"
          position="top-center"
          autoClose={1500}
        />
      </main>
    </QueryClientProvider>
  );
}
