'use client';

import Textarea, { TextAreaRef } from 'rc-textarea';
import { Message } from './message';
import React, { useRef, useState } from 'react';

export function ChatBox() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [chatMessages, setChatMessages] = useState([]);
  const textArea = useRef<TextAreaRef>(null);

  return (
    <div id="chat" className="bg-third w-3/4 h-full rounded-xl p-5 pb-3 flex flex-col justify-between">
      <div className="w-full flex flex-col gap-3 overflow-auto rounded-md">
        {chatMessages.map((e, i: number) => (
          <Message
            id={i === chatMessages.length - 1 ? 'last' : ''}
            key={e.message_id}
            // profile_picture={e.profile_picture}
            username={e.author.username}
            timestamp={new Date(e.created_at)}
            message={e.message}
          />
        ))}
      </div>
      <div className="relative w-full bg-third rounded-md pt-5">
        <Textarea
          ref={textArea}
          onPressEnter={(e) => {
            const target = e.target as HTMLTextAreaElement;
            if (target.value !== '') {
              // sendMessages({ message: e.target.value, userChat });
              console.log(target.value);
            }
          }}
          autoSize={true}
          placeholder="Message"
          className="w-full outline-none border-none bg-fifth placeholder:text-white text-white rounded-lg pl-4 pr-9 py-3 resize-none"
        />
      </div>
    </div>
  );
}
