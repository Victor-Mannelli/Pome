import { toast } from 'react-toastify';
import { api } from '../axios';
import { AnimeUserStatusData, ToastError } from '../Interfaces';
import nookies from 'nookies';
import { Dispatch, SetStateAction } from 'react';

export function addAnimeUserStatus({
  body,
  setShowAnimeSettings,
}: {
  body: AnimeUserStatusData
  setShowAnimeSettings: Dispatch<SetStateAction<boolean>>
}) {
  const config = { headers: { Authorization: `Bearer ${nookies.get(null, 'token').token}` } };
  toast.promise(
    api.post('/anime/userlist', body, config),
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
