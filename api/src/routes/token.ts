import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import generateAccessToken from '../utilities/generateAccessToken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/api/token', async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  if (refreshToken === undefined)
    return res.status(400).send({ message: 'error' });

  const checkRefreshToken = await prisma.refreshtokens.findUnique({
    where: {
      token: refreshToken,
    },
  });

  if (checkRefreshToken === null)
    return res.status(400).send({ message: 'cannot provide token' });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    const accessToken = generateAccessToken({
      id: user.id,
      username: user.username,
      firstname: user.firsname,
      lastname: user.lastname
    });
    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.status(200).send({
      id: user.id,
      username: user.username,
      firstname: user.firsname,
      lastname: user.lastname
    });
  });
});

export { router as tokenRouter };
