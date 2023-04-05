import express, { Request, Response } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';

const router = express.Router();

router.get(
  '/api/currentuser',
  authenticateToken,
  async (req: Request, res: Response) => {
    const data = req.currentUser;
    res.send(data);
  }
);

export { router as currentUserRouter };
