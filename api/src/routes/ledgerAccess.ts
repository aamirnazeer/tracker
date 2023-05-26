import express from 'express';
import { Request, Response } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.post(
  '/api/ledgeraccess',
  authenticateToken,
  async (req: Request, res: Response) => {
    const { userId, ledgerId } = req.body;

    const user = await prisma.ledgeracess.findFirst({
      where: {
        AND: { ledgerid: ledgerId, userid: userId },
      },
    });
    if (user !== null)
      return res.status(400).send({ message: 'already added' });

    try {
      await prisma.ledgeracess.create({
        data: {
          ledgerid: ledgerId,
          userid: userId,
        },
      });
      res.status(201).send({ message: 'ledger access created' });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: 'something went wrong' });
    }
  }
);

router.get(
  '/api/ledgeraccess/:id',
  authenticateToken,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const ledgerAccess = await prisma.ledgeracess.findMany({
        where: {
          ledgerid: id,
        },
        include: {
          users: {
            select: {
              username: true,
              id: true,
            },
          },
        },
      });
      res.status(200).send(ledgerAccess);
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: 'something went wrong' });
    }
  }
);

router.put(
  '/api/ledgeraccess',
  authenticateToken,
  async (req: Request, res: Response) => {
    const { ledgerId, userIds } = req.body;
    console.log(req.currentUser);
    const dataSet = (userIds || []).map((el) => {
      return {
        ledgerid: ledgerId,
        userid: el,
      };
    });

    try {
      await prisma.ledgeracess.deleteMany({
        where: {
          ledgerid: ledgerId,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: 'something went wrong' });
    }

    try {
      await prisma.ledgeracess.createMany({
        data: dataSet,
      });
      res.status(200).send({ message: 'update success' });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: 'something went wrong' });
    }
  }
);

export { router as ledgerAccessRouter };
