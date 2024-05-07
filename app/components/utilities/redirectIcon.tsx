import { IconType } from 'react-icons/lib';
import { MouseEventHandler } from 'react';
import { ImExit, logOut } from '@/utils';
// import { NextRouter } from 'next/navigation';
import { parseCookies } from 'nookies';

export function RedirectionalIcon({ Icon, className, title, onClick, router }: {
  onClick: MouseEventHandler;
  className?: string;
  Icon: IconType;
  title: string;
  router?: any;
}) {
  const token = parseCookies(null).token;

  return (
    <div className='relative redirectIconElement'>
      {// token && title === 'Profile' ?
        // eslint-disable-next-line no-constant-condition
        false ?
          <img
            alt='profilePicture'
            // src={user.profilePicture}
            className='rounded-full '
          /> :
          <Icon
            className={`${className} text-signature text-2xl cursor-pointer hover:brightness-75`}
            onClick={onClick}
          />
      }
      {token && title === 'Profile' ?
        (
          <>
            <div className='iconDescription -translate-x-1/2 left-1/2 top-8 p-2 rotate-45 bg-fifth'></div>
            <div className='iconDescription -right-1 top-4 w-24 h-5 p-2' > </div>
            <div className='iconDescription -right-1 top-9 flex-col gap-3 py-3 px-5 rounded-md bg-fifth'>
              {router?.pathname.includes('profile') ? null :
                <div
                  className='flex items-center gap-2 text-lg text-signature hover:cursor-pointer hover:brightness-75'
                  onClick={onClick}
                >
                  <Icon />
                  <h1 className='hover:cursor-pointer'> Profile </h1>
                </div>
              }
              <div
                className='flex items-center gap-2 text-lg text-signature hover:cursor-pointer hover:brightness-75'
                onClick={() => router && logOut(router)}
              >
                <ImExit />
                <h1 className='hover:cursor-pointer'> Leave </h1>
              </div>
            </div>
          </>
        ) :
        <>
          <div className='iconDescription p-2 -translate-x-1/2 left-1/2 top-8 rotate-45 bg-fifth'></div>
          <div className='iconDescription p-2 -translate-x-1/2 left-1/2 top-9 rounded-md bg-fifth'>
            <h1> {title} </h1>
          </div>
        </>
      }
    </div >
  )
}
