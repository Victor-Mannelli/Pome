'use client';

import { User, FaEdit, bufferToBase64 } from '@/utils';
import { Avatar, AvatarBadge } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import React from 'react';

export function AvatarInput({ user, setImage, image }: { user: User; image: string; setImage: Dispatch<SetStateAction<string>> }) {
  const handleImageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <Avatar size={'xl'} src={image ? image : `data:image/png;base64, ${bufferToBase64(user?.avatar)}`}>
        <AvatarBadge display="relative" pl={1} pt={'1px'} borderColor="#4a4d4e" boxSize="1em" bg="#4a4d4e" className="cursor-pointer">
          <FaEdit className="text-white text-xl cursor-pointer" />
          <label htmlFor="profile_picture" className="absolute -top-2 -left-2 w-10 h-10 cursor-pointer">
            <input
              id="profile_picture"
              className="hidden"
              name="profile_picture"
              type="file"
              onChange={(e) => {
                handleImageInput(e);
              }}
            />
          </label>
        </AvatarBadge>
      </Avatar>
    </div>
  );
}
