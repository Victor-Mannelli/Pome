import { api } from '../axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { ToastError } from '../Interfaces';

export function userSignUp({
  email,
  username,
  password,
  confirmPassword,
  router
}: {
  email: string,
  username: string,
  password: string,
  confirmPassword: string,
  router: ReturnType<typeof useRouter>
}) {
  toast.promise(
    api.post('/signup', { email, username, password, confirmPassword }),
    {
      pending: 'Signing Up...',
      success: {
        render() {
          router.push('/pome/signup');
          return 'Account created!';
        },
      },
      error: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        render(e: ToastError | any) {
          return e.data.response.data.message
            ? e.data.response.data.message
            : e.data.response.data;
        }
      }
    },
    { toastId: 'signUp' }
  );
}
