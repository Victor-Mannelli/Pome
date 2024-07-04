import Image from 'next/image';
import React from 'react';

export default function LoadingOverlay() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-5 bg-fourth">
      <Image unoptimized className="w-1/4 h-fit" src={'/loading-rikka.gif'} alt={'loading-rikka-giff'} width={1920} height={1080} />
      <h1 className="animate-pulse text-xl">Loading...</h1>
    </div>
  );
}