"use client";

import { parseCookies } from "nookies";
import { toast } from "react-toastify";
import { animeStatus } from "@/utils";
import { useState } from "react";
import { PopUp } from "@/components";
import { UserAnimeSettings } from "./animeUserSettings";

export function UpdateAnimeStatus({ status }: {
  status: string;
}) {
  const [showAnimeSettings, setShowAnimeSettings] = useState<boolean>(false);
  const token = parseCookies(null).token;

  return (
    <>
      <div
        className="flex items-center justify-center w-60 h-9 rounded-md hover:bg-fifth bg-fourthAndAHalf hover:cursor-pointer"
        onClick={() => {
          // api.post('/animes/populate', { id: data.id });
          if (!token) return toast.error('Log in first!')
          setShowAnimeSettings(!showAnimeSettings);
        }}
      >
        <h3 className={`${status === '' ? "" : animeStatus[status].color} font-bold text-lg py-3`}>
          {status === '' ? 'Follow' : status}
        </h3>
      </div>
      <PopUp show={showAnimeSettings} setShow={setShowAnimeSettings} bg={true}>
        <>
        </>
        {/* <UserAnimeSettings
          setShowAnimeSettings={setShowAnimeSettings}
          showAnimeSettings={showAnimeSettings}
          setFetchData={setFetchData}
          setFavorite={setFavorite}
          fetchData={fetchData}
          favorite={favorite}
          data={data}
        /> */}
      </PopUp>
    </>
  )
}
