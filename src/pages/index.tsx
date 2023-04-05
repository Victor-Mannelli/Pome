import Image from 'next/image';
import nookies from 'nookies';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { userLogin } from '@/utils/handlers/handleLogin';

export default function Login() {
  // const cookies = nookies.get("token");
  const router = useRouter();
  const [fetchData, setFetchData] = useState({ email: '', password: '' });

  function handleChanges(e: React.ChangeEvent<HTMLInputElement>) {
    setFetchData({ ...fetchData, [e.target.name]: e.target.value });
  }

  function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // userLogin({ email: fetchData.email, password: fetchData.password, router });
    router.push('/PoMe/home');
  }

  return (
    <div className="flex justify-center items-center w-full h-[calc(100vh-4rem)]">
      <div className="flex flex-col md:justify-start justify-center items-center md:w-[23rem] w-full md:h-[80%] h-screen bg-second rounded-xl">
        <img src="/assets/dark_bg.jpg" alt="banner" className="rounded-xl w-[23rem] h-40 mb-5"/>
        <form onSubmit={login} className="flex flex-col justify-center w-4/5">
          <input
            className="w-full md:w-full h-12 border-b-[3px] bg-transparent focus:border-b-2 duration-300 outline-none caret-white text-white mb-3"
            name="email"
            type="email"
            placeholder="Email"
            value={fetchData.email}
            onChange={handleChanges}
          />
          <input
            className="w-full md:w-full h-12 border-b-[3px] bg-transparent focus:border-b-2 duration-300 outline-none caret-white text-white mb-7"
            name="password"
            type="password"
            placeholder="Password"
            value={fetchData.password}
            onChange={handleChanges}
          />
          <button
            className="w-full md:w-full h-12 text-signature bg-fourth hover:bg-fifth place-self-center font-bold rounded-md"
            type="submit"
          >
            Log In
          </button>
          <h4 className="text-sm text-center pt-2 hover:cursor-pointer hover:text-sixth"> Forgot your password? </h4>
        </form>
        <h4 
          className="text-sm pt-2 hover:cursor-pointer hover:text-sixth mt-10" 
          onClick={() => router.push('/pome/signup')}
        > Don't have an account yet? <span className="text-signature hover:text-h-signature font-bold"> Create one! </span>
        </h4>
      </div>
    </div>
  );
}
