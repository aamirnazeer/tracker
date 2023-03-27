import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

    const accessToken = jwt.sign(
      { username: username },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({ accessToken: accessToken });
  } catch (err) {
    res.sendStatus(403);
  }
});

export { router as signupRouter };
