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
    console.log(req.currentUser);
    const catagoryId: number = req.body.catagoryId;
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

router.get(
  '/api/entries',
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const entries = await prisma.entries.findMany({
        where: {
          user: { id: req.currentUser.id },
        },
      });
      res.status(200).send(entries);
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: 'something went wrong' });
    }
  }
);

router.put(
  '/api/entries',
  authenticateToken,
  async (req: Request, res: Response) => {
    const catagoryId: number = req.body.catagoryId;
    const amount: number = req.body.amount;
    const comments: string = req.body.comments;
    const id: number = req.body.id;
    try {
      const entry = await prisma.entries.update({
        where: { id: id },
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
      res.status(200).send(entry);
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: 'something went wrong' });
    }
  }
);

router.delete(
  '/api/entries',
  authenticateToken,
  async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
      await prisma.entries.delete({
        where: {
          id: id,
        },
      });
      res.status(200).send({ message: 'entry deleted successfully' });
    } catch (err) {
      console.log(err);
      res.send(400).send({ message: 'something went wrong' });
    }
  }
);

export { router as entriesRouter };
