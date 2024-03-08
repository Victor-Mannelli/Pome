import { FaUserCircle, FaUserFriends, SiNiconico } from '@/utils/libs';
import { RedirectionalIcon } from './redirectionalIcons';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import nookies from 'nookies';

export function Navbar() {
  const router = useRouter();
  const [show, setShow] = useState<boolean>(true);
  const cookies = nookies.get(null, 'token').token;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let scrollPositionNow = window.pageYOffset;
      window.onscroll = function () {
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
        ${show ? 'top-0' : 'top-[-4rem]'} 
        ${(router.pathname.startsWith('/pome/anime') || router.pathname.startsWith('/pome/profile')) ? 'fixed opacity-70' : 'sticky opacity-100'}`}
      style={{ transition: 'top 0.3s' }}
    >
      <RedirectionalIcon
        Icon={SiNiconico}
        title={'Home'}
        onClick={() => router.push('/')}
      />
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
        <RedirectionalIcon
          Icon={FaUserCircle}
          title={'Profile'}
          onClick={() => cookies
            ? router.push('/pome/profile/1')
            : router.push('/pome/login')
          }
          router={router}
        />
      </div>
    </div>
  );
}
