import { v4 } from 'uuid';
import { redis } from '../../services/redis/redis';
import { minutes } from '../../utils/constants';
import { isProduction } from '../../utils';

export const createConfirmationUrl = async (userId: number) => {
  const token = v4();

  await redis.set(token, userId, 'ex', minutes(30));

  return isProduction()
    ? `https://www.restaurate.se/user/confirm/${token}`
    : `http://localhost:3000/user/confirm/${token}`;
};
