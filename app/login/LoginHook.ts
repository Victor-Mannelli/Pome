import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { setCookie } from 'nookies';
import { api } from '@/utils/axios';

export function userLogin({ login, password, router, setUser }: {
  router: ReturnType<typeof useRouter>;
  password: string;
  login: string;
  setUser: Dispatch<SetStateAction<User>>
}) {

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
          router.push('/');
          return 'Logged In!';
        },
      },
      error: {
        render(e: any) {
          return toast.error("Error on login")
          // return e.data.message
          //   ? e.data.message
          //   : e.response?.data.length > 1
          //     ? e.response?.data.map((error: any) => toast.error(error))
          //     : e.response?.data[0];
        }
      }
    },
    { toastId: 'login' }
  );
}

interface User {
  user_id: string,
  username: string,
  email: string;
}