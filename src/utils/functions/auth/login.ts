import { ToastError } from '@/utils/interfaces';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { setCookie } from 'nookies';
import { api } from '@/utils/axios';

export function userLogin({ login, password, router }: {
  login: string,
  password: string,
  router: ReturnType<typeof useRouter>
}) {
  toast.promise(
    api.post('/users/login', { login, password })
      .then((response) => {
        setCookie(null, 'token', response.data.token, {
          maxAge: 1 * 60 * 60 * 60,
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        render(e: ToastError | any) {
          return e.data.message
            ? e.data.message
            : e.response?.data.length > 1
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ? e.response?.data.map((error: any) => toast.error(error))
              : e.response?.data[0];
        }
      }
    },
    { toastId: 'login' }
  );
}
