import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   const { name, password } = req.body;

   const token = await loginUser(name, password);

   return res.json({ token });
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

