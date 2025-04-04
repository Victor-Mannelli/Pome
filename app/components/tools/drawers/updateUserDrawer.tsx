'use client';

import { Box, DrawerBody, FormLabel, Input, InputGroup, InputRightElement, useToast } from '@chakra-ui/react';
import { CgProfile, User, FaEye, FaEyeSlash, GiExitDoor, GiConfirmed, updateUser } from '@/utils';
import { Dispatch, SetStateAction, useState } from 'react';
import { AvatarInput, BannerInput } from '@/components';
import { ButtonWithIcon } from '../buttons';
import React from 'react';

export function UpdateUserDrawer({
  setUpdateUser,
  onClose,
  setUser,
  logout,
  user,
}: {
  setUpdateUser: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<User>>;
  onClose: () => void;
  logout: () => void;
  user: User;
}) {
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [invalidPassword, setInvalidPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<string>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [banner, setBanner] = useState<string>(null);
  const firstField = React.useRef(null);
  const toast = useToast();

  return (
    <form
      id="updateUser"
      className="h-screen w-[280px]"
      onSubmit={(e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
          setInvalidPassword(true);
          return;
        }
        const data = {
          id: user?.user_id,
          ...(e.target['username'].value && { username: e.target['username'].value }),
          ...(e.target['email'].value && { email: e.target['email'].value }),
          ...(e.target['password'].value && { password: e.target['password'].value }),
          ...(profilePicture && { avatar: profilePicture.toString().replace(/data.*?base64,/, '') }),
          ...(banner && { banner: banner.toString().replace(/data.*?base64,/, '') }),
        };
        updateUser({ data, toast, onClose, setUser, setLoading });
      }}
    >
      <DrawerBody h={'full'}>
        <div className="flex flex-col h-full">
          <h1 className="my-3">
            Profile Picture <span className="text-sm"> (optional) </span>
          </h1>
          <AvatarInput user={user} image={profilePicture} setImage={setProfilePicture} />
          <div className="flex flex-col gap-1 h-full">
            <BannerInput user={user} image={banner} setImage={setBanner} />
            <Box>
              <FormLabel htmlFor="username" textColor={'white'} fontWeight={700}>
                Username <span className="text-sm"> (optional) </span>
              </FormLabel>
              <Input ref={firstField} id="username" textColor={'white'} placeholder={user?.username} />
            </Box>
            <Box>
              <FormLabel htmlFor="email" textColor={'white'} fontWeight={700}>
                Email <span className="text-sm"> (optional) </span>
              </FormLabel>
              <Input id="email" textColor={'white'} placeholder={user?.email} />
            </Box>
            <Box>
              <FormLabel htmlFor="password" textColor={'white'} fontWeight={700}>
                Password <span className="text-sm"> (optional) </span>
              </FormLabel>
              <InputGroup>
                <Input
                  id="password"
                  textColor={'white'}
                  placeholder="New Password"
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setInvalidPassword(false);
                  }}
                />
                <InputRightElement>
                  {showPassword ? (
                    <FaEye className="cursor-pointer text-white" onClick={() => setShowPassword(false)} />
                  ) : (
                    <FaEyeSlash className="cursor-pointer text-white" onClick={() => setShowPassword(true)} />
                  )}
                </InputRightElement>
              </InputGroup>
            </Box>
            <Box>
              <FormLabel htmlFor="password" textColor={'white'} fontWeight={700}>
                Confirm Password {password.length > 0 ? null : <span className="text-sm"> (optional) </span>}
              </FormLabel>
              <InputGroup>
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required={password.length > 0 ? true : false}
                  isInvalid={invalidPassword ? true : false}
                  placeholder="Repeat Password"
                  id={'confirmPassword'}
                  textColor={'white'}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setInvalidPassword(false);
                  }}
                />
                <InputRightElement>
                  {showConfirmPassword ? (
                    <FaEye className="cursor-pointer text-white" onClick={() => setShowConfirmPassword(false)} />
                  ) : (
                    <FaEyeSlash className="cursor-pointer text-white" onClick={() => setShowConfirmPassword(true)} />
                  )}
                </InputRightElement>
              </InputGroup>
              {invalidPassword ? <p className="text-red-500"> As duas senhas são diferentes </p> : null}
            </Box>
          </div>
          <Box className="flex flex-col justify-between h-full pt-3">
            <ButtonWithIcon
              className="w-full bg-green-500"
              shadowColor="rgb(34 197 94)"
              Icon={GiConfirmed}
              title={'Update!'}
              type="submit"
              loading={loading}
              href={null}
            />
            <div className="flex flex-col w-full gap-4 pb-2">
              <ButtonWithIcon
                className="w-full bg-fourth hover:bg-fourthAndAHalf"
                onClick={() => setUpdateUser(false)}
                title={'Profile Navigation'}
                Icon={CgProfile}
                href={null}
              />
              <ButtonWithIcon
                href={`/profile/${user?.user_id}`}
                className="bg-red-500 w-full"
                shadowColor="rgb(239 68 68)"
                Icon={GiExitDoor}
                onClick={logout}
                title={'Exit'}
              />
            </div>
          </Box>
        </div>
      </DrawerBody>
    </form>
  );
}
