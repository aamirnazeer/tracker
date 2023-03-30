import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  username: string;
  id: number;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send({ message: 'cookie missing' });

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err: TypeError, user: UserPayload) => {
      if (err)
        return res.status(401).send({ message: 'authentication failed' });
      req.currentUser = user;
      next();
    }
  );
};
