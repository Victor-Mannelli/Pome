/* eslint-disable react/no-unescaped-entities */
"use client"

import { userLogin } from '@/login/LoginHook';
import { useRouter } from 'next/navigation';
import { InputForm } from '@/components';
import React, { useState } from 'react';

export default function Login() {
  const [password, setPassword] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const router = useRouter();

  function submitLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    userLogin({
      login: e.target["username"].value,
      password: e.target["password"].value,
      router
    });
  }

  return (
    <div className="flex justify-center items-center w-full h-[calc(100vh-4rem)]">
      <div className="flex flex-col md:justify-start justify-center items-center md:w-[35rem] w-full md:h-fit pt-10 pb-5 h-full bg-second rounded-xl">
        <h1> Welcome Back! </h1>
        <form
          onSubmit={submitLogin}
          className="flex flex-col justify-center items-center w-full h-full px-16 py-10 gap-5"
        >
          <input
            className="w-full h-12 border-b-[3px] bg-transparent text-lg focus:border-b-2 duration-300 outline-none caret-white text-white pl-2 border-white"
            id="username"
            type='text'
            placeholder="Username or Email"
            required
          />
          <input
            className="w-full h-12 border-b-[3px] bg-transparent text-lg focus:border-b-2 duration-300 outline-none caret-white text-white pl-2 border-white"
            id="password"
            type='password'
            placeholder="Password"
            required
          />
          {/* <div className='w-full'> 
            <h2  
              className="text-lg w-[11.5rem] py-2 text-signature hover:cursor-pointer hover:text-h-signature"
              onClick={() => console.log('wasted')}
            > Forgot your password? </h2>
          </div> */}
          <button
            className="w-full md:w-full h-12 text-signature bg-fourth hover:bg-fifth place-self-center font-bold rounded-md text-lg"
            type="submit"
          >
            Log In
          </button>
          <div className="flex flex-col items-center mt-5" onClick={() => router.push('/registration')}>
            <p className='text-white text-lg cursor-pointer'> Don't have an account yet? </p>
            <p className="text-signature cursor-pointer hover:text-h-signature font-bold text-lg"> Create one! </p>
          </div>
        </form>
      </div>
    </div>
  );
}
