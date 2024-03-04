import { AnimeUserStatusData, ToastError } from '../interfaces';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import { api } from '../axios';

export function addAnimeUserStatus({
  body,
  setShowAnimeSettings,
}: {
  body: AnimeUserStatusData
  setShowAnimeSettings: Dispatch<SetStateAction<boolean>>
}) {
  // console.log(body, 'added')
  toast.promise(
    api.post('/animes/updateStatus', body),
    {
      pending: 'Adding to userList...',
      success: {
        render() {
          setShowAnimeSettings(false);
          return 'Added!';
        },
      },
      error: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        render(e: ToastError | any) {
          return !e.response.data
            ? toast.error(e)
            : e.response.data.length > 1
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ? e.response.data.map((error: any) => toast.error(error))
              : e.response.data[0] === undefined
                ? toast.error(e.response.data.message)
                : toast.error(e.response.data[0]);
        }
      }
    },
    { toastId: 'animeUserStatus' }
  );
}
