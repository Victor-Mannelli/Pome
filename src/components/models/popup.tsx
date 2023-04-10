import { Dispatch, PropsWithChildren, SetStateAction } from 'react';

export default function PopUp(props: PropsWithChildren & { setShow: Dispatch<SetStateAction<boolean>>, show: boolean}) {
  return (
    <div
      className={`fixed top-0 left-0 h-screen w-full ${props.show ? 'flex' : 'hidden'} justify-center items-center z-50`}
      onClick={() => props.setShow(!props.show)}
    >
      {props.children}
    </div>
  );
}
