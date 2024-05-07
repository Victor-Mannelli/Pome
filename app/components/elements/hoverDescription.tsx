import { ReactNode } from "react";

export function HoverDescription({ children, hoverText }: {
  children: ReactNode;
  hoverText: string;
}) {
  return (
    <div className='relative redirectIconElement'>
      {children}
      <div className='iconDescription -translate-x-1/2 left-1/2 top-8 p-2 rotate-45 bg-fifth'></div>
      <div className='iconDescription -right-1 top-4 w-24 h-5 p-2' > </div>
      {/* <div className='iconDescription -right-1 top-9 flex-col gap-3 py-3 px-5 rounded-md bg-fifth'> */}
      <div className='iconDescription p-2 -translate-x-1/2 left-1/2 top-9 rounded-md bg-fifth'>
        <h1> {hoverText} </h1>
      </div>
    </div >
  )
}