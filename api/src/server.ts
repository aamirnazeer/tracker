import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import { loginRouter } from './routes/login';
import { postsRouter } from './routes/posts';
import { signupRouter } from './routes/signup';
import { tokenRouter } from './routes/token';

const app: Application = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

dotenv.config();

app.use(loginRouter);
app.use(postsRouter);
app.use(signupRouter);
app.use(tokenRouter);

app.listen(5000, () => {
  console.log('server running');
});
