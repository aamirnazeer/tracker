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
      return res.send({ message: 'user already created' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { name, username, password: hashedPassword };
    await prisma.users.create({
      data: {
        name: name,
        username: username,
        password: hashedPassword,
      },
    });
    const accessToken = generateAccessToken({ username: user.username });
    const refreshToken = jwt.sign(
      { username: user.username },
      process.env.REFRESH_TOKEN_SECRET
    );

    await prisma.refreshtokens.create({
      data: {
        token: refreshToken,
      },
    });

    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true });
    res.send();
  } catch (err) {
    console.log(err);
    res.sendStatus(403);
  }
});

router.post('/api/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await prisma.users.findFirst({
    where: {
      username: username,
    },
  });
  if (user === null) return res.status(400).send('Cannot find user');
  try {
    if (await bcrypt.compare(password, user.password)) {
      const accessToken = generateAccessToken({ username: user.username });
      const refreshToken = jwt.sign(
        { username: user.username },
        process.env.REFRESH_TOKEN_SECRET
      );

      await prisma.refreshtokens.create({
        data: {
          token: refreshToken,
        },
      });

      res.cookie('accessToken', accessToken, { httpOnly: true });
      res.cookie('refreshToken', refreshToken, { httpOnly: true });
      res.send({});
    } else {
      res.sendStatus(401);
    }
  } catch {
    res.sendStatus(500);
  }
});

router.post('/api/token', async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  if (refreshToken === undefined) return res.sendStatus(401);

  const checkRefreshToken = await prisma.refreshtokens.findUnique({
    where: {
      token: refreshToken,
    },
  });

  if (checkRefreshToken === null) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    const accessToken = generateAccessToken({ username: user.username });
    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.send({});
  });
});

router.delete('/api/logout', async (req: Request, res: Response) => {
  await prisma.refreshtokens.delete({
    where: {
      token: req.cookies.refreshToken,
    },
  });

  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.sendStatus(204);
});

export { router as authRouter };
