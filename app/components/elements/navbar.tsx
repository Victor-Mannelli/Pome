import { usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { HoverDescription } from './hoverDescription';
import { SiNiconico } from '@/utils/libs';
import { Avatar } from '@chakra-ui/react';
import { TokenContext } from '@/utils';
import nookies from 'nookies';

export function Navbar() {
  const [show, setShow] = useState<boolean>(true);
  const cookies = nookies.get(null, 'token').token;
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useContext(TokenContext)

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
        <div className='relative redirectIconElement'>
          <Avatar
            className='hover:cursor-pointer'
            onClick={() => cookies ? router.push('/profile/1') : router.push('/login')}
            name={user ? user.username : null}
            src={user ? user.avatar : null}
          />
          <div className='bg-fifth w-5 h-5 -translate-x-1/2 left-1/2 top-[3.2rem] rotate-45 iconDescription'/>
          <div className='bg-fifth w-16 h-9 -translate-x-1/2 left-1/2 top-14 rounded-md iconDescription justify-center items-center text-white font-bold'>
            User
          </div>
        </div>
      </div>
    </div>
  );
}
