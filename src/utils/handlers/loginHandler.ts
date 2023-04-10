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
          maxAge: 2 * 60 * 60,
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
        render(e: ToastError | any) { 
          return e.data.response.data.message 
            ? e.data.response.data.message
            : 'Error while logging in';
        }
      }
    },
    { toastId: 'login' }
  );
}
