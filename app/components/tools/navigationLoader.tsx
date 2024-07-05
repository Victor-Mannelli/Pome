'use client';

import { usePathname, useRouter } from 'next/navigation';
import NextLink from 'next/link';
import React from 'react';

export function Link({ href, children, replace, ...rest }: Parameters<typeof NextLink>[0]) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      {href ? (
        <NextLink
          href={href}
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            const url = href.toString();
            if (pathname === url) return;
            if (replace) {
              router.replace(url);
            } else {
              router.push(url);
            }
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
