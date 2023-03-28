import express from 'express';
import { Request, Response } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.post(
  '/api/catagories',
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const { type } = req.body;
      await prisma.catagories.create({
        data: {
          type: type,
        },
      });
      res.status(201).send({ message: 'new type added' });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: 'something went wrong' });
    }
  }
);

export { router as catagoriesRouter };
