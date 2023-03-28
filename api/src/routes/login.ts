import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import generateAccessToken from '../utilities/generateAccessToken';
import { refreshTokens } from './token';

const router = express.Router();

import { users } from './signup';

router.post('/api/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username);
  if (user === null) return res.status(400).send('Cannot find user');
  try {
    if (await bcrypt.compare(password, user.password)) {
      const accessToken = generateAccessToken({ username: user.username });
      const refreshToken = jwt.sign(
        { username: user.username },
        process.env.REFRESH_TOKEN_SECRET
      );
      refreshTokens.push(refreshToken);
      res.json({ accessToken: accessToken, refreshToken: refreshToken });
    } else {
      res.sendStatus(401);
    }
  } catch {
    res.sendStatus(500);
  }
});

export { router as loginRouter };
