import { Dispatch, PropsWithChildren, SetStateAction } from 'react';

export function PopUp(props: PropsWithChildren & { setShow: Dispatch<SetStateAction<boolean>>, show: boolean, bg?: boolean}) {
  return (
    <div
      className={`fixed top-0 left-0 h-screen w-full ${props.show ? 'flex' : 'hidden'} ${props.bg ? 'bg-black bg-opacity-50' : ''} justify-center items-center z-50`}
      onClick={() => props.setShow(!props.show)}
    >
      {props.children}
    </div>
  );
}
