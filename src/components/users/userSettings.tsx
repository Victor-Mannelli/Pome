import { logOut } from '@/utils/functions';
import { MouseEventHandler } from 'react';
import { NextRouter } from 'next/router';
import { IconType } from 'react-icons';
import { ImExit } from '@/utils/libs';

export function UserSettings({ Icon, onClick, router }: {
  onClick: MouseEventHandler,
  router?: NextRouter
  Icon: IconType,
}) {
  return (
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
  )
}