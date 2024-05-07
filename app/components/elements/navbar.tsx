import { FaUserCircle, FaUserFriends, SiNiconico } from '@/utils/libs';
import { usePathname, useRouter } from 'next/navigation';
import { RedirectionalIcon } from '../utilities';
import { useEffect, useState } from 'react';
import nookies from 'nookies';
import { HoverDescription } from './hoverDescription';

export function Navbar() {
  const [show, setShow] = useState<boolean>(true);
  const cookies = nookies.get(null, 'token').token;
  const pathname = usePathname();
  const router = useRouter();

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
      className={`sticky flex justify-between items-center w-full h-16 px-10 z-20 bg-second hover:opacity-100
        ${pathname.startsWith('/anime') || pathname.startsWith('/profile') ? 'opacity-70' : 'opacity-100'}
        ${show ? 'top-0' : 'top-[-4rem]'} 
      `}
      style={{ transition: 'top 0.3s' }}
    >
      {/* <RedirectionalIcon
        Icon={SiNiconico}
        title={'Home'}
        onClick={() => router.push('/')}
      /> */}
      <HoverDescription hoverText='Home'>
        <SiNiconico
          className="text-signature text-2xl cursor-pointer hover:brightness-75"
          onClick={() => router.push('/')}
        />
      </HoverDescription>
      <div className='flex gap-28'>
        {/* <h2 className="hover:brightness-75 text-signature" onClick={() => router.push('/pome/notairedyet')}> Not Aired Yet! </h2> */}
        {/* <h2 className="hover:brightness-75 text-signature" onClick={() => router.push('/pome/finished')}> Finished </h2> */}
      </div>
      <div className="flex items-center gap-7">
        {/* <RedirectionalIcon
          Icon={FaUserFriends}
          title={'Friends'}
          onClick={() => cookies
            ? router.push('/pome/friends')
            : (router.push('/pome/login'), toast.error('log in first!'))
          }
        /> */}
        {/* <RedirectionalIcon
          Icon={FaUserCircle}
          title={'Profile'}
          onClick={() => cookies ? router.push('/profile/1') : router.push('/login')}
          router={router}
        /> */}
        {/* <HoverDescription hoverText='Profile'>
          <FaUserCircle
            className="text-signature text-2xl cursor-pointer hover:brightness-75"
            onClick={() => cookies ? router.push('/profile/1') : router.push('/login')}
          />
        </HoverDescription> */}
      </div>
    </div>
  );
}
