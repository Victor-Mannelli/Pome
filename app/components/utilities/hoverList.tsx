import React from 'react';

export function HoverList({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`flex-col items-end right-0 top-[1.5rem] -z-[1] bg-transparent pt-7 w-[6rem] iconDescription
      ${className}
    `}
    >
      <div className="triangle"></div>
      <div className="bg-second py-2 rounded-md rounded-tr-none">{children}</div>
    </div>
  );
}
