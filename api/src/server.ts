import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { authRouter } from './routes/auth';
import { entriesRouter } from './routes/entries';
import { catagoriesRouter } from './routes/catagories';

const app: Application = express();

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(cookieParser());

dotenv.config();

app.use(authRouter);
app.use(entriesRouter);
app.use(catagoriesRouter);

app.listen(5000, () => {
  console.log('server running');
});
