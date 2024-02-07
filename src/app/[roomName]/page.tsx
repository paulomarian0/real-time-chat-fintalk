// pages/rooms/[roomName].js
'use client';
import { useUserStorage } from '@/storages/useUser';
import { usePathname } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import io from 'socket.io-client';

export default function Room() {
   const pathName = usePathname();
   const roomName = pathName?.slice(1, pathName.length);
   const [message, setMessage] = useState('');
   const [allMessages, setAllMessages] = useState<{ userName: string; message: string }[]>([]);
   const { userName } = useUserStorage();

   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!message) return;
      const socket = io();

      socket.emit('send-message', {
         userName,
         message,
         room: roomName,
      });
      setMessage('');
   };

   if (!userName) redirect('/login');

   useEffect(() => {
      const socket = io();

      const socketInitializer = async () => {
         await fetch('/api/socket');
         socket.emit('join-room', roomName);

         socket.on('receive-message', (data) => {
            setAllMessages((prev) => [...prev, data]);
         });
      };

      socketInitializer();
      return () => {
         socket.disconnect();
      };
   }, [roomName]);

   useEffect(() => {
      const scrollToBottom = () => {
         const messageContainer = document.getElementById('message-container');
         if (messageContainer) {
            messageContainer.scrollTop = messageContainer.scrollHeight;
         }
      };
      scrollToBottom();
   }, [allMessages]);

   return (
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
         <h1 className="text-2xl font-semibold mb-6">
            <span className="capitalize">{userName}</span>, você está na <span className="text-blue-600">{roomName}</span>
         </h1>
         <div id="message-container" className="max-h-80 overflow-y-auto mb-4 scroll-smooth">
            {allMessages.map((item, index) => (
               <div key={index} className={`mb-2 ${item.userName === userName ? 'text-right' : ''}`}>
                  <div
                     className={`inline-block rounded-lg px-4 py-2 ${item.userName === userName ? 'bg-green-500 text-white ' : 'bg-gray-200 text-black '}`}
                  >
                     <span className="font-semibold">
                        {item.userName === userName ? 'Você:' : item.userName + ':'}
                     </span>
                     <span className="ml-1">{item.message}</span>
                  </div>
               </div>
            ))}
         </div>

         <form onSubmit={handleSubmit} className="flex">
            <input
               className="flex-1 py-2 px-4 border border-gray-300 rounded-md mr-2 focus:outline-none"
               name="message"
               placeholder="Escreva sua mensagem"
               value={message}
               onChange={(e) => setMessage(e.target.value)}
               autoComplete="off"
            />
            <button
               type="submit"
               className="py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            >
                                                  Enviar
            </button>
         </form>
      </div>
   );
}
