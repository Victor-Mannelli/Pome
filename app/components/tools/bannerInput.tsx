'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { User } from '@/utils';
import Image from 'next/image';
import React from 'react';

export default function BannerInput({ image, setImage, user }: { user: User; image: string; setImage: Dispatch<SetStateAction<string>> }) {
  const [focus, setFocus] = useState<boolean>(false);

  const handleImageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      {user?.banner || image ? (
        <div className="flex flex-col">
          <h1 className="mb-3"> Banner </h1>
          <Image
            src={image ? image : `data:image/png;base64, ${user?.banner}`}
            className="rounded-xl h-28"
            alt="user_banner"
            height={1080}
            width={1920}
          />
          <p
            className="mt-1 text-sm hover:cursor-pointer hover:text-fifth underline"
            onClick={() => {
              setImage(null);
              focus === true ? setFocus(false) : '';
            }}
          >
            change image here
          </p>
        </div>
      ) : (
        <div className="flex flex-col">
          <h1 className="mb-3"> Banner (optional) </h1>
          <div
            className={`relative w-full flex items-center h-24 border-solid border-2 rounded-md px-5 
            ${focus === true ? 'bg-fourth' : 'bg-second'}`}
          >
            <p className="border p-2 mr-5 text-sm font-bold cursor-pointer rounded-md text-center"> Choose Image </p>
            <p className="text-sm"> click or drag and drop your file here</p>
            <input
              className="opacity-0 hover:cursor-pointer bg-black absolute top-0 left-0 w-full h-full"
              type="file"
              name="user_banner"
              onChange={(e) => {
                handleImageInput(e);
                // handleChanges(e)
              }}
              onDragEnter={() => setFocus(!focus)}
              onDragLeave={() => setFocus(!focus)}
            />
          </div>
        </div>
      )}
    </>
  );
}
