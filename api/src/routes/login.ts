import express from 'express';
import { Application, NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const router = express.Router();

import { users } from './signup';

router.post('/api/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username);
  if (user === null) return res.status(400).send('Cannot find user');
  try {
    if (await bcrypt.compare(password, user.password)) {
      const a = { username: username };
      const accessToken = jwt.sign(a, process.env.ACCESS_TOKEN_SECRET);
      res.json({ accessToken: accessToken });
    } else {
      res.send('Not Allowed');
    }
  } catch {
    res.status(500).send();
  }
});

export { router as loginRouter };
