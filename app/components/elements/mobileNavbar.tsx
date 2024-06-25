import { ImProfile, GiExitDoor, GrDocumentUpdate, User, SiNiconico } from '@/utils';
import { ButtonWithIcon } from './buttonWithIcon';
import { Dispatch, SetStateAction } from 'react';
import { Avatar } from '@chakra-ui/react';

export function MobileNavbar({ user, logout, setUpdateUser }: { user: User; logout: () => void; setUpdateUser: Dispatch<SetStateAction<boolean>> }) {
  return (
    <div className="flex flex-col items-center w-full gap-2">
      <div className="flex flex-col items-center justify-center pt-16 pb-5 gap-3">
        <Avatar size={'xl'} src={user?.avatar} />
        <h1 className="text-xl"> {user?.username.slice(0, 1).toUpperCase() + user?.username.slice(1)} </h1>
      </div>
      <ButtonWithIcon href={'/'} Icon={SiNiconico} title={'Home'} className="w-72 hover:bg-fourthAndAHalf" />
      <ButtonWithIcon href={`/profile/${user?.user_id}`} Icon={ImProfile} title={'Profile'} className="w-72 hover:bg-fourthAndAHalf" />
      <ButtonWithIcon
        className="w-72 hover:bg-fourthAndAHalf"
        onClick={() => setUpdateUser(true)}
        Icon={GrDocumentUpdate}
        title={'Update User'}
        href={null}
      />
      <ButtonWithIcon href={`/profile/${user?.user_id}`} Icon={GiExitDoor} title={'Exit'} className="w-72 hover:bg-fourthAndAHalf" onClick={logout} />
    </div>
  );
}
