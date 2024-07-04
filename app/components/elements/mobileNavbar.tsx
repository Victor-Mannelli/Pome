import { ImProfile, GiExitDoor, GrDocumentUpdate, User, SiNiconico, FaUser, FaUserPlus, bufferToBase64 } from '@/utils';
import { ButtonWithIcon } from './buttonWithIcon';
import { Dispatch, SetStateAction } from 'react';
import { Avatar } from '@chakra-ui/react';

export function MobileNavbar({
  setUpdateUser,
  pathname,
  onClose,
  logout,
  user,
}: {
  setUpdateUser: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  logout: () => void;
  pathname: string;
  user: User;
}) {
  return (
    <div className="flex flex-col items-center w-full gap-2">
      <div className="flex flex-col items-center justify-center pt-16 pb-5 gap-3">
        <Avatar size={'xl'} src={`data:image/png;base64, ${bufferToBase64(user?.avatar)}`} />
        {user ? <h1 className="text-xl"> {user.username.slice(0, 1).toUpperCase() + user.username.slice(1)} </h1> : null}
      </div>
      {user ? (
        <>
          <ButtonWithIcon
            className="w-72 hover:bg-fourthAndAHalf"
            href={pathname === '/' ? null : '/'}
            onClick={onClose}
            Icon={SiNiconico}
            title={'Home'}
          />
          <ButtonWithIcon
            href={pathname === `/profile/${user?.user_id}` ? null : `/profile/${user?.user_id}`}
            className="w-72 hover:bg-fourthAndAHalf"
            onClick={onClose}
            title={'Profile'}
            Icon={ImProfile}
          />
          <ButtonWithIcon
            className="w-72 hover:bg-fourthAndAHalf"
            onClick={() => setUpdateUser(true)}
            Icon={GrDocumentUpdate}
            title={'Update User'}
            href={null}
          />
          <ButtonWithIcon
            className="w-72 hover:bg-fourthAndAHalf"
            href={`/profile/${user?.user_id}`}
            Icon={GiExitDoor}
            onClick={() => {
              onClose();
              logout();
            }}
            title={'Exit'}
          />
        </>
      ) : (
        <>
          <ButtonWithIcon className="w-72 hover:bg-fourthAndAHalf" onClick={onClose} Icon={FaUser} title={'Login'} href={'/login'} />
          <ButtonWithIcon
            className="w-72 hover:bg-fourthAndAHalf"
            title={'Registration'}
            href={'/registration'}
            onClick={onClose}
            Icon={FaUserPlus}
          />
        </>
      )}
    </div>
  );
}
