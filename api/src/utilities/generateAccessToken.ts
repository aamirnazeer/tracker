import jwt from 'jsonwebtoken';

interface User {
  username: string;
  id: string;
  firstname: string;
  lastname: string;
}

const generateAccessToken = (user: User): string => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '10s',
  });
};

export default generateAccessToken;
