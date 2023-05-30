import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middlewares/authenticateToken';

const prisma = new PrismaClient();
const router = express.Router();

router.post(
  '/api/users',
  authenticateToken,
  async (req: Request, res: Response) => {
    const { username } = req.body;
    if (username === req.currentUser.username)
      return res
        .status(400)
        .send({ message: 'cannot add owner to share list' });
    try {
      const users = await prisma.users.findFirst({
        where: {
          AND: { isDeleted: 0, username: username },
        },
        select: {
          id: true,
        },
      });
      if (users === null) {
        return res.status(400).send({ message: 'user not found' });
      }
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
      await prisma.users.update({
        where: { id: id },
        data: { isDeleted: 1 },
      });
      res.status(200).send({ message: 'user deleted successfully' });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: 'something went wrong' });
    }
  }
);

export { router as usersRouter };
