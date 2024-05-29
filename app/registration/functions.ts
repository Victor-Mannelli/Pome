import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/utils';

export function userRegistration({ email, username, password, confirmPassword, router, toast, setLoading }: {
  setLoading: Dispatch<SetStateAction<boolean>>
  router: ReturnType<typeof useRouter>
  confirmPassword: string,
  username: string,
  password: string,
  email: string,
  toast: any;
}) {
  setLoading(true)
  api
    .post('/users/register', { email, username, password, confirmPassword })
    .then(() => {
      router.push('/login');
      toast({
        title: 'Account created!',
        status: 'success',
        isClosable: true,
      })
    })
    .catch((e) => {
      toast({
        title: e.message ? e.message : 'Error on registration, API is possibly offline!',
        status: 'error',
        isClosable: true,
      })
    })
    .finally(() => setLoading(false))
}
