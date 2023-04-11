import { Dispatch, SetStateAction } from 'react';

export default function Friend({
  friend,
  userChat,
  setUserChat
}: {
  friend: {
    user_id: number,
    username: string
  },
  userChat: number,
  setUserChat: Dispatch<SetStateAction<number>>
}) {
  return (
    <div
      className={`rounded-xl p-2 w-[98%] flex items-center ${friend.user_id === userChat ? 'bg-sixth' : 'bg-fourth'}`}
      onClick={() => setUserChat(friend.user_id)}
    >
      <img
        className="rounded-full h-6 w-6 mr-2"
        src="/assets/dark_bg.jpg"
        alt="profile_pic"
      />
      <h1> {friend.username} </h1>
    </div>
  );
}
