import Navbar from "@/components/navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  console.log(router.pathname)
	return (
    <>
      {router.pathname !== "/" && router.pathname !== "/PoMe/signup" 
      ? <Navbar/>
      : <></>
      }
      <Component {...pageProps} />
    </>
  );
}
