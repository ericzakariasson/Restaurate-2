import * as IORedis from 'ioredis';
import { isProduction } from '../../utils/env.helper';

export type RedisClient = IORedis.Redis;

export const redis = isProduction()
  ? new IORedis(process.env.REDIS_URL as string)
  : new IORedis();
