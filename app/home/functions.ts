import { UseToastOptions } from '@chakra-ui/react';
import { api } from '@/utils';

export function updateUserProgress({
  anime_id,
  progress,
  toast,
}: {
  toast: (options?: UseToastOptions) => void;
  anime_id: number;
  progress: number;
}) {
  api
    .patch(`/animelist/${anime_id}`, { progress })
    .then(() => {
      toast({
        title: 'Anime status updated!',
        status: 'success',
        isClosable: true,
      });
    })
    .catch(() => {
      toast({
        title: 'Error on updating',
        status: 'error',
        isClosable: true,
      });
    });
}
