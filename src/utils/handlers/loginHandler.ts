import { setCookie } from 'nookies';
import { toast } from 'react-toastify';
import { LoginHandler } from '../Interfaces';
import { api } from '../axios';

export function userLogin({ email, password, router }: LoginHandler) {
  toast.promise(
    api
      .post('/signin', { email, password })
      .then((response) => {
        console.log(response);
        setCookie(null, 'token', response.data.token, {
          maxAge: 2 * 60 * 60,
          path: '/',
        });
      }),
    {
      pending: 'Logging in...',
      success: {
        render() {
          router.push('/pome/signin');
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
