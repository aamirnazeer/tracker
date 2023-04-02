import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import generateAccessToken from '../utilities/generateAccessToken';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middlewares/authenticateToken';

const prisma = new PrismaClient();
const router = express.Router();

router.get(
  '/api/currentuser',
  authenticateToken,
  async (req: Request, res: Response) => {
    console.log(req.currentUser);
    res.send({});
  }
);

export { router as currentUserRouter };
