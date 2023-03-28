import jwt from 'jsonwebtoken';

interface User {
  username: string;
  id: number;
}

const generateAccessToken = (user: User) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
};

export default generateAccessToken;
