"use client";

import { Button, useToast } from "@chakra-ui/react";
import { userRegistration } from "./functions";
import { useRouter } from "next/navigation";
import { Link } from "@/components/tools";
import React, { useState } from "react";

export default function Registration() {
  const [loading, setLoading] = useState<boolean>(false);
  const [match, setMatch] = useState(true);
  const router = useRouter();
  const toast = useToast();
  // const [image, setImage] = useState<any>(null);
  // const [focus, setFocus] = useState<boolean>(false);

  // function handleChanges(e: React.ChangeEvent<HTMLInputElement>) {
  //   if (e.target.name === "userBanner") {
  //     // setFetchData({ ...fetchData, [e.target.name]: e.});
  //   } else {
  //     setFetchData({ ...fetchData, [e.target.name]: e.target.value });
  //   }
  // }
  // const handleImageInput = (event: any) => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     setImage(reader.result);
  //   };
  //   reader.readAsDataURL(file);
  // };

  function register(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (e.target["Password"].value !== e.target["Confirm Password"].value) {
      setMatch(false);
      toast({
        title: "Password confirmation denied!",
        status: "error",
        isClosable: true,
      });
      return;
    }
    const userData = {
      email: e.target["Email"].value,
      username: e.target["Username"].value,
      password: e.target["Password"].value,
      confirmPassword: e.target["Confirm Password"].value,
    };
    userRegistration({
      setLoading,
      userData,
      router,
      toast
    });
  }

  return (
    <div className="flex justify-center items-center w-full h-[calc(100vh-4rem)]">
      <div className="flex flex-col md:justify-center justify-center items-center md:w-[35rem] md:py-10 md:h-fit w-full h-screen bg-second rounded-xl">
        <h1> Welcome! </h1>
        {/* {image ? (
          <div className="relative mb-2">
            <Image src={image} alt="user_banner" className="rounded-xl w-[23rem] h-44"/>
            <RxCross2 
              className="absolute top-3 right-3 w-6 h-6 rounded-full border bg-opacity-20 bg-white text-white cursor-pointer"
              onClick={() => {
                setImage(null);
                focus === true ? setFocus(false) : '';
              }}
            />
          </div>
        ) : null} */}
        <form onSubmit={register} className="flex flex-col justify-center w-full gap-5 px-16 py-10">
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
          {["Email", "Username", "Password", "Confirm Password"].map((e: string) => {
            const type = e === "Email" ? "email" : e === "Password" || e === "Confirm Password" ? "password" : "text";
            return (
              <input
                key={e}
                id={e}
                placeholder={e}
                type={type}
                required
                onChange={() => { if (!match && type === "password") setMatch(true); }}
                className={`w-full md:w-full h-12 border-b-[3px] bg-transparent text-lg focus:border-b-2 duration-300 outline-none caret-white text-white pl-2
                  ${type === "password" && match === false ? "border-red-600" : "border-white"}`
                }
              />
            );
          })}
          <Button
            textColor={"text-signature"}
            bg={"bg-fourth"}
            _hover={"hover:bg-fifth"}
            className="w-full md:w-full text-lg h-12 mt-7 text-signature bg-fourth hover:bg-fifth place-self-center font-bold rounded-md"
            type="submit"
            isLoading={loading}
            isDisabled={loading}
          >
            Register
          </Button>
        </form>
        <Link href={"/login"}>
          <div className="flex gap-1">
            <p className='text-white text-lg cursor-pointer'> Already have an account? </p>
            <p className="text-signature cursor-pointer hover:text-h-signature font-bold text-lg"> Log In! </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
