import express from 'express';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import generateAccessToken from '../utilities/generateAccessToken';

const router = express.Router();

export const refreshTokens = [];

router.post('/api/token', (req: Request, res: Response) => {
  console.log(refreshTokens);
  const refreshToken = req.body.token;
  if (refreshToken === null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    const accessToken = generateAccessToken({ username: user.username });
    res.json({ accessToken: accessToken });
  });
});

export { router as tokenRouter };
