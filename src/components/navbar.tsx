import { useRouter } from "next/router"
import { FaUserFriends, FaUserCircle } from "react-icons/fa"
import { SiNiconico } from "react-icons/si"

export default function Navbar() {
  const router = useRouter();
  // router.pathname === ""
  return (
    <div className="bg-primary w-full h-16 flex justify-between items-center px-7">
      <SiNiconico onClick={() => router.push("/PoMe/home")} className="text-white text-3xl cursor-pointer hover:text-quinary "/>
      <div className="flex items-center gap-7">
        <FaUserFriends onClick={() => router.push("/PoMe/friends")} className="text-white text-3xl cursor-pointer hover:text-quinary"/>
        <FaUserCircle onClick={() => router.push("/PoMe/profile")} className="text-white text-3xl cursor-pointer hover:text-quinary"/>
      </div>
    </div>
  )
}