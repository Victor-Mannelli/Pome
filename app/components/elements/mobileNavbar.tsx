import { ImProfile, GiExitDoor, GrDocumentUpdate, User, SiNiconico, FaUser, FaUserPlus, bufferToBase64 } from '@/utils';
import { ButtonWithIcon } from './buttonWithIcon';
import { Dispatch, SetStateAction } from 'react';
import { Avatar } from '@chakra-ui/react';

export function MobileNavbar({
  setUpdateUser,
  onClose,
  logout,
  user,
}: {
  setUpdateUser: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  logout: () => void;
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
          <ButtonWithIcon href={'/'} Icon={SiNiconico} title={'Home'} className="w-72 hover:bg-fourthAndAHalf" />
          <ButtonWithIcon href={`/profile/${user?.user_id}`} Icon={ImProfile} title={'Profile'} className="w-72 hover:bg-fourthAndAHalf" />
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
            onClick={logout}
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
