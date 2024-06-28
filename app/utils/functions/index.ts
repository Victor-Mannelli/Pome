import { FilterType, User, UsersAnimeData } from '../types';
import { UseToastOptions } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { api } from '@/utils/libs/axios';

export function calculatePadding({ parentWidth, childWidth }: { parentWidth: number; childWidth: number }) {
  const numChildrenPerRow = parentWidth - childWidth < 24 ? 1 : Math.floor(parentWidth / (childWidth + 24)); // 24px is the gap between children
  const totalWidth = numChildrenPerRow * childWidth + (numChildrenPerRow - 1) * 24; // Total width of children in a row
  const padding = (parentWidth - totalWidth) / 2;

  return padding || 0;
}

export function addAnimeUserStatus({
  body,
  setShowAnimeSettings,
  setLoading,
  setFailed,
  toast,
}: {
  setShowAnimeSettings: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setFailed: Dispatch<SetStateAction<boolean>>;
  toast: (options?: UseToastOptions) => void;
  body: unknown;
}) {
  setLoading(true);
  api
    .post('/animes/updateStatus', body)
    .then(() => {
      setShowAnimeSettings(false);
      setFailed(false);
      toast({
        title: 'Anime status updated',
        status: 'success',
        isClosable: true,
      });
    })
    .catch(() => {
      setFailed(true);
      toast({
        title: 'An error ocurred',
        status: 'error',
        isClosable: true,
      });
    })
    .finally(() => {
      setLoading(false);
    });
}

export async function getUsersFollewedAnime({
  setData,
  setLoading,
  setFailed,
  setFilter,
}: {
  setData: Dispatch<SetStateAction<UsersAnimeData[] | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setFailed: Dispatch<SetStateAction<boolean>>;
  setFilter: Dispatch<SetStateAction<FilterType>>;
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
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1 and pad with leading zero
  const day = String(currentDate.getDate()).padStart(2, '0'); // Pad day with leading zero

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
      console.log(response, 'updateuser response');
      setUser(response);
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

type UpdateUser = {
  id: string;
  banner?: string;
  avatar?: string;
  password?: string;
  email?: string;
  username?: string;
};
