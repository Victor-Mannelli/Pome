import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { api } from '@/utils';

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
      pending: 'Creating account...',
      success: {
        render() {
          router.push('/login');
          return 'Account created!';
        },
      },
      error: {
        render(e: any) {
          return "Error on registration"
          // console.log(e)
          // return e.data.message
          //   ? e.data.message
          //   : e.response.data.length > 1
          //     ? e.response.data.map((error: any) => error)
          //     : e.response.data[0];
        }
      }
    },
    { toastId: 'registration' }
  );
}
