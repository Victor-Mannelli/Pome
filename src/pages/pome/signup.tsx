import { SignupFetchData } from "@/utils/Interfaces";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SignUp() {
  const router = useRouter();
  const [image, setImage] = useState<any>(null);
  const [fetchData, setFetchData] = useState<SignupFetchData>({ email: "", password: "", confirmPassword: "", userBanner: "" });
  const [focus, setFocus] = useState<boolean>(false)

  function handleChanges(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.name === "userBanner") {
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
    <div className="flex justify-center items-center w-full h-screen">
      <div className="md:w-[30rem] md:h-auto h-screen bg-third rounded-xl p-7">
        <form onSubmit={register}>
          {image ? (
            <>
              <Image
                src={image}
                alt="user_banner"
                width={1920}
                height={1080}
                className="rounded-xl"
              />
              <h1
                className="mb-5 mt-1 hover:cursor-pointer hover:text-fifth underline"
                onClick={() => {
                  setImage(null);
                  focus === true ? setFocus(false) : "";
                }}
              > change image here </h1>
            </>
          ) : (
            <>
              <h1 className="font-bold mb-3"> Banner </h1>
              <div className={`relative w-full flex items-center h-24 border-solid border-2 rounded-md mb-3 px-5 
                ${focus === true ? "bg-fourth" : "bg-second"}`
              }>
                <h1 className="border p-2 mr-5 text-sm uppercase cursor-pointer rounded-md"> Choose Image </h1>
                <h1> or drag and drop your file here</h1>
                <input
                  className="opacity-0 hover:cursor-pointer bg-black absolute top-0 left-0 w-full h-full"
                  type="file"
                  name="userBanner"
                  onChange={(e) => {
                    handleImageInput(e)
                    handleChanges(e)
                  }}
                  onDragEnter={() => setFocus(!focus)}
                  onDragLeave={() => setFocus(!focus)}
                  />
              </div>
            </>
          )}
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
          <h1 className="font-bold"> Confirm Password </h1>
          <input
            className="w-full md:w-full h-12 border-b-[3px] bg-transparent focus:border-b-2 duration-300 outline-none caret-white text-white mb-7"
            name="confirmPassword"
            type="confirmPassword"
            value={fetchData.confirmPassword}
            onChange={handleChanges}
          />
          <button
            className="w-full md:w-full h-12 text-white bg-second  hover:bg-fourth place-self-center font-bold rounded-md"
            type="submit"
          >
            Register
          </button>
          <h1
            onClick={() => router.push("/")}
            className="text-center pt-2 hover:cursor-pointer hover:text-sixth"
          > Already have an account? Log In!
          </h1>
        </form>
      </div>
    </div>
  )
}