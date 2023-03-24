import Image from "next/image";
import nookies from "nookies";
import { useRouter } from "next/router";
import { useState } from "react";
import { userLogin } from "@/utils/handlers/handleLogin";

export default function Login() {
  // const cookies = nookies.get("token");
  const router = useRouter();
  const [fetchData, setFetchData] = useState({ email: "", password: "" });

  function handleChanges(e: React.ChangeEvent<HTMLInputElement>) {
		setFetchData({ ...fetchData, [e.target.name]: e.target.value });
	}

  function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    userLogin({ email: fetchData.email, password: fetchData.password, router });
  }

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="md:w-[30rem] md:h-auto h-screen bg-tertiary rounded-xl p-7">
        <Image 
          src="/assets/dark_bg.jpg"
          alt="banner"
          width={1920}
          height={1080}
          className="rounded-xl mb-7"
        />
        <form onSubmit={login}>
          <h1 className="font-bold"> Username </h1>
          <input
            className="w-full md:w-full h-12 border-b-[3px] bg-transparent focus:border-b-2 duration-300 outline-none caret-white text-white mb-7"
            name="email"
            type="email"
            value={fetchData.email}
            onChange={handleChanges}
          /> 
          <h1 className="font-bold"> Password </h1>
          <input
            className="w-full md:w-full h-12 border-b-[3px] bg-transparent focus:border-b-2 duration-300 outline-none caret-white text-white mb-7"
            name="password"
            type="password"
            value={fetchData.password}
            onChange={handleChanges}
          />
          <button
            className="w-full md:w-full h-12 text-white bg-secondary  hover:bg-quaternary place-self-center font-bold rounded-md"
            type="submit"
          >
            Log In
          </button>
        </form>
        <h1 
          onClick={() => router.push("/PoMe/signup")} 
          className="text-center pt-2 hover:cursor-pointer hover:text-quinary"
          > Don't have an account yet? Create one!
        </h1>
      </div>
    </div>
  )
}
