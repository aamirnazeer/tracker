import express from 'express';
import { Request, Response } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
const router = express.Router();

const posts = [
  {
    username: 'Kyle',
    title: 'Post 1',
  },
  {
    username: 'Jim',
    title: 'Post 2',
  },
  {
    username: 'username',
    title: 'Post 3',
  },
];

router.get('/api/posts', authenticateToken, (req: Request, res: Response) => {
  res.json(posts.filter((post) => post.username === req.currentUser.username));
});

export { router as postsRouter };
