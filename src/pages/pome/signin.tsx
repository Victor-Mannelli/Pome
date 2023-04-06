import Image from 'next/image';
import nookies from 'nookies';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { userLogin } from '@/utils/handlers/loginHandler';
import InputForm from '@/components/models/inputForm';

export default function Login() {
  // const cookies = nookies.get("token");
  const router = useRouter();
  const [fetchData, setFetchData] = useState({ username: '', password: '' });

  function handleChanges(e: React.ChangeEvent<HTMLInputElement>) {
    setFetchData({ ...fetchData, [e.target.name]: e.target.value });
  }

  function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    userLogin({ email: fetchData.username, password: fetchData.password, router });
  }

  return (
    <div className="flex justify-center items-center w-full h-[calc(100vh-4rem)]">
      <div className="flex flex-col md:justify-start justify-center items-center md:w-1/2 w-full md:h-fit py-10 h-full bg-second rounded-xl">
        <h1> Welcome Back! </h1>
        <form onSubmit={login} className="flex flex-col justify-center items-center w-full h-full p-16 gap-5">
          <InputForm name="username" type="username" placeholder="Username" value={fetchData.username} onChange={handleChanges}/>
          <InputForm name="password" type="password" placeholder="Password" value={fetchData.password} onChange={handleChanges}/>
          <div className='w-full'>
            <h2 className="text-lg w-[11.5rem] py-2 text-signature hover:cursor-pointer hover:text-h-signature "> Forgot your password? </h2>
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
