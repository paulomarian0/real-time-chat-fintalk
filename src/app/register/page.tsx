'use client';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { useUserStorage } from '@/storages/useUser';

export default function Register() {
   const router = useRouter();
   const [name, setName] = useState('');
   const { setUserName } = useUserStorage();

   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setUserName(name);
      router.push('/chat');
   };

   return (
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
         <form onSubmit={handleSubmit}>
            <h1 className="text-2xl font-semibold mb-6">Entre sem cadastro:</h1>
            <div className="mb-4">
               <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                                            Nome:
               </label>
               <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  id="username"
                  name="username"
                  className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
               />
            </div>
            <button
               type="submit"
               className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                                                  Register
            </button>
         </form>
      </div>
   );
}
