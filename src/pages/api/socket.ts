import type { NextApiRequest, NextApiResponse } from 'next';
import { Server as Server } from 'socket.io';
import { Socket as NetSocket } from 'net';

interface ExtendedSocket extends NetSocket {
  server: Server & { io?: Server };
}

interface NextApiResponseWithSocket<T = unknown> extends NextApiResponse<T> {
  socket: ExtendedSocket;
}

// Tipagem para o objeto de mensagem
interface Message {
  userName: string;
  message: string;
  room: string; // Adicionando um campo para identificar a sala
}

export default function handler(req: NextApiRequest, res: NextApiResponseWithSocket) {
   if (res.socket.server.io) {
      console.log('Already set up');
      res.end();
      return;
   }

   const io = new Server(res.socket.server as never);
   res.socket.server.io = io;

   io.on('connection', (socket) => {
      socket.on('join-room', (room: string) => {
         socket.join(room); 
         console.log(`User joined room ${room}`);
      });

      socket.on('send-message', (obj: Message) => {
         console.log(obj);
         io.to(obj.room).emit('receive-message', obj); 
      });
   });

   console.log('Setting up socket');
   res.end();
}
