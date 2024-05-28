import { useRouter } from 'next/navigation';
import { api } from '@/utils';

export function userRegistration({ email, username, password, confirmPassword, router, toast }: {
  router: ReturnType<typeof useRouter>
  confirmPassword: string,
  username: string,
  password: string,
  email: string,
  toast: any;
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
        render() {
          return "Error on registration"
        }
      }
    },
    { toastId: 'registration' }
  );
}
