import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { authRouter } from './routes/auth';
import { entriesRouter } from './routes/entries';
import { catagoriesRouter } from './routes/catagories';
import { tokenRouter } from './routes/token';
import { usersRouter } from './routes/users';
import { currentUserRouter } from './routes/currentUser';
import { ledgerRouter } from './routes/ledgers';
import { ledgerAccessRouter } from './routes/ledgerAccess';

const app: Application = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());

dotenv.config();

app.use(authRouter);
app.use(entriesRouter);
app.use(catagoriesRouter);
app.use(tokenRouter);
app.use(usersRouter);
app.use(currentUserRouter);
app.use(ledgerRouter);
app.use(ledgerAccessRouter);

app.listen(5000, () => {
  console.log('server running');
});
