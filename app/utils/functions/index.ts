import { AnimeUserStatusData, ToastError } from "../interfaces";
import { Dispatch, SetStateAction } from "react";
import { NextRouter } from "next/router";
import { destroyCookie } from "nookies";
import { toast } from "react-toastify";
import { api } from "../axios";

export function calculatePadding({ parentWidth, childWidth }: {
  parentWidth: number, childWidth: number,
}) {
  const numChildrenPerRow = parentWidth - childWidth < 24 ? 1 : Math.floor(parentWidth / (childWidth + 24)); // 24px is the gap between children
  const totalWidth = numChildrenPerRow * childWidth + ((numChildrenPerRow - 1) * 24); // Total width of children in a row
  const padding = (parentWidth - totalWidth) / 2;

  return padding || 0
}

export function addAnimeUserStatus({ body, setShowAnimeSettings, }: {
  setShowAnimeSettings: Dispatch<SetStateAction<boolean>>;
  body: AnimeUserStatusData;
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
        render(e: ToastError | any) {
          return !e.response.data
            ? toast.error(e)
            : e.response.data.length > 1
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

export function logOut(router: NextRouter) {
  destroyCookie(undefined, 'token')
  router.pathname === '/' ? router.reload() : router.push('/')
  toast.success('Successfully logged out!')
}
