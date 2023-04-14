import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaUserFriends, FaUserCircle } from 'react-icons/fa';
import { SiNiconico } from 'react-icons/si';
import { toast } from 'react-toastify';
import nookies from 'nookies';

export default function Navbar() {
  const router = useRouter();
  const [show, setShow] = useState<boolean>(true);
  const cookies = nookies.get(null, 'token').token;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let scrollPositionNow = window.pageYOffset;
      window.onscroll = function() {
        const currentScrollPos = window.pageYOffset;
        if (scrollPositionNow < currentScrollPos || currentScrollPos === 0) {
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
      className={`w-full bg-second hover:opacity-100 h-16 flex justify-between items-center px-10 z-20
        ${ show ? 'top-0' : 'top-[-4rem]' } 
        ${(router.pathname.startsWith('/pome/anime') || router.pathname.startsWith('/pome/profile')) ? 'fixed opacity-70' : 'sticky opacity-100' }`}
      style={{ transition: 'top 0.3s' }}
    >
      <SiNiconico onClick={() => router.push('/')} className="text-signature text-2xl cursor-pointer hover:text-h-signature "/>
      <div>
        <h2 className="hover:text-h-signature text-signature text-xl" onClick={() => router.push('/pome/releases/1')}> Not Aired Yet! </h2>
      </div>
      <div className="flex items-center gap-7">
        <FaUserFriends 
          className="text-signature text-2xl cursor-pointer hover:text-h-signature"
          onClick={() => { 
            cookies 
              ? router.push('/pome/friends')
              : (router.push('/pome/signin'), toast.error('log in first!'));
          }} 
        />
        <FaUserCircle 
          onClick={() => { cookies ? router.push('/pome/profile/1') : router.push('/pome/signin'); }} 
          className="text-signature text-2xl cursor-pointer hover:text-h-signature"
        />
      </div>
    </div>
  );
}
