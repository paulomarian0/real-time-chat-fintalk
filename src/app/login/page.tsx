'use client';

import { useUserStorage } from '@/storages/useUser';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

export default function Login() {
   const router = useRouter();
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const { setUserName } = useUserStorage();

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
         const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: username, password }),
         });

         if (response.ok) {
            setUserName(username);
            return router.push('/chat');
         }
         toast.error('Usuário ou senha incorretos');
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
         <form onSubmit={handleSubmit}>
            <h1 className="text-2xl font-semibold mb-6">Login</h1>
            <div className="mb-4">
               <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                                            Nome:
               </label>
               <input
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  id="username"
                  name="username"
                  className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
               />
            </div>
            <div className="mb-4">
               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                                            Senha:
               </label>
               <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                  name="password"
                  className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
               />
            </div>
            <button
               type="submit"
               className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                                                  Login
            </button>
            <div className="flex gap-4 py-4">
               <Link
                  href={{ pathname: '/register-anonymously' }}
                  className="text-center  w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
               >
                                                            Entrar anonimamente
               </Link>

               <Link
                  href={{ pathname: '/register' }}
                  className="text-center flex justify-center items-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
               >
                                                             Criar uma conta
               </Link>
            </div>
         </form>
      </div>
   );
}
