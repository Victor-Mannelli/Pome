import { useRouter } from "next/router"
import { FaUserAlt, FaUserFriends } from "react-icons/fa"

export default function Navbar() {
  const router = useRouter();
  // router.pathname === ""
  return (
    <div className="bg-primary w-full h-16 flex">
      <FaUserAlt onClick={() => router.push("/PoMe/login")} className="text-white"/>
      <FaUserFriends className="text-white"/>
    </div>
  )
}