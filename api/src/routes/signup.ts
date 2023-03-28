import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import generateAccessToken from '../utilities/generateAccessToken';
import { refreshTokens } from './token';

const router = express.Router();

export const users = [];

router.post('/api/signup', async (req: Request, res: Response) => {
  const { name, username, password } = req.body;

  if (users.find((user) => user.username === username))
    return res.sendStatus(403);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { name, username, password: hashedPassword };
    users.push(user);

    const accessToken = generateAccessToken({username: user.username});
    const refreshToken = jwt.sign({username: user.username}, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
  } catch (err) {
    res.sendStatus(403);
  }
});

export { router as signupRouter };
