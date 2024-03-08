import { IconType } from 'react-icons/lib';
import { MouseEventHandler } from 'react';
import { NextRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { UserSettings } from './users';

export function RedirectionalIcon({ Icon, className, title, onClick, router }: {
  onClick: MouseEventHandler;
  router?: NextRouter;
  className?: string;
  Icon: IconType;
  title: string;
}) {
  const token = parseCookies(null).token;

  return (
    <div className='relative redirectIconElement'>
      {// token && title === 'Profile' ?
        // eslint-disable-next-line no-constant-condition
        false ?
          <img
            // src={user.profilePicture}
            className='rounded-full '
          /> :
          <Icon
            className={`${className} text-signature text-2xl cursor-pointer hover:brightness-75`}
            onClick={onClick}
          />
      }
      {token && title === 'Profile' ?
        <UserSettings
          onClick={onClick}
          router={router}
          Icon={Icon}
        /> :
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
