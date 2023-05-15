import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import generateAccessToken from '../utilities/generateAccessToken';
import refreshTokenChecker from '../utilities/refreshTokenValidator';

interface UserPayload {
  username: string;
  id: string;
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
  const refreshToken = req.cookies.refreshToken;

  if (!token) return res.status(400).send({ message: 'cookie missing' });

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    async (err: TypeError, user: UserPayload) => {
      if (err) {
        if (err.message === 'jwt expired') {
          if (refreshTokenChecker(refreshToken)) {
            jwt.verify(
              refreshToken,
              process.env.REFRESH_TOKEN_SECRET,
              (err, user) => {
                const accessToken = generateAccessToken({
                  id: user.id,
                  username: user.username,
                  firstname: user.firsname,
                  lastname: user.lastname,
                });
                res.cookie('accessToken', accessToken, { httpOnly: true });
                console.log('new token generated');
                req.currentUser = user;
                next();
              }
            );
          }
        } else {
          return res.status(401).send({ message: 'authentication failed' });
        }
      } else {
        console.log('old token fine');
        req.currentUser = user;
        next();
      }
    }
  );
};
