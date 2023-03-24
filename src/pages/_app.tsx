import Navbar from "@/components/navbar";
import "@/styles/globals.css";
import { lato } from "@/utils/fonts";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

	return (
    <main className={`${lato.variable} font-sans`}>
      {router.pathname !== "/" && router.pathname !== "/PoMe/signup" 
      ? <Navbar/>
      : <></>
      }
      <Component {...pageProps} />
    </main>
  );
}
