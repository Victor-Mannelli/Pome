"use client";

import { useContext, useEffect, useState } from 'react';
import { HoverDescription } from './hoverDescription';
import { Link } from '../tools/navigationLoader';
import { usePathname } from 'next/navigation';
import { SiNiconico } from '@/utils/libs';
import { Avatar } from '@chakra-ui/react';
import { TokenContext } from '@/utils';

export function Navbar() {
  const [show, setShow] = useState<boolean>(true);
  const { user } = useContext(TokenContext)
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
      className={`flex justify-between items-center w-full h-16 px-10 z-20 bg-second hover:opacity-100
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
              className='cursor-pointer'
              name={user ? user.username : null}
              src={user ? user.avatar : null}
            />
            {user ?
              <>
                <div className='bg-fifth w-5 h-5 -translate-x-1/2 left-1/2 top-[3.2rem] rotate-45 iconDescription' />
                <div className='bg-fifth w-16 h-9 -translate-x-1/2 left-1/2 top-14 rounded-md iconDescription justify-center items-center text-white font-bold'>
                  User
                </div>
              </>
              : null}
          </Link>
        </div>
      </div>
    </div >
  );
}
