'use client';
import { useState } from 'react';
import io from 'socket.io-client';
import { useRouter } from 'next/navigation';
import { useUserStorage } from '@/storages/useUser';

export default function Home() {
   const router = useRouter();
   const [newRoomName, setNewRoomName] = useState('');
   const [rooms, setRooms] = useState(['default', 'room1', 'room2']);
   const {userName} = useUserStorage();

   const handleCreateRoom = () => {
      if (newRoomName.trim() !== '' && !rooms.includes(newRoomName)) {
         setRooms([...rooms, newRoomName]);
         setNewRoomName('');
      }
   };

   const handleRoomSelect = (roomName) => {
      router.push(`/${roomName}`);
   };

   if(!userName) router.push('/register');

   return (
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
         <h1 className="text-2xl font-semibold mb-6">Chat App</h1>
         <div className="flex items-center mb-4">
            <input
               className="flex-1 py-2 px-4 border border-gray-300 rounded-md mr-2 focus:outline-none"
               value={userName}
               placeholder="Enter your username"
            />
         </div>
         <div className="flex mb-4">
            <input
               className="flex-1 py-2 px-4 border border-gray-300 rounded-md mr-2 focus:outline-none"
               value={newRoomName}
               onChange={(e) => setNewRoomName(e.target.value)}
               placeholder="Enter new room name"
            />
            <button
               className="py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
               onClick={handleCreateRoom}
            >
          Create Room
            </button>
         </div>
         <div>
            {rooms.map((roomName) => (
               <div
                  key={roomName}
                  className="cursor-pointer py-2 px-4 border border-gray-300 rounded-md mb-2 hover:bg-gray-100"
                  onClick={() => handleRoomSelect(roomName)}
               >
                  {roomName}
               </div>
            ))}
         </div>
      </div>
   );
}
