"use client";

import { usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { HoverDescription } from './hoverDescription';
import { Link } from '../tools/navigationLoader';
import { SiNiconico } from '@/utils/libs';
import { Avatar } from '@chakra-ui/react';
import { TokenContext, UseLogout } from '@/utils';
import { HoverList } from '../utilities';

export function Navbar() {
  const { user, setUser, setToken } = useContext(TokenContext);
  const [show, setShow] = useState<boolean>(true);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
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
      className={`flex justify-between items-center w-full h-16 px-10 z-20 bg-[#2c2e2f] hover:opacity-100
        ${pathname.startsWith('/anime') || pathname.startsWith('/profile') ? 'fixed opacity-70' : 'sticky opacity-100'}
        ${show ? 'top-0' : 'top-[-4rem]'} 
      `}
      style={{ transition: 'top 0.3s' }}
    >
      {/* 
        <Link href={"/"}>
          <RedirectionalIcon
            Icon={SiNiconico}
            title={'Home'}
          />
        </Link>
      */}
      <Link href={"/"}>
        <HoverDescription hoverText='Home'>
          <SiNiconico className="text-signature text-2xl cursor-pointer hover:brightness-75" />
        </HoverDescription>
      </Link>
      <div className='flex gap-28'>
        {/* 
          <Link href={'/notairedyet'}>
            <h2 className="hover:brightness-75 text-signature"> Not Aired Yet! </h2>
          </Link>
        */}
        {/* 
          <Link href={'/finished'}>
            <h2 className="hover:brightness-75 text-signature"> Finished </h2>
          </Link>
        */}
      </div>
      <div className="flex items-center gap-7">
        {/* 
          <Link href={user ? '/friends' : '/login'}>
            <RedirectionalIcon
              Icon={FaUserFriends}
              title={'Friends'}
            />
          </Link>
        */}
        <div className='relative redirectIconElement'>
          <Link href={user ? '/profile/1' : '/login'}>
            <Avatar
              cursor={"pointer"}
              name={user ? user.username : null}
              src={user ? user.avatar : null}
            />
          </Link>
          {user ? (
            <HoverList>
              <Link href={`/profile/${user.id}`}>
                <div className='hover:bg-fifth w-full px-4 py-2 cursor-pointer text-white'>
                  Profile
                </div>
              </Link>
              <Link
                href={'/'}
                onClick={() => UseLogout({ setToken, setUser })}
              >
                <div className='hover:bg-fifth w-full px-4 py-2 cursor-pointer text-white'>
                  Log out
                </div>
              </Link>
            </HoverList>
          ) : (
            // <HoverList>
            <div className={`flex-col items-end right-0 top-[1.5rem] -z-[1] bg-transparent pt-7 w-[6rem] iconDescription`}>
              <div className='triangle' ></div>
              <div className='bg-second py-2 rounded-md rounded-tr-none'>
                <Link href={'/login'}>
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
  );
}
