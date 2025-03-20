'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function AuthRedirect() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && pathname === '/login') router.push('/');
    if (!token && (pathname.includes('/profile') || pathname.includes('/friends'))) router.push('/');
  }, [pathname, router]);

  return null;
}
