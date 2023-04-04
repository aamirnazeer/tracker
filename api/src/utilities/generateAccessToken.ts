import jwt from 'jsonwebtoken';

interface User {
  username: string;
  id: number;
  name: string;
}

const generateAccessToken = (user: User): string => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '10s',
  });
};

export default generateAccessToken;
