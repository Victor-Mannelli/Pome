import { FaHeart, FaRegHeart } from '@/utils/libs';
import { UseToastOptions } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { UsersAnimeData } from '@/utils';

export function FavoriteHeart({
  userAnimeDataLoading,
  setUserAnimeData,
  userAnimeData,
  token,
  toast,
}: {
  setUserAnimeData: Dispatch<SetStateAction<UsersAnimeData>>;
  toast: (options?: UseToastOptions) => void;
  userAnimeDataLoading?: boolean;
  userAnimeData: UsersAnimeData;
  token: string;
}) {
  return (
    <>
      {userAnimeData && !userAnimeDataLoading ? (
        userAnimeData.favorite === false ? (
          <FaRegHeart
            className="absolute right-1 top-0 my-3 mr-2 text-2xl text-white hover:cursor-pointer"
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
            className="absolute right-1 top-0 my-3 mr-2 text-2xl text-red-500 hover:cursor-pointer"
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
          className="absolute right-1 top-0 my-3 mr-2 text-2xl text-white hover:cursor-pointer"
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
