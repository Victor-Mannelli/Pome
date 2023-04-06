import { SignupFetchData } from '@/utils/Interfaces';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';

export default function SignUp() {
  const router = useRouter();
  const [image, setImage] = useState<any>(null);
  const [fetchData, setFetchData] = useState<SignupFetchData>({ email: '', username: '', password: '', confirmPassword: '', userBanner: '' });
  const [focus, setFocus] = useState<boolean>(false);

  function handleChanges(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.name === 'userBanner') {
      // setFetchData({ ...fetchData, [e.target.name]: e.});
    } else {
      setFetchData({ ...fetchData, [e.target.name]: e.target.value });
    }
  }
  function register(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // userLogin({ email: fetchData.email, password: fetchData.password, router });
  }
  const handleImageInput = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex justify-center items-center w-full h-[calc(100vh-4rem)]">
      <div className="flex flex-col md:justify-center justify-center items-center md:w-1/2 md:py-10 md:h-fit w-full h-screen bg-second rounded-xl">
        <h1> Welcome! </h1>
        {/* {image ? (
          <div className="relative mb-2">
            <img src={image} alt="user_banner" className="rounded-xl w-[23rem] h-44"/>
            <RxCross2 
              className="absolute top-3 right-3 w-6 h-6 rounded-full border bg-opacity-20 bg-white text-white cursor-pointer"
              onClick={() => {
                setImage(null);
                focus === true ? setFocus(false) : '';
              }}
            />
          </div>
        ) : null} */}
        <form onSubmit={register} className="flex flex-col justify-center w-full gap-5 p-16">
          {/* {!image ? (
            <div className={`relative w-full flex items-center h-[8.25rem] border-solid border-2 rounded-md mb-5 mt-8 px-5 
              ${focus === true ? 'bg-fourth' : 'bg-second'}`
            }>
              <h3 className="border p-2 mr-5 text-sm uppercase cursor-pointer rounded-md text-center"> Choose Banner </h3>
              <h3 className="text-sm"> or drag and drop your file here</h3>
              <input
                className="opacity-0 hover:cursor-pointer bg-black absolute top-0 left-0 w-full h-full"
                type="file"
                name="userBanner"
                onChange={(e) => {
                  handleImageInput(e);
                  handleChanges(e);
                }}
                onDragEnter={() => setFocus(!focus)}
                onDragLeave={() => setFocus(!focus)}
              />
            </div>
          ) : null } */}
          <input
            className="w-full md:w-full h-12 border-b-[3px] bg-transparent text-lg focus:border-b-2 duration-300 outline-none caret-white text-white"
            name="email"
            type="email"
            placeholder="Email"
            value={fetchData.email}
            onChange={handleChanges}
          />  
          <input
            className="w-full md:w-full h-12 border-b-[3px] bg-transparent text-lg focus:border-b-2 duration-300 outline-none caret-white text-white"
            name="username"
            type="username"
            placeholder="Username"
            value={fetchData.username}
            onChange={handleChanges}
          />
          <input
            className="w-full md:w-full h-12 border-b-[3px] bg-transparent text-lg focus:border-b-2 duration-300 outline-none caret-white text-white"
            name="password"
            type="password"
            placeholder="Password"
            value={fetchData.password}
            onChange={handleChanges}
          />
          <input
            className="w-full md:w-full h-12 border-b-[3px] bg-transparent text-lg focus:border-b-2 duration-300 outline-none caret-white text-white mb-7"
            name="confirmPassword"
            type="confirmPassword"
            placeholder="Confirm Password"
            value={fetchData.confirmPassword}
            onChange={handleChanges}
          />
          <button
            className="w-full md:w-full text-lg h-12 text-signature bg-fourth hover:bg-fifth place-self-center font-bold rounded-md"
            type="submit"
          > Register
          </button>
        </form>
        <h4 
          className="text-lg pt-2 hover:cursor-pointer hover:text-sixth mt-2" 
          onClick={() => router.push('/')}
        >  Already have an account? <span className="text-signature hover:text-h-signature font-bold text-lg"> Log In! </span>
        </h4>
      </div>
    </div>
  );
}
