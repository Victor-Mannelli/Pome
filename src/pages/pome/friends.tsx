import { Message } from '@/components/models/message';
import { useRouter } from 'next/router';
import { IoSendSharp } from 'react-icons/io5';
import Textarea from 'rc-textarea';
import { useEffect, useState } from 'react';
import { ChatMessages } from '@/utils/Interfaces';
import WebSocket from 'ws';

export default function Friends() {
  // const router = useRouter();
  const [message, setMessage] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<string>('');
  
  const moc: any = [
    {
      title: 'aaaaaaa',
      image: '',
      description: ''
    },
    {
      title: 'aaaaaaa',
      image: '',
      description: ''
    },
    {
      title: 'aaaaaaa',
      image: '',
      description: ''
    },
    {
      title: 'aaaaaaa',
      image: '',
      description: ''
    },
    {
      title: 'bbbbbb',
      image: '',
      description: ''
    },
    {
      title: 'bbbbbb',
      image: '',
      description: ''
    },
    {
      title: 'bbbbbb',
      image: '',
      description: ''
    },
    {
      title: 'bbbbbb',
      image: '',
      description: ''
    },
    {
      title: 'bbbbbb',
      image: '',
      description: ''
    },
    {
      title: 'bbbbbb',
      image: '',
      description: ''
    },
    {
      title: 'bbbbbb',
      image: '',
      description: ''
    },
    {
      title: 'bbbbbb',
      image: '',
      description: ''
    },
    {
      title: 'bbbbbb',
      image: '',
      description: ''
    },
    {
      title: 'bbbbbb',
      image: '',
      description: ''
    },
  ];

  // const ws = new WebSocket('ws://localhost:8080');

  // ws.addEventListener('open', function () {
  //   console.log('Connected to WebSocket server');
  // });
  
  // ws.addEventListener('message', function(event) {
  //   const blob = event.data;
  //   blob.text().then(function(data: any) {
  //     const json = JSON.parse(data);
  //     console.log('Received message:', json);
  //   });
  // });
  function handleMessages(message: string) {
    console.log(message);
  }
  
  return (
    <div className="flex m-5 gap-5 h-[calc(100vh-6.5rem)]">
      <div className="bg-third w-1/4 h-full rounded-xl p-5">
        <h1 className="font-bold pb-3"> Friends </h1>
        <div className="h-[93%] w-full flex flex-col gap-3 overflow-auto rounded-xl">
          {moc.map((e: any, i: number) => (
            <div 
              key={i} 
              className="bg-fifth rounded-xl p-2 w-[95%] flex items-center"
              onClick={() => console.log('open friend chat')}
            > 
              <img 
                className="rounded-full h-6 w-6 mr-2"
                src="/assets/dark_bg.jpg" 
                alt="profile_pic" 
              />
              <h1> {e.title} </h1>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-third w-3/4 h-full rounded-xl p-5 flex flex-col justify-between">
        <div 
          className="h-[92%] w-full flex flex-col gap-3 overflow-auto rounded-md"
          id='chatBox'
        >
          {/* {chatMessages.map((e: any, i: number) => (
            <Message
              key={e.id}
              id={i}
              profile_picture={e.profile_picture}
              username={e.username}
              timestamp={e.timestamp}
              message={e.message}
            />
          ))} */}
        </div>
        <Textarea
          onPressEnter={() => {message === '' ? null : handleMessages(message);}} 
          onChange={(e) => setMessage(e.target.value)}
          autoSize={true}
          value={message}
          placeholder="Message"
          className="w-full min-h-[3rem] outline-none border-none bg-fifth placeholder:text-white text-white rounded-lg pl-4 pr-9 py-3 resize-none"
        />
        <IoSendSharp 
          onClick={() => {message === '' ? null : handleMessages(message);}} 
          className="fixed z-20 bottom-[3.5rem] right-14 text-seventh hover:cursor-pointer"
        />
      </div>
    </div>
  );
}
