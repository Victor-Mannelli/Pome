import { userLogin } from "@/utils/handlers/handleLogin";
import Image from "next/image";
import { useRouter } from "next/router";
import nookies from "nookies";
import { useState } from "react";

export default function Login() {
  // const cookies = nookies.get("token");
  const router = useRouter();
  const [fetchData, setFetchData] = useState({ email: "", password: "" });

  function handleChanges(e: React.ChangeEvent<HTMLInputElement>) {
		setFetchData({ ...fetchData, [e.target.name]: e.target.value });
	}

  console.log(fetchData);

  function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // userLogin({ email: fetchData.email, password: fetchData.password, router });
  }

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="w-2/5 h-3/5 bg-tertiary rounded-xl p-7">
        <Image 
          src="/assets/dark_bg.jpg"
          alt="banner"
          width={1920}
          height={1080}
        />
        <form onSubmit={login}>
          <input
            className="w-full md:w-full h-12 border-b-4 bg-transparent focus:border-b-8 duration-300 outline-none caret-white text-white"
            name="email"
            type="email"
            placeholder="email"
            value={fetchData.email}
            onChange={handleChanges}
          /> 
          <input
            className="w-full md:w-full h-12 border-b-4 bg-transparent focus:border-b-8 duration-300 outline-none caret-white text-white"
            name="password"
            placeholder="password"
            type="password"
            value={fetchData.password}
            onChange={handleChanges}
          />
        <button
          className="w-6/12 h-12 text-white bg-slate-900 hover:bg-slate-700 place-self-center font-bold rounded-md"
          type="submit"
        >
          Log In
        </button>
        </form>
      </div>
    </div>
  )
}
