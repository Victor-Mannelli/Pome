import { UseToastOptions } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/utils/libs/axios';
import { User } from '@/utils/types';

export function userLogin({
  setLoading,
  password,
  setUser,
  router,
  login,
  toast,
}: {
  setLoading: Dispatch<SetStateAction<boolean>>;
  toast: (options?: UseToastOptions) => void;
  setUser: Dispatch<SetStateAction<User>>;
  router: ReturnType<typeof useRouter>;
  password: string;
  login: string;
}) {
  setLoading(true);
  api
    .post('/users/login', { login, password })
    .then((response) => {
      setUser({
        token: response.data.token,
        ...response.data.userData,
        avatar: response.data.userData.avatar?.data,
        banner: response.data.userData.banner?.data,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('banner', response.data.userData.banner?.data);
      localStorage.setItem('avatar', response.data.userData.avatar?.data);
      router.push('/');
      toast({
        title: 'Logged In!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    })
    .catch(() => {
      toast({
        title: 'Error on login, API is possibly offline!',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    })
    .finally(() => setLoading(false));
}
