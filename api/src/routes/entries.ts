import express from 'express';
import { Request, Response } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.post(
  '/api/entries',
  authenticateToken,
  async (req: Request, res: Response) => {
    const catagoryId: number = req.body.catagory;
    const amount: number = req.body.amount;
    const comments: string = req.body.comments;

    try {
      await prisma.entries.create({
        data: {
          amount: amount,
          comments: comments,
          user: {
            connect: { id: req.currentUser.id },
          },
          catagory: {
            connect: { id: catagoryId },
          },
        },
      });
      res.status(201).send({ message: 'entry processed' });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: 'something went wrong' });
    }
  }
);

export { router as entriesRouter };
