import { ToastError } from '@/utils/interfaces';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { setCookie } from 'nookies';
import { api } from '@/utils/axios';

export function userLogin({ login, password, router }: {
  router: ReturnType<typeof useRouter>;
  password: string;
  login: string;
}) {

  toast.promise(
    api.post('/users/login', { login, password })
      .then((response) => {
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
        render(e: ToastError | any) {
          console.log(e)
          return e.data.message
            ? e.data.message
            : e.response?.data.length > 1
              ? e.response?.data.map((error: any) => toast.error(error))
              : e.response?.data[0];
        }
      }
    },
    { toastId: 'login' }
  );
}
