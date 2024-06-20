/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Box, Button, DrawerBody, DrawerFooter, FormLabel, Input, InputGroup, InputRightElement, Stack } from '@chakra-ui/react';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import BannerInput from '../tools/inputImage';
import { User } from '@/utils';

export function UpdateUserDrawerBody({
  setUpdateUser,
  logout,
  user,
}: {
  setUpdateUser: Dispatch<SetStateAction<boolean>>;
  logout: () => void;
  user: User;
}) {
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [invalidPassword, setInvalidPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const firstField = React.useRef(null);

  return (
    <>
      <DrawerBody>
        <Stack spacing="20px">
          <Box mt={5} position={'relative'} display={'flex'} justifyContent={'center'} overflow={'hidden'}>
            <BannerInput />
          </Box>
          {/* <FileUploader handleChange={(file: any) => changeAvatar(file, setToken)} types={fileTypes}>
        <Avatar size="2xl" name={user?.username} onClick={onOpen} cursor={'pointer'} src={user?.avatar} />
        <EditIcon position={'absolute'} rounded={'full'} background={'primary'} bottom={'0'} right={1.3} w={8} h={8} p={1.5} />
      </FileUploader> */}
          <Box>
            <FormLabel htmlFor="username" textColor={'white'}>
              Username
            </FormLabel>
            <Input ref={firstField} id="username" textColor={'white'} placeholder={user?.username} />
          </Box>
          <Box>
            <FormLabel htmlFor="email" textColor={'white'}>
              Email
            </FormLabel>
            <Input id="email" textColor={'white'} placeholder={user?.email} />
          </Box>
          <Box>
            <FormLabel htmlFor="password" textColor={'white'}>
              Password
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
            <FormLabel htmlFor="password" textColor={'white'}>
              Confirm Password
            </FormLabel>
            <InputGroup>
              <Input
                id="confirmPassword"
                textColor={'white'}
                placeholder="Confirmar senha"
                isInvalid={invalidPassword ? true : false}
                required={password.length > 0 ? true : false}
                type={showConfirmPassword ? 'text' : 'password'}
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
            {invalidPassword ? <p className="text-red-500">As duas senhas são diferentes</p> : null}
            <Box mt={7}>
              <Button onClick={() => setUpdateUser(false)} w={'full'}>
                Profile
              </Button>
            </Box>
          </Box>
        </Stack>
      </DrawerBody>
      <DrawerFooter borderTopWidth="1px" gap={3}>
        <Button variant="outline" bg={'red'} color="white" onClick={logout}>
          Logout
        </Button>
        <Button type="submit" colorScheme="blue" isLoading={loading} isDisabled={loading}>
          Update
        </Button>
      </DrawerFooter>
    </>
  );
}
