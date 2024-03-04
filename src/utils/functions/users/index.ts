import { Dispatch, SetStateAction } from 'react';
import { UsersList } from '@/utils/interfaces';
import { api } from '@/utils/axios';

export function getAllUsers(setAllUsers: Dispatch<SetStateAction<UsersList[]>>) {
  api.get('/users/all').then((e) => { setAllUsers(e.data); });
}