import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
   const { name, password } = req.body;

   const token = await loginUser(name, password);
   console.log('Token JWT gerado:', token);

   const userIdFromToken = await verifyToken(token);
   console.log('ID do usuário extraído do token:', userIdFromToken);

   return res.json({  token });
}

async function loginUser(name: string, password: string) {
   const prisma = new PrismaClient();

   const user = await prisma.user.findFirst({
      where: {
         name,
      },
   });

   if (!user || user.password !== password) {
      throw new Error('Usuário ou senha inválidos');
   }

   const token = jwt.sign({ userId: user.id }, 'suaChaveSecreta', { expiresIn: '1h' });
   return token;
}

async function verifyToken(token: string) {
   try {
      const decoded = jwt.verify(token, 'suaChaveSecreta');
      return decoded.userId as string;
   } catch (error) {
      throw new Error('Token inválido');
   }
}
