import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import generateAccessToken from './api/src/utilities/generateAccessToken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.post('/api/signup', async (req: Request, res: Response) => {
  const { firstname, lastname, email, username, password } = req.body;
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
        firstname: firstname,
        lastname: lastname,
        email: email,
        username: username,
        password: hashedPassword,
      },
    });
    const accessToken = generateAccessToken({
      id: addedUser.id,
      username: addedUser.username,
      firstname: addedUser.firstname,
      lastname: addedUser.lastname,
    });
    const refreshToken = jwt.sign(
      {
        id: addedUser.id,
        username: addedUser.username,
        firstname: addedUser.firstname,
        lastname: addedUser.lastname,
      },
      process.env.REFRESH_TOKEN_SECRET
    );

    await prisma.refreshtokens.create({
      data: {
        token: refreshToken,
      },
    });

    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true });
    res.status(201).send({
      id: addedUser.id,
      username: addedUser.username,
      firstname: addedUser.firstname,
      lastname: addedUser.lastname,
      email: addedUser.email
    });
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
        firstname: user.firstname,
        lastname: user.lastname,
      });
      const refreshToken = jwt.sign(
        {
          id: user.id,
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
        },
        process.env.REFRESH_TOKEN_SECRET
      );

      await prisma.refreshtokens.create({
        data: {
          token: refreshToken,
        },
      });

      res.cookie('accessToken', accessToken, { httpOnly: true });
      res.cookie('refreshToken', refreshToken, { httpOnly: true });
      res.status(200).send({
        id: user.id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
      });
    } else {
      res.status(400).send({ message: 'incorrect credentials' });
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
    res.status(400).send({ message: 'something went wrong' });
  }
});

export { router as authRouter };
