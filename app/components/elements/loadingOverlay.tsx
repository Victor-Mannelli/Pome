import { useLoading } from '@/utils/providers';
import Image from 'next/image';
import React from 'react';

export function LoadingOverlay() {
  const { isLoading } = useLoading();

  if (!isLoading) return null;
  return (
    <div className="fixed z-10 inset-0 w-full h-screen flex flex-col items-center justify-center gap-5 bg-fourth">
      <Image unoptimized className="w-1/4 h-fit" src={'/loading-rikka.gif'} alt={'loading-rikka-giff'} width={1920} height={1080} />
      <h1 className="animate-pulse text-xl">Loading...</h1>
    </div>
  );
}
