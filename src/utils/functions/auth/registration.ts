import { api } from '../../axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { ToastError } from '../../interfaces';

export function userRegistration({ email, username, password, confirmPassword, router }: {
  email: string,
  username: string,
  password: string,
  confirmPassword: string,
  router: ReturnType<typeof useRouter>
}) {
  toast.promise(
    api.post('/users/register', { email, username, password, confirmPassword }),
    {
      pending: 'Login in...',
      success: {
        render() {
          router.push('/pome/login');
          return 'Account created!';
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
    { toastId: 'registration' }
  );
}
