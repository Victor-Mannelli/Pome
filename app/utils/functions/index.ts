import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction, useContext } from "react";
import { User, UsersAnimelist } from "../types";
import { TokenContext } from "../providers";
import { destroyCookie } from "nookies";
import { toast } from "react-toastify";
import { api } from "../axios";

export function calculatePadding({ parentWidth, childWidth }: { parentWidth: number, childWidth: number }) {
  const numChildrenPerRow = parentWidth - childWidth < 24 ? 1 : Math.floor(parentWidth / (childWidth + 24)); // 24px is the gap between children
  const totalWidth = numChildrenPerRow * childWidth + ((numChildrenPerRow - 1) * 24); // Total width of children in a row
  const padding = (parentWidth - totalWidth) / 2;

  return padding || 0
}

export function addAnimeUserStatus({ body, setShowAnimeSettings, setLoading, setFailed }: {
  setShowAnimeSettings: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setFailed: Dispatch<SetStateAction<boolean>>;
  body: any;
}) {
  setLoading(true);
  api
    .post('/animes/updateStatus', body)
    .then(() => {
      setShowAnimeSettings(false);
      toast.success("Anime status updated")
      setFailed(false);
    })
    .catch(() => {
      setFailed(true)
      toast.error("An error ocurred")
    })
    .finally(() => {
      setLoading(false);
    });
}

export function UseLogout({ setUser, setToken }: {
  setToken: Dispatch<SetStateAction<string>>
  setUser: Dispatch<SetStateAction<User>>
 }) {

  destroyCookie(null, 'token', { path: "/" });
  destroyCookie(undefined, 'token', { path: "/" });
  destroyCookie({}, 'token', { path: "/" });
  setUser(null);
  setToken(null);
  // router.push("/");
  toast.success('Successfully logged out!');
}

export async function getUsersAnimeList({ setData, setLoading, setFailed }: {
  setData: Dispatch<SetStateAction<UsersAnimelist[] | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setFailed: Dispatch<SetStateAction<boolean>>;
}) {
  setLoading(true);
  api
    .get('/animelist')
    .then((e) => setData(e.data))
    .catch((e) => { setFailed(true); console.log(e) })
    .finally(() => setLoading(false));
}

export function getDateAsYYYYMMDD() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1 and pad with leading zero
  const day = String(currentDate.getDate()).padStart(2, '0'); // Pad day with leading zero

  return `${year}-${month}-${day}`;
}