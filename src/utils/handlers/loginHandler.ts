import { setCookie } from 'nookies';
import { toast } from 'react-toastify';
import { api } from '../axios';
import { useRouter } from 'next/router';
import { ToastError } from '../Interfaces';

export function userLogin({
  login,
  password,
  router
}: {
  login: string,
  password: string,
  router: ReturnType<typeof useRouter>
}) {
  toast.promise(
    api.post('/signin', { login, password })
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
          return e.data.response.data.message
            ? e.data.response.data.message
            : e.response.data.length > 1
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ? e.response.data.map((error: any) => toast.error(error))
              : toast.error(e.response.data[0]);
        }
      }
    },
    { toastId: 'login' }
  );
}
