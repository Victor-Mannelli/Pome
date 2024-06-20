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
import { FaEye, FaEyeSlash, TokenContext } from '@/utils';
import React, { useContext, useState } from 'react';
import InputImage from '../tools/inputImage';

export function UserDrawer({ username }: { username: string }) {
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [invalidPassword, setInvalidPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const { user, setUser, setToken } = useContext(TokenContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fileTypes = ['png', 'jpeg', 'jpg'];
  const firstField = React.useRef(null);
  const toast = useToast();

  return (
    <>
      <Avatar name={username} onClick={onOpen} cursor={'pointer'} src={user?.avatar} />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
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
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Atualizar Usuário</DrawerHeader>
            <DrawerBody>
              <Stack spacing="24px">
                <Box mt={5} position={'relative'} display={'flex'} justifyContent={'center'} overflow={'hidden'}>
                  <InputImage />
                  {/* <FileUploader handleChange={(file: any) => changeAvatar(file, setUserToken)} types={fileTypes}>
                    <Avatar size="2xl" name={username} onClick={onOpen} cursor={'pointer'} src={user?.avatar} />
                    <EditIcon position={'absolute'} rounded={'full'} background={'primary'} bottom={'0'} right={1.3} w={8} h={8} p={1.5} />
                  </FileUploader> */}
                </Box>
                <Box>
                  <FormLabel htmlFor="username"> Username </FormLabel>
                  <Input ref={firstField} id="username" placeholder={user?.username} />
                </Box>
                <Box>
                  <FormLabel htmlFor="email"> Email </FormLabel>
                  <Input id="email" placeholder={user?.email} />
                </Box>
                <Box>
                  <FormLabel htmlFor="password">Senha</FormLabel>
                  <InputGroup>
                    <Input
                      id="password"
                      placeholder="Nova senha"
                      type={showPassword ? 'text' : 'password'}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setInvalidPassword(false);
                      }}
                    />
                    <InputRightElement>
                      {showPassword ? (
                        <FaEye className="cursor-pointer" onClick={() => setShowPassword(false)} />
                      ) : (
                        <FaEyeSlash className="cursor-pointer" onClick={() => setShowPassword(true)} />
                      )}
                    </InputRightElement>
                  </InputGroup>
                </Box>
                <Box>
                  <FormLabel htmlFor="password">Confirmar Senha</FormLabel>
                  <InputGroup>
                    <Input
                      id="confirmPassword"
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
                        <FaEye className="cursor-pointer" onClick={() => setShowConfirmPassword(false)} />
                      ) : (
                        <FaEyeSlash className="cursor-pointer" onClick={() => setShowConfirmPassword(true)} />
                      )}
                    </InputRightElement>
                  </InputGroup>
                  {invalidPassword ? <p className="text-red-500">As duas senhas são diferentes</p> : null}
                </Box>
              </Stack>
            </DrawerBody>
            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" color="white" mr={3} onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" colorScheme="blue" isLoading={loading} isDisabled={loading}>
                Atualizar
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </Drawer>
    </>
  );
}
