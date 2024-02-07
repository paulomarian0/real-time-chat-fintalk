import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   const prisma = new PrismaClient();


   if (req.method === 'POST') {
      const { name, password } = req.body;
      
      const userAlreadyExists = await prisma.user.findFirst({
         where: {
            name,
         },
      });

      if (userAlreadyExists) {
         return res.status(400).json({ error: 'Usuário já existe' });
      }

      const user = await prisma.user.create({
         data: {
            name,
            password,
         },
      });

      res.json(user);
   }
}
