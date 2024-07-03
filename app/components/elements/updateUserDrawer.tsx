'use client';

import { Box, DrawerBody, FormLabel, Input, InputGroup, InputRightElement, Stack, useToast } from '@chakra-ui/react';
import { CgProfile, User, FaEye, FaEyeSlash, GiExitDoor, GiConfirmed, updateUser } from '@/utils';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { ButtonWithIcon } from './buttonWithIcon';
import BannerInput from '../tools/bannerInput';
import AvatarInput from '../tools/avatarInput';

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
      className="h-screen"
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
        <Stack spacing="20px" h={'full'}>
          <h1 className="mt-3"> Profile Picture (optional) </h1>
          <AvatarInput user={user} image={profilePicture} setImage={setProfilePicture} />
          <BannerInput user={user} image={banner} setImage={setBanner} />
          <Box>
            <FormLabel htmlFor="username" textColor={'white'} fontWeight={700}>
              Username (optional)
            </FormLabel>
            <Input ref={firstField} id="username" textColor={'white'} placeholder={user?.username} />
          </Box>
          <Box>
            <FormLabel htmlFor="email" textColor={'white'} fontWeight={700}>
              Email (optional)
            </FormLabel>
            <Input id="email" textColor={'white'} placeholder={user?.email} />
          </Box>
          <Box>
            <FormLabel htmlFor="password" textColor={'white'} fontWeight={700}>
              Password (optional)
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
              Confirm Password (optional)
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
          <Box className="flex flex-col justify-between h-full">
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
        </Stack>
      </DrawerBody>
    </form>
  );
}
