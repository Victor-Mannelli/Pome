import Image from "next/image";
// { id, profile_picture, username, timestamp, message }: Component<MessageProps>
export function Message({
  id,
  profile_picture,
  username,
  timestamp,
  message,
}: {
  id: number;
  profile_picture: string;
  username: string;
  timestamp: string;
  message: string;
}) {
  return (
    <>
      <div className="flex p-3 text-sixth bg-fifth rounded-md" key={id}>
        <Image
          width={1920}
          height={1080}
          src="/assets/dark_bg.jpg"
          alt="profile_picture"
          className="rounded-full mx-3 my-2 w-10 h-10"
        />
        <div className="flex flex-col">
          <div className="flex">
            <h1 className="pr-3 font-bold text-second"> {username} </h1>
            <h2> {timestamp} </h2>
          </div>
          <p className="break-all"> {message} </p>
        </div>
      </div>
    </>
  );
}
