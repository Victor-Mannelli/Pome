'use server';

import { UseToastOptions } from '@chakra-ui/react';
import { api } from '@/utils';

export async function updateUserProgress({
  anime_id,
  progress,
  status,
  toast,
}: {
  toast: (options?: UseToastOptions) => void;
  status: string | null;
  anime_id: number;
  progress: number;
}) {
  api
    .patch(`/animelist/${anime_id}`, { progress, status })
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
