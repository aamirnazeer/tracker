import express from 'express';
import { Request, Response } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.post(
  '/api/ledgers',
  authenticateToken,
  async (req: Request, res: Response) => {
    const { name, ownerId, type } = req.body;
    try {
      await prisma.ledgers.create({
        data: {
          name: name,
          ownerId: ownerId,
          type: type,
        },
      });
      res.status(201).send({ message: 'ledger created' });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: 'something went wrong' });
    }
  }
);

router.get(
  '/api/ledgers',
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const ledgers = await prisma.ledgers.findMany({
        where: {
          ownerId: req.currentUser.id,
        },
      });
      res.status(200).send(ledgers);
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: 'something went wrong' });
    }
  }
);

router.put(
  '/api/ledgers',
  authenticateToken,
  async (req: Request, res: Response) => {
    const id: string = req.body.id;
    const name: string = req.body.name;
    const ownerId: string = req.body.owner;

    try {
      const ledgers = await prisma.ledgers.update({
        where: { id: id },
        data: {
          name: name,
          ownerId: ownerId,
        },
      });
      res.status(200).send(ledgers);
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: 'something went wrong' });
    }
  }
);

router.delete(
  '/api/ledgers',
  authenticateToken,
  async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
      await prisma.ledgers.update({
        where: {
          id: id,
        },
        data: { isDeleted: 1 },
      });
      res.status(200).send({ message: 'ledger deleted successfully' });
    } catch (err) {
      console.log(err);
      res.send(400).send({ message: 'something went wrong' });
    }
  }
);

export { router as ledgerRouter };
