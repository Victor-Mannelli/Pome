import { Message } from "@/components/models/message";
import Image from "next/image";
import { useRouter } from "next/router";
import Textarea from "rc-textarea";
import { IoSendSharp } from "react-icons/io5"

export default function Friends() {
  const router = useRouter();
  const moc: any = [
    {
      title: "aaaaaaa",
      image: "",
      description: ""
    },
    {
      title: "aaaaaaa",
      image: "",
      description: ""
    },
    {
      title: "aaaaaaa",
      image: "",
      description: ""
    },
    {
      title: "aaaaaaa",
      image: "",
      description: ""
    },
    {
      title: "bbbbbb",
      image: "",
      description: ""
    },
    {
      title: "bbbbbb",
      image: "",
      description: ""
    },
    {
      title: "bbbbbb",
      image: "",
      description: ""
    },
    {
      title: "bbbbbb",
      image: "",
      description: ""
    },
    {
      title: "bbbbbb",
      image: "",
      description: ""
    },
    {
      title: "bbbbbb",
      image: "",
      description: ""
    },
    {
      title: "bbbbbb",
      image: "",
      description: ""
    },
    {
      title: "bbbbbb",
      image: "",
      description: ""
    },
    {
      title: "bbbbbb",
      image: "",
      description: ""
    },
    {
      title: "bbbbbb",
      image: "",
      description: ""
    },
  ]
  const message: {
    id: number;
    profile_picture: string;
    username: string;
    timestamp: string;
    message: string;
  }[] = [
    {
      id: 1,
      profile_picture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM1cDnT1Q5ZrkfLfxiSgFvC2ZsjpngynJGvg&usqp=CAU",
      username: "Catto",
      timestamp: "MM/DD/YYYY at HH:mm",
      message:
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    },
    {
      id: 2,
      profile_picture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM1cDnT1Q5ZrkfLfxiSgFvC2ZsjpngynJGvg&usqp=CAU",
      username: "Catto2",
      timestamp: "MM/DD/YYYY at HH:mm",
      message:
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    },  {
      id: 2,
      profile_picture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM1cDnT1Q5ZrkfLfxiSgFvC2ZsjpngynJGvg&usqp=CAU",
      username: "Catto2",
      timestamp: "MM/DD/YYYY at HH:mm",
      message:
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    },  {
      id: 2,
      profile_picture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM1cDnT1Q5ZrkfLfxiSgFvC2ZsjpngynJGvg&usqp=CAU",
      username: "Catto2",
      timestamp: "MM/DD/YYYY at HH:mm",
      message:
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    },  {
      id: 2,
      profile_picture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM1cDnT1Q5ZrkfLfxiSgFvC2ZsjpngynJGvg&usqp=CAU",
      username: "Catto2",
      timestamp: "MM/DD/YYYY at HH:mm",
      message:
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    },  {
      id: 2,
      profile_picture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM1cDnT1Q5ZrkfLfxiSgFvC2ZsjpngynJGvg&usqp=CAU",
      username: "Catto2",
      timestamp: "MM/DD/YYYY at HH:mm",
      message:
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    },
  ];
  
  return (
    <div className="flex m-5 pt-16 gap-5 h-[calc(100vh-2.7rem)]">
      <div className="bg-third w-1/4 h-full rounded-xl p-5">
        <h1 className="font-bold pb-3"> Friends </h1>
        <div className="h-[93%] w-full flex flex-col gap-3 overflow-auto rounded-xl">
          {moc.map((e: any, i: number) => (
            <div 
              key={i} 
              className="bg-fifth rounded-xl p-2 w-[95%] flex items-center"
              onClick={() => console.log("open friend chat")}
            > 
              <Image
                width={1920}
                height={1080}
                src="/assets/dark_bg.jpg"
                alt="pfp" 
                className="rounded-full h-6 w-6 mr-2"
              />
              <h1> {e.title} </h1>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-third w-3/4 h-full rounded-xl p-5 flex flex-col justify-between">
        <div className="h-[90%] w-full flex flex-col gap-3 overflow-auto rounded-md mb-5">
          {message.map((e) => (
            <Message
              key={e.id}
              id={e.id}
              profile_picture={e.profile_picture}
              username={e.username}
              timestamp={e.timestamp}
              message={e.message}
            />
          ))}
        </div>
        <Textarea
          // eslint-disable-next-line no-console
          onPressEnter={() => console.log("pressed enter")}
          autoSize={true}
          placeholder="Message"
          className="relative w-full outline-none border-none bg-fifth placeholder:text-white text-white rounded-lg pl-4 py-1.5 pr-9 resize-none"
        />
        <IoSendSharp 
          onClick={() => console.log("sent")} 
          className="absolute z-20 bottom-[3.6rem] right-14 text-seventh hover:cursor-pointer"
        />
      </div>
    </div>
  )
}
