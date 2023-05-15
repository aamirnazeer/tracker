import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middlewares/authenticateToken';

const prisma = new PrismaClient();
const router = express.Router();

router.get(
  '/api/users',
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const users = await prisma.users.findMany();
      res.status(200).send(users);
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: 'something went wrong' });
    }
  }
);

router.put(
  '/api/users',
  authenticateToken,
  async (req: Request, res: Response) => {
    const id: string = req.body.id;
    const firstname: string = req.body.firstname;
    try {
      await prisma.users.update({
        where: { id: id },
        data: { firstname: firstname },
      });
      res.status(201).send({ message: 'username updated successfully' });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: 'something went wrong' });
    }
  }
);

router.delete(
  '/api/users',
  authenticateToken,
  async (req: Request, res: Response) => {
    const id: string = req.body.id;
    try {
      await prisma.users.delete({
        where: { id: id },
      });
      res.status(200).send({ message: 'user deleted successfully' });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: 'something went wrong' });
    }
  }
);

export { router as usersRouter };
