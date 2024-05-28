import { Dispatch, SetStateAction } from "react";
import { User } from "@/utils"

export function ShowFollowedAnime({ user, showFollowedAnime, setShowFollowedAnime, toast, mobile }: {
  setShowFollowedAnime: Dispatch<SetStateAction<boolean>>;
  showFollowedAnime: boolean;
  mobile: boolean;
  toast: any;
  user: User;
}) {
  return (
    <label
      className={`items-center bg-third rounded-md text-white h-11 px-4 cursor-pointer active:bg-fifth hover:bg-fourth 
        ${mobile ? "flex md:hidden" : "fixed top-20 right-3 md:flex hidden"}
      `}
      style={{ boxShadow: "0 0 2px rgb(204, 204, 204)" }}
    >
      <input
        className=''
        type='checkbox'
        placeholder=''
        checked={!user || !showFollowedAnime ? false : true}
        onChange={() => {
          if (user) {
            setShowFollowedAnime(true)
          } else {
            toast({
              title: 'Log in first!',
              status: 'error',
              duration: 9000,
              isClosable: true,
              position: "top"
            })
          }
        }}
      />
      <span className='pl-3'> Show Followed Animes! </span>
    </label>
  )
}