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
    const { catagoryId, amount, comments, currentUserId, ledgerId } = req.body;
    try {
      await prisma.entries.create({
        data: {
          amount: amount,
          comments: comments,
          userId: currentUserId,
          typeId: catagoryId,
          ledgerId: ledgerId,
          catagoryId: catagoryId,
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
          userId: req.currentUser.id,
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
    const { catagoryId, amount, comments, currentUserId, ledgerId, id } =
      req.body;

    try {
      const entry = await prisma.entries.update({
        where: { id: id },
        data: {
          amount: amount,
          comments: comments,
          userId: currentUserId,
          catagoryId: catagoryId,
          ledgerId: ledgerId,
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
      await prisma.entries.update({
        where: {
          id: id,
        },
        data: { isDeleted: 1 },
      });
      res.status(200).send({ message: 'entry deleted successfully' });
    } catch (err) {
      console.log(err);
      res.send(400).send({ message: 'something went wrong' });
    }
  }
);

export { router as entriesRouter };
