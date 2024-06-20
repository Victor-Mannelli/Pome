/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useDisclosure,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  FormLabel,
  DrawerFooter,
  Box,
  Input,
  useToast,
  Avatar,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react';
import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { FaEye, FaEyeSlash, logout, TokenContext, User } from '@/utils';
import { UpdateUserDrawerBody } from './updateUserDrawerBody';
import BannerInput from '../tools/inputImage';
import { Link } from '../tools';

export function UserDrawer({
  setToken,
  setUser,
  user,
}: {
  setToken: Dispatch<SetStateAction<string | null>>;
  setUser: Dispatch<SetStateAction<User | null>>;
  user: User;
}) {
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [invalidPassword, setInvalidPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [updateUser, setUpdateUser] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fileTypes = ['png', 'jpeg', 'jpg'];
  const firstField = React.useRef(null);
  const toast = useToast();

  return (
    <>
      <Avatar name={user?.username} onClick={onOpen} cursor={'pointer'} src={user?.avatar} />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <form
          onSubmit={(e: any) => {
            // e.preventDefault();
            // const data = {
            //   id: user?.id,
            //   ...(e.target['username'].value && { name: e.target['username'].value }),
            //   ...(e.target['email'].value && { email: e.target['email'].value }),
            //   ...(e.target['password'].value && { password: e.target['password'].value }),
            // };
            // if (password !== confirmPassword) {
            //   setInvalidPassword(true);
            //   return;
            // }
            // updateUser({ data, toast, onClose, setUser, setLoading });
          }}
        >
          <DrawerContent boxShadow={'0 0 10px rgb(0, 0, 0)'} bgColor={'#2c2e2f'}>
            <DrawerCloseButton onClick={() => setUpdateUser(false)} color={'white'} mt={2} />
            <DrawerHeader h={14} borderBottomWidth="1px" textColor={'white'}>
              {!updateUser ? `${user?.username.slice(0, 1).toUpperCase() + user?.username.slice(1)}` : 'Atualizar Usuário'}
            </DrawerHeader>
            {updateUser ? (
              <UpdateUserDrawerBody user={user} logout={() => logout({ setToken, setUser, toast })} setUpdateUser={setUpdateUser} />
            ) : (
              <Stack p={5}>
                <Link href={`/profile/${user?.user_id}`}>
                  <Button> Profile </Button>
                </Link>
                <Button onClick={() => setUpdateUser(true)} w={'fit-content'}>
                  Update User
                </Button>
                {/* // <Button></Button> */}
                <Link href={'/'}>
                  <Button variant="outline" bg={'red'} color="white" onClick={() => logout({ setToken, setUser, toast })}>
                    Logout
                  </Button>
                </Link>
              </Stack>
            )}
          </DrawerContent>
        </form>
      </Drawer>
    </>
  );
}
