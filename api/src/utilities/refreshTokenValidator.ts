import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const refreshTokenChecker = async (refreshToken) => {
  const checkRefreshToken = await prisma.refreshtokens.findUnique({
    where: {
      token: refreshToken,
    },
  });
  if (checkRefreshToken !== null) {
    return true;
  } else return false;
};

export default refreshTokenChecker;
