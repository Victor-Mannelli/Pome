'use client';

import { Link, SignatureInput } from '@/components/tools';
import { Button, useToast } from '@chakra-ui/react';
import { userLogin } from '@/login/functions';
import { useRouter } from 'next/navigation';
import { TokenContext } from '@/utils';
import React from 'react';

export default function Login() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { setUser } = React.useContext(TokenContext);
  const router = useRouter();
  const toast = useToast();

  function submitLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    userLogin({
      login: e.target['username'].value,
      password: e.target['password'].value,
      setLoading,
      setUser,
      router,
      toast,
    });
  }

  return (
    <div className="flex justify-center items-center w-full h-[calc(100vh-4rem)]">
      <div className="flex flex-col md:justify-start justify-center items-center md:w-[35rem] w-full md:h-fit pt-10 pb-5 sm:h-full h-[calc(100vh-3rem)] bg-second sm:rounded-xl">
        <form onSubmit={(e) => submitLogin(e)} className="flex flex-col justify-center items-center w-full h-full px-16 pb-10 gap-5">
          <h1 className="pb-4 pt-2"> Welcome Back! </h1>
          <SignatureInput id="username" placeholder={'Username or Email'} label={'Username or Email'} />
          <SignatureInput id="password" placeholder={'Password'} label={'Password'} type={'password'} />
          {/* <input
            className="w-full h-12 border-b-[3px] bg-transparent text-lg focus:border-b-2 duration-300 outline-none caret-white text-white pl-2 border-white"
            placeholder="Username or Email"
            id="username"
            type="text"
            required
          />
          <input
            className="w-full h-12 border-b-[3px] bg-transparent text-lg focus:border-b-2 duration-300 outline-none caret-white text-white pl-2 border-white"
            placeholder="Password"
            type="password"
            id="password"
            required
          /> */}
          {/*
            <div className='w-full'> 
              <h2  
                className="text-lg w-[11.5rem] py-2 text-signature hover:cursor-pointer hover:text-h-signature"
                onClick={() => console.log('wasted')}
              >
                Forgot your password? 
              </h2>
            </div> 
          */}
          <Button
            className="w-full md:w-full h-12 text-signature bg-fourth hover:bg-fifth place-self-center font-bold rounded-md text-lg"
            textColor={'text-signature'}
            _hover={'hover:bg-fifth'}
            isDisabled={loading}
            isLoading={loading}
            bg={'bg-fourth'}
            type={'submit'}
          >
            Log In
          </Button>
          <Link href={'/registration'}>
            <div className="flex flex-col items-center mt-5">
              <p className="text-white text-lg cursor-pointer"> Don&apos;t have an account yet? </p>
              <p className="text-signature cursor-pointer hover:text-h-signature font-bold text-lg"> Create one! </p>
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
}
