import express, { Request, Response } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';

const router = express.Router();

router.get(
  '/api/currentuser',
  authenticateToken,
  async (req: Request, res: Response) => {
    console.log(req.currentUser);
    res.send({ currentUser: req.currentUser });
  }
);

export { router as currentUserRouter };
