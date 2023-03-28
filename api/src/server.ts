import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { postsRouter } from './routes/posts';
import { authRouter } from './routes/auth';

import { PrismaClient } from '@prisma/client';

const app: Application = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(cookieParser());

dotenv.config();

app.use(postsRouter);
app.use(authRouter);

app.listen(5000, () => {
  console.log('server running');
});
