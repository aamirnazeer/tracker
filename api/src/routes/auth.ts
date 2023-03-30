import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import generateAccessToken from '../utilities/generateAccessToken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.post('/api/signup', async (req: Request, res: Response) => {
  const { name, username, password } = req.body;
  try {
    const checkUser = await prisma.users.findUnique({
      where: {
        username: username,
      },
    });
    if (checkUser !== null)
      return res.status(403).send({ message: 'user already created' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const addedUser = await prisma.users.create({
      data: {
        name: name,
        username: username,
        password: hashedPassword,
      },
    });
    const accessToken = generateAccessToken({
      id: addedUser.id,
      username: addedUser.username,
    });
    const refreshToken = jwt.sign(
      { id: addedUser.id, username: addedUser.username },
      process.env.REFRESH_TOKEN_SECRET
    );

    await prisma.refreshtokens.create({
      data: {
        token: refreshToken,
      },
    });

    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true });
    res.status(201).send({ message: 'user created' });
  } catch (err) {
    console.log(err);
    res.status(403).send({ message: 'something went wrong' });
  }
});

router.post('/api/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await prisma.users.findUnique({
    where: {
      username: username,
    },
  });
  if (user === null)
    return res.status(400).send({ message: 'cannot find user' });
  try {
    if (await bcrypt.compare(password, user.password)) {
      const accessToken = generateAccessToken({
        id: user.id,
        username: user.username,
      });
      const refreshToken = jwt.sign(
        { id: user.id, username: user.username },
        process.env.REFRESH_TOKEN_SECRET
      );

      await prisma.refreshtokens.create({
        data: {
          token: refreshToken,
        },
      });

      res.cookie('accessToken', accessToken, { httpOnly: true });
      res.cookie('refreshToken', refreshToken, { httpOnly: true });
      res.status(200).send({ message: 'login successfull' });
    } else {
      res.status(401).send({ message: 'incorrect credentials' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'something went wrong' });
  }
});

router.delete('/api/logout', async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken)
    return res.status(400).send({ message: 'logged out already user' });
  try {
    await prisma.refreshtokens.delete({
      where: {
        token: refreshToken,
      },
    });

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).send({ message: 'logout success' });
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: 'something went wrong' });
  }
});

export { router as authRouter };
