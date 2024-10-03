import { Dispatch, ReactNode, SetStateAction } from 'react';

export function CustomModal({
  className,
  bg = true,
  children,
  setShow,
  show,
}: {
  setShow: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  className?: string;
  show: boolean;
  bg?: boolean;
}) {
  return (
    <div
      className={`fixed z-10 inset-0 flex items-center justify-center h-screen w-full cursor-default 
        ${bg ? 'bg-black bg-opacity-40' : ''} 
        ${show ? 'block' : 'hidden'}
        ${className}
      `}
      onClick={(e) => {
        e.stopPropagation();
        setShow(!show);
      }}
    >
      {children}
    </div>
  );
}
