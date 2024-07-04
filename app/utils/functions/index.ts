import { FilterType, User, UsersAnimeData } from '../types';
import { UseToastOptions } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { saveDataInIndexDB } from '../indexDB';
import { api } from '@/utils/libs/axios';

export function calculatePadding({ parentWidth, childWidth }: { parentWidth: number; childWidth: number }) {
  const numChildrenPerRow = parentWidth - childWidth < 24 ? 1 : Math.floor(parentWidth / (childWidth + 24)); // 24px is the gap between children
  const totalWidth = numChildrenPerRow * childWidth + (numChildrenPerRow - 1) * 24; // Total width of children in a row
  const padding = (parentWidth - totalWidth) / 2;

  return padding || 0;
}

export async function getUsersFollewedAnime({
  setLoading,
  setFailed,
  setFilter,
  setData,
}: {
  setData: Dispatch<SetStateAction<UsersAnimeData[] | null>>;
  setFilter: Dispatch<SetStateAction<FilterType>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setFailed: Dispatch<SetStateAction<boolean>>;
}) {
  setLoading(true);
  api
    .get('/animelist/watching')
    .then((e) => {
      setData(e.data);
      setFilter((prevState) => ({ ...prevState, id_not_in: e.data.map((e: UsersAnimeData) => e.anime_id) }));
    })
    .catch(() => {
      setFailed(true);
    })
    .finally(() => setLoading(false));
}

export function getDateAsYYYYMMDD() {
  const currentDate = new Date();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1 and pad with leading zero
  const day = String(currentDate.getDate()).padStart(2, '0'); // Pad day with leading zero
  const year = currentDate.getFullYear();

  return `${year}-${month}-${day}`;
}

export function logout({
  setToken,
  setUser,
  toast,
}: {
  setToken: Dispatch<SetStateAction<string>>;
  toast: (options?: UseToastOptions) => void;
  setUser: Dispatch<SetStateAction<User>>;
}) {
  localStorage.removeItem('token');
  setUser(null);
  setToken(null);
  saveDataInIndexDB('avatar', null);
  saveDataInIndexDB('banner', null);
  toast({
    title: 'logged out!',
    status: 'success',
    isClosable: true,
  });
}

export function updateUser({
  setLoading,
  onClose,
  setUser,
  toast,
  data,
}: {
  setUser: Dispatch<SetStateAction<User | unknown>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  toast: (options?: UseToastOptions) => void;
  onClose: () => void;
  data: UpdateUser;
}) {
  setLoading(true);
  api
    .patch(`/users`, data)
    .then((response) => {
      setUser({ ...response.data, avatar: response.data.avatar?.data, banner: response.data.banner?.data });
      saveDataInIndexDB('banner', response.data.banner?.data);
      saveDataInIndexDB('avatar', response.data.avatar?.data);
      toast({
        title: 'User updated!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClose();
    })
    .catch(() => {
      toast({
        title: 'Error on user update',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    })
    .finally(() => {
      setLoading(false);
    });
}

export function bufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

type UpdateUser = {
  id: string;
  banner?: string;
  avatar?: string;
  password?: string;
  email?: string;
  username?: string;
};
