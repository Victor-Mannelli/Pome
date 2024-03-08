import { Dispatch, SetStateAction } from 'react';
import { UsersList } from '@/utils/interfaces';
import { NextRouter } from 'next/router';
import { destroyCookie } from 'nookies';
import { toast } from 'react-toastify';
import { api } from '@/utils/axios';

export function getAllUsers(setAllUsers: Dispatch<SetStateAction<UsersList[]>>) {
  api.get('/users/all').then((e) => { setAllUsers(e.data); });
}

export function logOut(router: NextRouter) {
  destroyCookie(undefined, 'token')
  router.pathname === '/' ? router.reload() : router.push('/')
  toast.success('Successfully logged out!')
}
