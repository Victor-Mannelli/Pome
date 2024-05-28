import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/utils/types';
import { setCookie } from 'nookies';
import { api } from '@/utils/axios';

export function userLogin({ login, password, router, setUser, setLoading, toast }: {
  setLoading: Dispatch<SetStateAction<boolean>>
  setUser: Dispatch<SetStateAction<User>>
  router: ReturnType<typeof useRouter>;
  password: string;
  login: string;
  toast: any;
}) {
  setLoading(true)
  toast.promise(
    api.post('/users/login', { login, password })
      .then((response) => {
        const decoded = JSON.parse(Buffer.from(response.data.token.split('.')[1], 'base64').toString());
        setUser(decoded);
        setCookie(null, 'token', response.data.token, {
          maxAge: 1 * 60 * 60 * 24, // 24 hrs
          path: '/',
        });
      }),
    {
      pending: 'Logging in...',
      success: {
        render() {
          setLoading(false);
          router.push('/');
          return 'Logged In!';
        },
      },
      error: {
        render() {
          setLoading(false);
          return "Error on login"
        }
      }
    },
    { toastId: 'login' }
  );
}

