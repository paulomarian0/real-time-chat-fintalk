import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   const prisma = new PrismaClient();


   if (req.method === 'POST') {
      const { name, password } = req.body;
      const user = await prisma.user.create({
         data: {
            name,
            password,
         },
      });

      res.json(user);
   }
}
