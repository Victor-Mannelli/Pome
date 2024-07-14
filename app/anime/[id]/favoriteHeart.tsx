import { FaHeart, FaRegHeart } from '@/utils/libs';
import { UseToastOptions } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { UsersAnimeData } from '@/utils';

export function FavoriteHeart({
  userAnimeDataLoading,
  setUserAnimeData,
  userAnimeData,
  position,
  token,
  toast,
}: {
  setUserAnimeData: Dispatch<SetStateAction<UsersAnimeData>>;
  toast: (options?: UseToastOptions) => void;
  userAnimeDataLoading?: boolean;
  userAnimeData: UsersAnimeData;
  position: string;
  token: string;
}) {
  return (
    <>
      {userAnimeData && !userAnimeDataLoading ? (
        userAnimeData.favorite === false ? (
          <FaRegHeart
            className={`absolute ${position} my-3 mr-2 text-2xl text-white cursor-pointer drop-shadow-[0_0_3px_rgb(0_0_0)]`}
            onClick={(e) => {
              e.stopPropagation();
              token
                ? setUserAnimeData((prevState) => ({ ...prevState, favorite: true }))
                : toast({
                    title: 'Log in first!',
                    status: 'error',
                    isClosable: true,
                  });
            }}
          />
        ) : (
          <FaHeart
            className={`absolute ${position} my-3 mr-2 text-2xl text-red-500 cursor-pointer`}
            onClick={(e) => {
              e.stopPropagation();
              token
                ? setUserAnimeData((prevState) => ({ ...prevState, favorite: false }))
                : toast({
                    title: 'Log in first!',
                    status: 'error',
                    isClosable: true,
                  });
            }}
          />
        )
      ) : (
        <FaRegHeart
          className={`absolute ${position} my-3 mr-2 text-2xl text-white cursor-pointer`}
          onClick={(e) => {
            e.stopPropagation();
            token
              ? setUserAnimeData((prevState) => ({ ...prevState, favorite: true }))
              : toast({
                  title: 'Log in first!',
                  status: 'error',
                  isClosable: true,
                });
          }}
        />
      )}
    </>
  );
}
