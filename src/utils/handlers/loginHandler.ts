import { setCookie } from 'nookies';
import { toast } from 'react-toastify';
import { LoginHandler } from '../Interfaces';
import { api } from '../axios';

export function userLogin({ login, password, router }: LoginHandler) {
  toast.promise(
    api
      .post('/signin', { login, password })
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
        render(e : any) {
          console.log(e);
          return e;
        }
      }
    },
    { toastId: 'login' }
  );
}
