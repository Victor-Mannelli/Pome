import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { userLogin } from '@/utils/handlers/loginHandler';
import InputForm from '@/components/models/inputForm';

export default function Login() {
  const router = useRouter();
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function submitLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    userLogin({ login, password, router });
  }

  return (
    <div className="flex justify-center items-center w-full h-[calc(100vh-4rem)]">
      <div className="flex flex-col md:justify-start justify-center items-center md:w-[35rem] w-full md:h-fit py-10 h-full bg-second rounded-xl">
        <h1> Welcome Back! </h1>
        <form onSubmit={submitLogin} className="flex flex-col justify-center items-center w-full h-full p-16 gap-5">
          <InputForm 
            name="username" 
            type="username" 
            placeholder="Username or Email" 
            value={login} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)}
          />
          <InputForm 
            name="password" 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
          <div className='w-full'>
            <h2  
              className="text-lg w-[11.5rem] py-2 text-signature hover:cursor-pointer hover:text-h-signature "
              onClick={() => console.log('wasted')}
            > Forgot your password? </h2>
          </div>
          <button
            className="w-full md:w-full h-12 text-signature bg-fourth hover:bg-fifth place-self-center font-bold rounded-md text-lg"
            type="submit"
          >
            Log In
          </button>
          <div className='w-full flex justify-center'>
            <h4 
              className="text-lg w-[19.5rem] hover:cursor-pointer hover:text-sixth" 
              onClick={() => router.push('/pome/signup')}
            > Don't have an account yet? <span className="text-signature font-bold"> Create one! </span>
            </h4>
          </div>
        </form>
      </div>
    </div>
  );
}
