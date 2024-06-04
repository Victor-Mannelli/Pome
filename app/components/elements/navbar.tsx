"use client";

import { TokenContext, VariablesContext, logout, titlesFilterParser } from "@/utils";
import { useContext, useEffect, useState } from "react";
import { HoverDescription } from "./hoverDescription";
import { Avatar, useToast } from "@chakra-ui/react";
import { Link } from "../tools/navigationLoader";
import { usePathname } from "next/navigation";
import { SiNiconico } from "@/utils/libs";
import { HoverList } from "../utilities";
import React from "react";

export function Navbar() {
  const { user, setUser, setToken } = useContext(TokenContext);
  const { animelistTitle } = useContext(VariablesContext);
  const [show, setShow] = useState<boolean>(true);
  const pathname = usePathname();
  const toast = useToast();

  useEffect(() => {
    if (typeof window !== "undefined") {
      let scrollPositionNow = window.scrollY;
      window.onscroll = function () {
        const currentScrollPos = window.scrollY;
        if ((scrollPositionNow < currentScrollPos || currentScrollPos === 0) && currentScrollPos <= (document.body.offsetHeight - window.innerHeight)) {
          setShow(true);
        } else {
          setShow(false);
        }
        scrollPositionNow = currentScrollPos;
      };
    }
  }, []);

  return (
    <div
      style={{ transition: "top 0.3s" }}
      className={`z-[99] flex justify-center w-full h-14 px-5 md:px-10 bg-[#2c2e2f] hover:opacity-100 
        ${pathname.startsWith("/anime") || pathname.startsWith("/profile") ? "fixed opacity-70" : "sticky opacity-100"}
        ${show ? "top-0" : "top-[-4rem]"} 
      `}
    >
      <div className={`flex justify-between items-center ${pathname.startsWith("/anime") ? "w-full" : "xl:w-[62.6rem] lg:w-[52rem] md:w-[41.4rem] sm:w-[30.8rem] w-[24rem]"}`}>
        <Link href={"/"}>
          <HoverDescription hoverText='Home'>
            <SiNiconico className="text-signature text-3xl cursor-pointer hover:brightness-75 mr-[18px]" />
          </HoverDescription>
        </Link>
        <Link href={"/"}>
          <h1 className='text-lg cursor-pointer hover:text-signature transition-all'> {animelistTitle ? titlesFilterParser[animelistTitle] : "Anime List"} </h1>
        </Link>
        {/* <div className='flex gap-28'>
          <Link href={'/notairedyet'}>
            <h2 className="hover:brightness-75 text-signature"> Not Aired Yet! </h2>
          </Link>
          <Link href={'/finished'}>
            <h2 className="hover:brightness-75 text-signature"> Finished </h2>
          </Link>
        </div> */}
        <div id='avatar' className="flex items-center gap-7">
          {/* 
          <Link href={user ? '/friends' : '/login'}>
            <RedirectionalIcon
              Icon={FaUserFriends}
              title={'Friends'}
            />
          </Link>
        */}
          <div className='relative redirectIconElement py-2'>
            <Link href={user ? "/profile/1" : "/login"}>
              <Avatar
                cursor={"pointer"}
                name={user ? user.username : null}
              // src={user ? user.avatar : null}
              />
            </Link>
            {user ? (
              <HoverList>
                <Link href={`/profile/${user.user_id}`}>
                  <div className='hover:bg-fifth w-full px-4 py-2 cursor-pointer text-white'>
                    Profile
                  </div>
                </Link>
                <Link
                  href={"/"}
                  onClick={() => logout({ setToken, setUser, toast })}
                >
                  <div className='hover:bg-fifth w-full px-4 py-2 cursor-pointer text-white'>
                    Log out
                  </div>
                </Link>
              </HoverList>
            ) : (
              // <HoverList>
              <div className={"hover:flex flex-col items-end right-0 top-[2.2rem] -z-[1] bg-transparent pt-7 w-[6rem] iconDescription"}>
                <div className='triangle' ></div>
                <div className='bg-second py-2 rounded-md rounded-tr-none'>
                  <Link href={"/login"}>
                    <div className='hover:bg-fifth w-full px-6 py-1 cursor-pointer text-white'>
                      Log in
                    </div>
                  </Link>
                </div>
              </div>
              // </HoverList>
            )}
          </div>
        </div >
      </div >
    </div >
  );
}
