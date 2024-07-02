'use client';

import { useDisclosure, Drawer, DrawerContent, DrawerCloseButton, useToast, Avatar } from '@chakra-ui/react';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { bufferToBase64, logout, User } from '@/utils';
import { UpdateUserDrawer } from './updateUserDrawer';
import { MobileNavbar } from './mobileNavbar';
import { usePathname } from 'next/navigation';

export function UserDrawer({
  setToken,
  setUser,
  user,
}: {
  setToken: Dispatch<SetStateAction<string | null>>;
  setUser: Dispatch<SetStateAction<User | null>>;
  user: User;
}) {
  const [updateUser, setUpdateUser] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pathname = usePathname();
  const toast = useToast();

  return (
    <>
      <Avatar name={user?.username} onClick={onOpen} cursor={'pointer'} src={`data:image/png;base64, ${bufferToBase64(user?.avatar)}`} />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerContent boxShadow={'0 0 10px rgb(0, 0, 0)'} bgColor={'#2c2e2f'}>
          <DrawerCloseButton onClick={() => setUpdateUser(false)} color={'white'} mt={2} />
          {updateUser && user ? (
            <UpdateUserDrawer
              logout={() => logout({ setToken, setUser, toast })}
              setUpdateUser={setUpdateUser}
              setUser={setUser}
              onClose={onClose}
              user={user}
            />
          ) : (
            <MobileNavbar
              logout={() => logout({ setToken, setUser, toast })}
              setUpdateUser={setUpdateUser}
              pathname={pathname}
              onClose={onClose}
              user={user}
            />
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
