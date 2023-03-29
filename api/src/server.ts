import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { authRouter } from './routes/auth';
import { entriesRouter } from './routes/entries';
import { catagoriesRouter } from './routes/catagories';
import { tokenRouter } from './routes/token';
import { usersRouter } from './routes/users';

const app: Application = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());

dotenv.config();

app.use(authRouter);
app.use(entriesRouter);
app.use(catagoriesRouter);
app.use(tokenRouter);
app.use(usersRouter);

app.listen(5000, () => {
  console.log('server running');
});
