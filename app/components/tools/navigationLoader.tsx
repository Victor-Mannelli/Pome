'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';

export function Link({ href, children, replace, ...rest }: Parameters<typeof NextLink>[0]) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  if (isPending) {
    return (
      <div className="fixed inset-0 z-[19] w-full h-screen flex flex-col items-center justify-center gap-5 bg-fourth">
        <Image
          className='w-1/4 h-fit'
          src={'/loading-rikka.gif'}
          alt={'loading-rikka-giff'}
          width={1920}
          height={1080}
        />
        <h1 className='animate-pulse text-xl'> Loading... </h1>
      </div>
    );
  }

  return (
    <NextLink
      href={href}
      onClick={(e) => {
        e.preventDefault();
        startTransition(() => {
          const url = href.toString();
          if (replace) {
            router.replace(url);
          } else {
            router.push(url);
          }
        });
      }}
      {...rest}
    >
      {children}
    </NextLink>
  );
}