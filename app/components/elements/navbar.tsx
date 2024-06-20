'use client';

import { TokenContext, VariablesContext, titlesFilterParser } from '@/utils';
import { FaUserFriends, SiNiconico } from '@/utils/libs';
import { useContext, useEffect, useState } from 'react';
import { Link } from '../tools/navigationLoader';
import { usePathname } from 'next/navigation';
import { UserDrawer } from './userDrawer';
import React from 'react';

export function Navbar() {
  const { user, setUser, setToken } = useContext(TokenContext);
  const { animelistTitle } = useContext(VariablesContext);
  const [show, setShow] = useState<boolean>(true);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let scrollPositionNow = window.scrollY;
      window.onscroll = function () {
        const currentScrollPos = window.scrollY;
        if ((scrollPositionNow < currentScrollPos || currentScrollPos === 0) && currentScrollPos <= document.body.offsetHeight - window.innerHeight) {
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
      style={{ transition: 'top 0.3s' }}
      className={`z-[99] flex justify-center w-full h-14 px-5 md:px-10 bg-[#2c2e2f] hover:opacity-100 
        ${pathname.startsWith('/anime') || pathname.startsWith('/profile') ? 'fixed opacity-70' : 'sticky opacity-100'}
        ${show ? 'top-0' : 'top-[-4rem]'} 
      `}
    >
      <div
        className={`flex justify-between items-center ${pathname === '/' ? 'xl:w-[62.6rem] lg:w-[52rem] md:w-[41.4rem] sm:w-[30.8rem] w-[24rem]' : 'w-full'}`}
      >
        <Link href={'/'}>
          <SiNiconico className="text-signature text-2xl cursor-pointer hover:brightness-75 mr-[18px]" />
        </Link>
        <Link href={'/'}>
          <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg cursor-pointer hover:text-signature transition-all">
            {' '}
            {animelistTitle ? titlesFilterParser[animelistTitle] : 'Anime List'}{' '}
          </h1>
        </Link>
        <div id="avatar" className="flex items-center gap-7">
          {user ? (
            <Link href={'/friends'}>
              <FaUserFriends className="text-signature text-3xl" />
            </Link>
          ) : null}
          <UserDrawer user={user} setUser={setUser} setToken={setToken} />
        </div>
      </div>
    </div>
  );
}
