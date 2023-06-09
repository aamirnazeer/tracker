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
      const { type, ledgerid } = req.body;
      await prisma.catagories.create({
        data: {
          type: type,
          ledgerid: ledgerid,
        },
      });
      res.status(201).send({ message: 'new type added' });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: 'something went wrong' });
    }
  }
);

router.get(
  '/api/catagories',
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const catagories = await prisma.catagories.findMany();
      res.status(201).send(catagories);
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: 'something went wrong' });
    }
  }
);

router.put(
  '/api/catagories',
  authenticateToken,
  async (req: Request, res: Response) => {
    const id: string = req.body.id;
    const type: string = req.body.type;
    try {
      const catagory = await prisma.catagories.update({
        where: { id: id },
        data: { type: type },
      });
      res.status(201).send(catagory);
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: 'something went wrong' });
    }
  }
);

router.delete(
  '/api/catagories',
  authenticateToken,
  async (req: Request, res: Response) => {
    const id: string = req.body.id;
    try {
      await prisma.catagories.delete({
        where: { id: id },
      });
      res.status(200).send({ message: 'catagory deleted successfully' });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: 'something went wrong' });
    }
  }
);

export { router as catagoriesRouter };
