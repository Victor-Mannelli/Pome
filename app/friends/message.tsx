import Image from "next/image";
import React from "react";

export function Message({ username, timestamp, message, id,
  // profile_picture, 
}: {
  // profile_picture: string;
  username: string;
  timestamp: Date;
  message: string;
  id?: string;
}) {
  const month = timestamp.getMonth() + 1;
  const day = timestamp.getDate();
  const year = timestamp.getFullYear();
  const hours = timestamp.getHours();
  const minutes = timestamp.getMinutes().toString().padStart(2, "0");
  const meridiem = hours >= 12 ? "PM" : "AM";
  return (
    <div id={id} className="flex p-3 bg-fifth text-sixthrounded-md rounded-lg">
      <Image
        className="rounded-full mr-4 mt-1 w-10 h-10"
        src="/assets/dark_bg.jpg"
        alt="profile_pic"
        width={1920}
        height={1080}
      />
      <div className="flex flex-col">
        <div className="flex items-center">
          <h1 className="pr-3 font-bold"> {username} </h1>
          <h3 className="text-sm"> {month}/{day}/{year} {hours}:{minutes} {meridiem} </h3>
        </div>
        <p className="break-all text-lg"> {message} </p>
      </div>
    </div>
  );
}
