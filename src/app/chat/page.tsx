'use client';
import { useState } from 'react';
import { useRouter, redirect } from 'next/navigation';
import { useUserStorage } from '@/storages/useUser';

export default function Chat() {
   const router = useRouter();
   const [newRoomName, setNewRoomName] = useState('');
   const [rooms, setRooms] = useState(['Sala-1']); // Apenas uma sala chamada 'Sala 1'
   const { userName } = useUserStorage();

   const handleCreateRoom = () => {
      if (newRoomName.trim() !== '' && !rooms.includes(newRoomName)) {
         setRooms([...rooms, newRoomName]);
         setNewRoomName('');
      }
   };

   const handleRoomSelect = (roomName: string) => {
      router.push(`/${roomName}`);
   };

   if (!userName) redirect('/login');

   return (
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
         <h1 className="text-2xl font-semibold mb-6"><span className='capitalize'>{userName}</span>, selecione a sala ou crie uma nova</h1>
         <div className="flex mb-4">
            <input
               className="flex-1 py-2 px-4 border border-gray-300 rounded-md mr-2 focus:outline-none"
               value={newRoomName}
               onChange={(e) => setNewRoomName(e.target.value)}
               placeholder="Entre com o nome da sala nova"
            />
            <button
               className="py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
               onClick={handleCreateRoom}
            >
               Criar Sala
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
