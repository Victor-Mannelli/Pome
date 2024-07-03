'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useTransition } from 'react';
import { useLoading } from '@/utils/providers';
import NextLink from 'next/link';
import React from 'react';

export function Link({ href, children, replace, ...rest }: Parameters<typeof NextLink>[0]) {
  const [isPending, startTransition] = useTransition();
  const { setLoading } = useLoading();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setLoading(isPending);
  }, [isPending, setLoading]);

  return (
    <>
      {href ? (
        <NextLink
          href={href}
          className="cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            startTransition(() => {
              const url = href.toString();
              if (pathname === url) return;
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
      ) : (
        <>{children}</>
      )}
    </>
  );
}
