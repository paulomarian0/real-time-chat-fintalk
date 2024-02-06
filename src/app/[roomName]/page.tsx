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
   const [allMessages, setAllMessages] = useState<{ userName: string, message: string }[]>([]);
   const { userName } = useUserStorage();

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

   const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const socket = io();

      socket.emit('send-message', {
         userName,
         message,
         room: roomName,
      });
      setMessage('');
   };

   if(!userName) redirect('/register');

   return (
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
         <h1 className="text-2xl font-semibold mb-6">{userName}, Você está na sala {roomName}</h1>
         <div className="max-h-80 overflow-y-auto mb-4">
            {allMessages.map(({ userName, message }, index) => (
               <div key={index} className="mb-2">
                  <span className="font-semibold">{userName}:</span> <span>{message}</span>
               </div>
            ))}
         </div>
         <form onSubmit={handleSubmit} className="flex">
            <input
               className="flex-1 py-2 px-4 border border-gray-300 rounded-md mr-2 focus:outline-none"
               name="message"
               placeholder="Enter your message"
               value={message}
               onChange={(e) => setMessage(e.target.value)}
               autoComplete="off"
            />
            <button
               type="submit"
               className="py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            >
                                                  Send
            </button>
         </form>
      </div>
   );
}
