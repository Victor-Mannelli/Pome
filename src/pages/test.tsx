import React, { useEffect, useState } from 'react';

export default function WebSocketComponent() {
  const [messages, setMessages] = useState('');
  const [messageBox, setMessageBox] = useState('');
  let ws : any;

  function showMessage(message: string) {
    setMessages((prevMessages) => prevMessages + `\n\n${message}`);
    setMessageBox('');
  }

  useEffect(() => {
    if (!ws) {
      init();
    }
  }, []);
  

  function init() {
    if (ws) {
      ws.onerror = ws.onopen = ws.onclose = null;
      ws.close();
    }

    ws = new WebSocket('ws://localhost:5500');
    ws.onopen = () => {
      console.log('Connection opened!');
    };
    ws.onmessage = ({ data }: {data: any}) => showMessage(data);
    ws.onclose = function() {
      ws = null;
    };
  }

  function handleClick() {
    if (!ws) {
      showMessage('No WebSocket connection :(');
      return;
    }

    ws.send(messageBox);
    showMessage(messageBox);
  }

  return (
    <div>
      <button id="send" onClick={handleClick}>Send</button>
      <div id="messages">{messages}</div>
      <input 
        id="messageBox" 
        onChange={(event) => setMessageBox(event.target.value)} 
        value={messageBox}
      />
    </div>
  );
}

// let ws: any;

// function showMessage(message) {
//   setChatMessages((prevMessages) => prevMessages + `\n\n${message}`);
//   chatMessages.value = '';
// }

// function init() {
//   if (ws) {
//     ws.onerror = ws.onopen = ws.onclose = null;
//     ws.close();
//   }

//   ws = new WebSocket('ws://localhost:6969');
//   ws.onopen = () => {
//     console.log('Connection opened!');
//   };
//   ws.onmessage = ({ data }) => showMessage(data);
//   ws.onclose = function() {
//     ws = null;
//   };
// }

// function handleClick() {
//   if (!ws) {
//     showMessage('No WebSocket connection :(');
//     return;
//   }

//   ws.send(chatMessages);
//   showMessage(chatMessages);
// }